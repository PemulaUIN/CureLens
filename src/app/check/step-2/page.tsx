"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  ArrowLeft,
  X,
  FileText,
  ShieldCheck,
  ScanLine,
  Loader2,
} from "lucide-react";
import { useFormContext } from "@/context/FormContext";

export default function Step2Page() {
  const router = useRouter();
  const formContext = useFormContext() as any;
  const {
    profile,
    quota,
    setQuota,
    setSelectedImage,
    setAnalysisResult,
    setFormData,
  } = formContext;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalQuota = typeof quota?.total === "number" ? quota.total : 5;
  const remainingQuota =
    typeof quota?.remaining === "number" ? quota.remaining : 5;
  const isQuotaExhausted = remainingQuota <= 0;

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (file: File) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file);
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl);
      setErrorMessage(null);
    } else {
      alert("Ukuran file maksimal adalah 10MB!");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) {
      alert("Silakan unggah foto obat terlebih dahulu sebelum melanjutkan!");
      return;
    }

    if (isQuotaExhausted) {
      setErrorMessage(
        "Kuota harian Anda telah habis. Silakan coba lagi besok.",
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Konversi Gambar ke Base64
      const base64Image = await fileToBase64(selectedFile);

      if (setSelectedImage) {
        setSelectedImage(base64Image);
      }

      // 2. Buat Payload FormData
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("age", profile?.age || "");
      formData.append("medicalConditions", profile?.medicalConditions || "");
      formData.append("allergies", profile?.allergies || "");

      // 3. Panggil API Route Backend
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Terjadi kesalahan saat menganalisis obat.",
        );
      }

      // 4. Update State Context
      if (data.quota && setQuota) {
        setQuota(data.quota);
      }

      if (setAnalysisResult) {
        setAnalysisResult(data);
      }

      if (setFormData) {
        setFormData((prev: any) => ({
          ...prev,
          image: selectedFile,
          imagePreview: base64Image,
          analysisResult: data,
          analysis: data,
        }));
      }

      // 5. Pindah Halaman Langsung
      router.push("/check/step-3");
    } catch (err: any) {
      console.error("Analysis error:", err);
      setErrorMessage(err.message || "Gagal terhubung ke server.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-sans text-[#1E293B]">
      {/* HEADER & QUOTA */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6DB00] text-[#0F172A] rounded-full text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLINICAL AI</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Cek Obat
          </h1>
          <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
            Lengkapi data dan riwayat kondisi medis lalu unggah foto obat untuk
            analisis kontraindikasi serta keamanan polifarmasi yang akurat.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 min-w-[280px]">
          <div className="flex items-center justify-between text-xs font-bold text-[#1E293B] mb-2">
            <span>Kuota Analisis Harian</span>
            <span className="text-[#0F172A]">
              {remainingQuota}/{totalQuota} Tersisa
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            {Array.from({ length: totalQuota }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full ${
                  index < remainingQuota ? "bg-[#A6DB00]" : "bg-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-[#94A3B8] font-medium">
            Maksimal {totalQuota}x pemindaian aman per hari
          </p>
        </div>
      </div>

      {/* STEPPER PROGRESS */}
      <div className="bg-white rounded-2xl p-2 md:p-3 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div
          onClick={() => !isLoading && router.push("/check/step-1")}
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#64748B] flex items-center justify-center font-bold text-sm shrink-0">
            1
          </div>
          <div>
            <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              FASE PENILAIAN
            </span>
            <span className="text-sm font-bold text-[#64748B]">
              Langkah 1: Profil Medis
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F1F5F9]">
          <div className="w-9 h-9 rounded-full bg-[#A6DB00] text-[#0F172A] flex items-center justify-center font-bold text-sm shrink-0">
            2
          </div>
          <div>
            <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              DOKUMENTASI
            </span>
            <span className="text-sm font-bold text-[#0F172A]">
              Langkah 2: Unggah Foto
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl opacity-60">
          <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#64748B] flex items-center justify-center font-bold text-sm shrink-0">
            3
          </div>
          <div>
            <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              SISTEM KOMPUTASI
            </span>
            <span className="text-sm font-bold text-[#64748B]">
              Langkah 3: Analisis AI
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl font-medium">
          ⚠ {errorMessage}
        </div>
      )}

      {/* UPLOAD ZONE */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Unggah Kemasan Obat
          </h2>
          <p className="text-sm md:text-base text-[#64748B] mt-1.5">
            Sistem CureLens akan otomatis mengekstrak dan menganalisis nama
            obat, komposisi aktif, serta dosisnya
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />

        {!previewUrl ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`rounded-3xl p-10 md:p-14 text-center bg-[#F8FAFC] transition-all flex flex-col items-center justify-center space-y-5 border ${
              isDragging
                ? "border-[#A6DB00] bg-[#F1F5F9] scale-[0.99]"
                : "border-transparent"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#E2F396]/60 flex items-center justify-center text-[#1E293B]">
              <Camera className="w-8 h-8 text-[#27272A]" />
            </div>

            <div className="space-y-2 max-w-lg">
              <h3 className="text-lg md:text-xl font-bold text-[#0F172A]">
                Seret & Jatuhkan Foto Kemasan Obat Di Sini
              </h3>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Mendukung format JPG, PNG, WEBP (Maksimal 10MB). Pastikan
                tulisan komposisi terlihat fokus dan jelas.
              </p>
            </div>

            <button
              type="button"
              disabled={isLoading || isQuotaExhausted}
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-6 py-3 bg-[#27272A] hover:bg-[#18181B] text-white font-bold text-sm rounded-full transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pilih File dari Perangkat
            </button>
          </div>
        ) : (
          <div className="relative border border-slate-200 rounded-2xl p-5 bg-[#F8FAFC] flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-52 h-40 relative rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-inner">
              <img
                src={previewUrl}
                alt="Preview Foto Obat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full space-y-2.5">
              <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base">
                <FileText className="w-5 h-5 text-[#86B300]" />
                <span className="truncate max-w-md">{selectedFile?.name}</span>
              </div>
              <p className="text-xs text-[#64748B] font-medium">
                Ukuran:{" "}
                {selectedFile
                  ? (selectedFile.size / (1024 * 1024)).toFixed(2)
                  : 0}{" "}
                MB
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6DB00]/20 text-[#0F172A] text-xs font-bold rounded-full">
                ✓ Foto Siap untuk dianalisis
              </div>
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleRemoveFile}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50"
              title="Hapus foto"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => router.push("/check/step-1")}
          className="px-6 py-3 bg-[#F1F5F9] hover:bg-slate-200 text-[#1E293B] font-bold text-sm rounded-full transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <button
          type="button"
          disabled={!selectedFile || isLoading || isQuotaExhausted}
          onClick={handleStartAnalysis}
          className={`px-7 py-3.5 bg-[#A6DB00] hover:bg-[#95c500] text-[#0F172A] font-extrabold text-sm rounded-full transition-all flex items-center gap-2.5 shadow-sm ${
            !selectedFile || isLoading || isQuotaExhausted
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#0F172A]" />
              Menganalisis Obat...
            </>
          ) : (
            <>
              <ScanLine className="w-4 h-4 text-[#0F172A]" />
              Mulai Analisis Obat
            </>
          )}
        </button>
      </div>
    </div>
  );
}
