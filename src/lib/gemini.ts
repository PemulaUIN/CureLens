import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AnalysisResponse } from "@/types";

export async function analyzeMedicine(
  imageBuffer: Buffer,
  mimeType: string,
  profile: { age: string; medicalConditions: string; allergies: string },
): Promise<AnalysisResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY tidak ditemukan pada environment variables.",
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Model-model Gemini yang aktif & didukung saat ini
  const candidateModels = [
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
  ];

  const systemInstruction = `Anda adalah seorang asisten medis digital dan ahli farmakologi klinis dari CureLens yang sangat teliti. Tugas Anda adalah menganalisis foto kemasan obat dan membandingkan kandungan obat tersebut dengan profil medis pengguna untuk menentukan tingkat keamanan dan kontraindikasi.

[PROFIL MEDIS PENGGUNA]
- Umur: ${profile.age || "Tidak diisi"} tahun
- Riwayat Penyakit: ${profile.medicalConditions || "Tidak ada"}
- Riwayat Alergi: ${profile.allergies || "Tidak ada"}

[INSTRUKSI ANALISIS]
1. Identifikasi nama obat, varian, nomor batch (jika terlihat pada foto kemasan), bentuk sediaan/dosis, serta bahan aktif/komposisi utama dari foto kemasan obat yang dilampirkan.
2. Tentukan tingkat keyakinan AI (AI Confidence Level) dalam persentase (misal: 95%) berdasarkan kejelasan foto dan kelengkapan informasi obat yang terdeteksi.
3. Analisis apakah ada KONTRAINDIKASI, KETERBATASAN USIA, INTERAKSI PENYAKIT, atau RISIKO ALERGI antara kandungan obat tersebut dengan profil medis pengguna di atas.
4. Tentukan tingkat keamanan dalam salah satu dari 3 kategori berikut:
   - "Aman" (Risiko minimal / tidak ada kontraindikasi yang terdeteksi)
   - "Sebaiknya Dihindari" (Memerlukan pengawasan dokter, penyesuaian dosis, atau efek samping sedang)
   - "Tidak Aman (Terdeteksi)" (Kontraindikasi kuat atau risiko bahaya fatal terhadap kondisi/penyakit pasien)

[FORMAT RESPONS]
Kembalikan respons HANYA dalam bentuk JSON yang valid dengan struktur berikut:
{
  "detected_medicine_name": "Nama Obat & Varian (contoh: Flu & Cough Relief Extra (Bisamol Syrup))",
  "batch_number": "Nomor batch jika terdeteksi atau hilangkan hashtag (contoh: #02302001)",
  "dosage_form": "Sediaan obat (contoh: Sediaan Sirup / Kapsul)",
  "ai_confidence_level": "Persentase keyakinan AI (contoh: 95%)",
  "active_ingredients_text": "Daftar bahan aktif dalam teks ringkas (contoh: Pseudoephedrine HCl 30mg, Paracetamol 500mg, Chlorpheniramine Maleate 2mg)",
  "active_ingredients_list": ["Pseudoephedrine HCl 30mg", "Paracetamol 500mg", "Chlorpheniramine Maleate 2mg"],
  "safety_status": "Aman | Sebaiknya Dihindari | Tidak Aman (Terdeteksi)",
  "status_badge_label": "Label ringkas status untuk riwayat (contoh: Tidak Aman – Kontraindikasi Hipertensi)",
  "medical_explanation": "Penjelasan rinci mengenai mekanisme kerja obat dan interaksinya terhadap riwayat penyakit/alergi pasien dalam 2-3 kalimat medis yang mudah dipahami.",
  "recommendations": "Saran dan rekomendasi tindakan AI secara konkret (contoh: Hindari konsumsi obat ini. Disarankan beralih ke pereda hidung tersumbat topikal seperti semprot hidung saline...)"
}`;

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString("base64"),
      mimeType: mimeType || "image/jpeg",
    },
  };

  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              detected_medicine_name: { type: SchemaType.STRING },
              batch_number: { type: SchemaType.STRING },
              dosage_form: { type: SchemaType.STRING },
              ai_confidence_level: { type: SchemaType.STRING },
              active_ingredients_text: { type: SchemaType.STRING },
              active_ingredients_list: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
              safety_status: { type: SchemaType.STRING },
              status_badge_label: { type: SchemaType.STRING },
              medical_explanation: { type: SchemaType.STRING },
              recommendations: { type: SchemaType.STRING },
            },
            required: [
              "detected_medicine_name",
              "dosage_form",
              "safety_status",
              "medical_explanation",
              "recommendations",
            ],
          },
        },
      });

      const result = await model.generateContent([
        "Lakukan analisis obat berdasarkan foto yang dilampirkan sesuai instruksi prompt.",
        imagePart,
      ]);

      const responseText = result.response.text();
      return JSON.parse(responseText) as AnalysisResponse;
    } catch (error: any) {
      lastError = error;
      console.warn(
        `[Gemini API Warning] Model ${modelName} mengalami kendala: ${error?.message || error}. Mencoba model cadangan...`,
      );
    }
  }

  throw new Error(
    `Gagal memproses analisis medis. Detail: ${lastError?.message || lastError}`,
  );
}
