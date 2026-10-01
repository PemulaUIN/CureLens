'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, ArrowLeft, Cpu, UploadCloud, X, FileText } from 'lucide-react';
import { useFormContext } from '@/context/FormContext';

export default function Step2Page() {
  const router = useRouter();
  
  // Ambil context dan buat fallback aman agar tidak error di TypeScript
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 3.4 Upload Section Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B]">
            Unggah Kemasan atau Resep Obat
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Sistem OCR CureLens akan otomatis mengekstrak komposisi aktif, dosis miligram, dan nomor registrasi BPOM.
          </p>
        </div>

        {/* Hidden Input File */}
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

        {/* Dropzone Box Inner */}
        {!previewUrl ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center bg-[#F8FAFC] transition-colors flex flex-col items-center justify-center space-y-4 ${
              isDragging ? 'border-[#A6DB00] bg-[#F1F5F9]' : 'border-slate-200'
            }`}
          >
            {/* Camera Icon in Soft Lime Container */}
            <div className="w-16 h-16 rounded-2xl bg-[#E2F396] bg-opacity-60 flex items-center justify-center text-[#1E293B]">
              <Camera className="w-8 h-8 text-[#1E293B]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base md:text-lg font-bold text-[#1E293B]">
                Seret & Jatuhkan Foto Kemasan Obat Di Sini
              </h3>
              <p className="text-xs md:text-sm text-[#64748B] max-w-md">
                Mendukung format JPG, PNG, WEBP (Maksimal 10MB). Pastikan tulisan komposisi terlihat fokus dan jelas.
              </p>
            </div>

            {/* Select File Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-6 py-3 bg-[#27272A] hover:bg-[#18181B] text-white font-medium text-sm rounded-full transition-all flex items-center gap-2 shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              Pilih File dari Perangkat
            </button>
          </div>
        ) : (
          /* Preview State */
          <div className="relative border border-slate-200 rounded-2xl p-4 bg-[#F8FAFC] flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-48 h-36 relative rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
              <img
                src={previewUrl}
                alt="Preview Foto Obat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center gap-2 text-[#1E293B] font-semibold text-sm">
                <FileText className="w-4 h-4 text-[#A6DB00]" />
                <span className="truncate max-w-xs">{selectedFile?.name}</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Ukuran: {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : 0} MB
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6DB00] bg-opacity-20 text-[#1E293B] text-xs font-semibold rounded-full">
                ✓ Siap dianalisis
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute top-3 right-3 md:static p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Hapus foto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 3.5 Bottom Action Bar */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
          <button
            type="button"
            onClick={() => router.push('/check/step-1')}
            className="px-6 py-3 bg-[#F1F5F9] hover:bg-slate-200 text-[#1E293B] font-semibold text-sm rounded-full transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedFile}
            className={`px-6 py-3 bg-[#A6DB00] hover:bg-[#95c500] text-[#1E293B] font-bold text-sm rounded-full transition-all flex items-center gap-2 shadow-sm ${
              !selectedFile ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Mulai Analisis AI (Hasil & Saran)
          </button>
        </div>
      </div>
    </div>
  );
}