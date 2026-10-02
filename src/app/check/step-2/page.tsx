'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ArrowLeft, UploadCloud, X, FileText, ShieldCheck, ScanLine } from 'lucide-react';
import { useFormContext } from '@/context/FormContext';

export default function Step2Page() {
  const router = useRouter();

  // Ambil context dan fallback aman
  const formContext = useFormContext() as any;
  const formData = formContext?.formData || formContext?.data || {};
  const updateFormData = formContext?.updateFormData || formContext?.updateData || (() => {});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(formData.image || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    formData.image ? URL.createObjectURL(formData.image) : null
  );
  const [isDragging, setIsDragging] = useState(false);

  // Handle Pemilihan File
  const handleFileChange = (file: File) => {
    if (file && file.size <= 10 * 1024 * 1024) { // Max 10MB
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      updateFormData({ image: file });
    } else {
      alert('Ukuran file maksimal adalah 10MB!');
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
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    updateFormData({ image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Silakan unggah foto obat terlebih dahulu sebelum melanjutkan!');
      return;
    }
    router.push('/check/step-3');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-['Manrope',sans-serif] text-[#1E293B]">
      
      {/* ==================== 3.2 PAGE HEADER & DAILY QUOTA CARD ==================== */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6DB00] text-[#0F172A] rounded-full text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLINICAL AI</span>
          </div>

          {/* Title & Sub-description */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Cek Obat
          </h1>
          <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
            Lengkapi data dan riwayat kondisi medis lalu unggah foto obat untuk analisis kontraindikasi serta keamanan polifarmasi yang akurat.
          </p>
        </div>

        {/* Quota Card */}
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 min-w-[280px]">
          <div className="flex items-center justify-between text-xs font-bold text-[#1E293B] mb-2">
            <span>Kuota Analisis Harian</span>
            <span className="text-[#0F172A]">3/5 Tersisa</span>
          </div>
          {/* Progress Bar (5 segments, 3 active) */}
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            <div className="h-2 rounded-full bg-[#A6DB00]"></div>
            <div className="h-2 rounded-full bg-[#A6DB00]"></div>
            <div className="h-2 rounded-full bg-[#A6DB00]"></div>
            <div className="h-2 rounded-full bg-[#E2E8F0]"></div>
            <div className="h-2 rounded-full bg-[#E2E8F0]"></div>
          </div>
          <p className="text-[11px] text-[#94A3B8] font-medium">
            Maksimal 5x pemindaian aman per hari
          </p>
        </div>
      </div>

      {/* ==================== 3.3 STEPPER / PROGRESS HEADER ==================== */}
      <div className="bg-white rounded-2xl p-2 md:p-3 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Step 1 (Completed / Inactive) */}
        <div 
          onClick={() => router.push('/check/step-1')}
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

        {/* Step 2 (Active - Current) */}
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

        {/* Step 3 (Inactive) */}
        <div className="flex items-center gap-3 p-3 rounded-xl opacity-60">
          <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#64748B] flex items-center justify-center font-bold text-sm shrink-0">
            3
          </div>
          <div>
            <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              SINTESIS KOMPUTASI
            </span>
            <span className="text-sm font-bold text-[#64748B]">
              Langkah 3: Analisis AI
            </span>
          </div>
        </div>
      </div>

      {/* ==================== 3.4 UPLOAD SECTION (DROPZONE AREA) ==================== */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Unggah Kemasan Obat
          </h2>
          <p className="text-sm md:text-base text-[#64748B] mt-1.5">
            Sistem CureLens akan otomatis mengekstrak dan menganalisis nama obat, komposisi aktif, serta dosisnya
          </p>
        </div>

        {/* Input File Tersembunyi */}
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

        {/* Dropzone Container */}
        {!previewUrl ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`rounded-3xl p-10 md:p-14 text-center bg-[#F8FAFC] transition-all flex flex-col items-center justify-center space-y-5 border ${
              isDragging ? 'border-[#A6DB00] bg-[#F1F5F9] scale-[0.99]' : 'border-transparent'
            }`}
          >
            {/* Kamera Icon Box Soft Green */}
            <div className="w-16 h-16 rounded-2xl bg-[#E2F396]/60 flex items-center justify-center text-[#1E293B]">
              <Camera className="w-8 h-8 text-[#27272A]" />
            </div>

            <div className="space-y-2 max-w-lg">
              <h3 className="text-lg md:text-xl font-bold text-[#0F172A]">
                Seret & Jatuhkan Foto Kemasan Obat Di Sini
              </h3>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Mendukung format JPG, PNG, WEBP (Maksimal 10MB). Pastikan tulisan komposisi terlihat fokus dan jelas.
              </p>
            </div>

            {/* Pilih File Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-6 py-3 bg-[#27272A] hover:bg-[#18181B] text-white font-bold text-sm rounded-full transition-all flex items-center gap-2 shadow-sm"
            >
              Pilih File dari Perangkat
            </button>
          </div>
        ) : (
          /* Preview State */
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
                Ukuran: {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : 0} MB
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6DB00]/20 text-[#0F172A] text-xs font-bold rounded-full">
                ✓ Foto Siap untuk dianalisis
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Hapus foto"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* ==================== 3.5 BOTTOM ACTION BAR ==================== */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push('/check/step-1')}
          className="px-6 py-3 bg-[#F1F5F9] hover:bg-slate-200 text-[#1E293B] font-bold text-sm rounded-full transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedFile}
          className={`px-7 py-3.5 bg-[#A6DB00] hover:bg-[#95c500] text-[#0F172A] font-extrabold text-sm rounded-full transition-all flex items-center gap-2.5 shadow-sm ${
            !selectedFile ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <ScanLine className="w-4 h-4 text-[#0F172A]" />
          Mulai Analisis Obat
        </button>
      </div>

    </div>
  );
}