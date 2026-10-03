import { NextRequest, NextResponse } from "next/server";
import { analyzeMedicine } from "@/lib/gemini";
import { AnalysisResponse } from "@/types";

const DAILY_QUOTA_LIMIT = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// In-Memory Store untuk Kuota Harian
const quotaStore = new Map<string, { count: number; date: string }>();

function getClientIdentifier(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  if (realIp) return realIp.trim();
  return "default-client";
}

// Hanya untuk melihat sisa kuota (GET)
function getQuotaStatus(clientId: string) {
  const today = new Date().toISOString().split("T")[0];
  const userRecord = quotaStore.get(clientId);

  if (!userRecord || userRecord.date !== today) {
    return { remaining: DAILY_QUOTA_LIMIT, total: DAILY_QUOTA_LIMIT };
  }

  const remaining = Math.max(0, DAILY_QUOTA_LIMIT - userRecord.count);
  return { remaining, total: DAILY_QUOTA_LIMIT };
}

// Mengurangi kuota harian (POST)
function consumeQuota(clientId: string): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split("T")[0];
  const userRecord = quotaStore.get(clientId);

  if (!userRecord || userRecord.date !== today) {
    quotaStore.set(clientId, { count: 1, date: today });
    return { allowed: true, remaining: DAILY_QUOTA_LIMIT - 1 };
  }

  if (userRecord.count >= DAILY_QUOTA_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  userRecord.count += 1;
  quotaStore.set(clientId, userRecord);
  return { allowed: true, remaining: DAILY_QUOTA_LIMIT - userRecord.count };
}

// ----------------------------------------------------------------------
// GET: Untuk mengambil info kuota terkini tanpa mengurangi batas harian
// ----------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const quota = getQuotaStatus(clientId);
  return NextResponse.json({ quota }, { status: 200 });
}

// ----------------------------------------------------------------------
// POST: Jalankan Analisis AI dan Potong Kuota
// ----------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);

    // 1. Cek dulu apakah kuota masih ada (tanpa memotong dahulu)
    const currentQuota = getQuotaStatus(clientId);
    if (currentQuota.remaining <= 0) {
      return NextResponse.json(
        {
          error: "Batas kuota analisis harian telah habis.",
          message: "Anda telah mencapai batas maksimal 5x pemindaian aman per hari.",
          quota: { remaining: 0, total: DAILY_QUOTA_LIMIT },
        },
        { status: 429 }
      );
    }

    // 2. Ambil data Form dari Step 1 & Step 2
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;
    const age = formData.get("age") as string;
    const medicalConditions = formData.get("medicalConditions") as string;
    const allergies = formData.get("allergies") as string;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Foto obat tidak ditemukan. Silakan unggah foto pada Step 2." },
        { status: 400 }
      );
    }

    // Validasi Format Gambar
    if (!ALLOWED_MIME_TYPES.includes(imageFile.type.toLowerCase())) {
      return NextResponse.json(
        {
          error: "Format foto tidak didukung. Harap unggah file dengan format JPG, JPEG, PNG, atau WEBP.",
        },
        { status: 400 }
      );
    }

    // Validasi Ukuran File Gambar
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Ukuran foto terlalu besar. Maksimal ukuran foto yang diizinkan adalah 10MB.",
        },
        { status: 400 }
      );
    }

    // Konversi file foto ke Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Jalankan analisis AI dengan Gemini
    const rawAnalysisResult = await analyzeMedicine(buffer, imageFile.type, {
      age: age || "Tidak diisi",
      medicalConditions: medicalConditions || "Tidak ada",
      allergies: allergies || "Tidak ada",
    });

    let parsedResult: AnalysisResponse;

    if (typeof rawAnalysisResult === "string") {
      const cleanJsonString = (rawAnalysisResult as string)
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsedResult = JSON.parse(cleanJsonString);
    } else {
      parsedResult = rawAnalysisResult as AnalysisResponse;
    }

    if (!parsedResult.detected_medicine_name || !parsedResult.safety_status) {
      throw new Error("Format JSON dari skema Gemini tidak valid.");
    }

    // 4. Potong Kuota Harian HANYA jika analisis Gemini SUKSES
    const quotaStatus = consumeQuota(clientId);

    // 5. Buat objek riwayat standar
    const historyItem = {
      id: `scan-${Date.now()}`,
      name: parsedResult.detected_medicine_name,
      medicineName: parsedResult.detected_medicine_name,
      time: `Hari ini • ${parsedResult.dosage_form || "Sediaan Obat"}`,
      dateFormatted: "Hari ini",
      status: parsedResult.safety_status,
      safetyStatus: parsedResult.safety_status,
      category:
        parsedResult.safety_status === "Aman"
          ? "SAFE"
          : parsedResult.safety_status === "Sebaiknya Dihindari"
          ? "WARNING"
          : "UNSAFE",
      detail: parsedResult.medical_explanation,
    };

    // 6. Return Response ke Frontend
    return NextResponse.json(
      {
        ...parsedResult,
        quota: {
          remaining: quotaStatus.remaining,
          total: DAILY_QUOTA_LIMIT,
        },
        historyItem,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ [API /api/analyze Error]:", error);

    return NextResponse.json(
      {
        error:
          error.message ||
          "Terjadi kesalahan internal saat menganalisis data obat.",
      },
      { status: 500 }
    );
  }
}