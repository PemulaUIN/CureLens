import { NextRequest, NextResponse } from "next/server";
import { analyzeMedicine } from "@/lib/gemini";
import { AnalysisResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData.get("image") as File | null;
    const age = formData.get("age") as string;
    const medicalConditions = formData.get("medicalConditions") as string;
    const allergies = formData.get("allergies") as string;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Foto obat tidak ditemukan." },
        { status: 400 },
      );
    }

    // Konversi file ke Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Jalankan analisis dengan helper Gemini
    const rawAnalysisResult = await analyzeMedicine(buffer, imageFile.type, {
      age: age || "Tidak diisi",
      medicalConditions: medicalConditions || "Tidak ada",
      allergies: allergies || "Tidak ada",
    });

    // Sanitasi & Parsing JSON jika fungsi analyzeMedicine mengembalikan String/Text
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

    // Validasi disesuaikan dengan key dari prompt Gemini (detected_medicine_name & safety_status)
    if (!parsedResult.detected_medicine_name || !parsedResult.safety_status) {
      throw new Error("Format JSON dari skema Gemini tidak valid.");
    }

    return NextResponse.json(parsedResult, { status: 200 });
  } catch (error: any) {
    // Print pesan error lengkap di VS Code / Terminal Server
    console.error("❌ [API /api/analyze Error]:", error);

    return NextResponse.json(
      {
        error:
          error.message ||
          "Terjadi kesalahan internal saat menganalisis data obat.",
      },
      { status: 500 },
    );
  }
}
