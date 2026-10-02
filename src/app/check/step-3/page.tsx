'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  Download, 
  RotateCcw, 
  Trash2, 
  History,
  Camera,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useFormContext } from '@/context/FormContext';

export default function Step3Page() {
  const router = useRouter();
  const formContext = useFormContext() as any;
  const formData = formContext?.formData || formContext?.data || {};

  // State untuk pop up "Lihat Detail" pada riwayat cek obat
  const [selectedItem, setSelectedItem] = useState<{ name: string; status: string } | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 font-sans text-[#1E293B]">
      
      {/* ========================================================= */}
      {/* TOP HEADER & QUOTA CARD SECTION                           */}
      {/* ========================================================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A6DB00] text-[#1E293B] text-xs font-extrabold rounded-full tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            CLINICAL AI
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] tracking-tight">
            Cek Obat
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-xl">
            Lengkapi data dan riwayat kondisi medis lalu unggah foto obat untuk analisis kontraindikasi serta keamanan polifarmasi yang akurat.
          </p>
        </div>

        {/* Quota Card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm min-w-[280px] w-full lg:w-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#1E293B]">Kuota Analisis Harian</span>
            <span className="text-xs font-extrabold text-[#1E293B]">3 / 5 Tersisa</span>
          </div>
          <div className="flex gap-1 mb-2">
            <div className="h-2 flex-1 bg-[#A6DB00] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#A6DB00] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#A6DB00] rounded-full"></div>
            <div className="h-2 flex-1 bg-slate-200 rounded-full"></div>
            <div className="h-2 flex-1 bg-slate-200 rounded-full"></div>
          </div>
          <p className="text-[11px] text-[#64748B]">Maksimal 5x pemindaian aman per hari.</p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STEPPER HEADER                                            */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="flex items-center gap-3 p-3 rounded-xl opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            1
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">FASE PENILAIAN</div>
            <div className="text-sm font-bold text-[#1E293B]">Langkah 1: Profil Medis</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3 p-3 rounded-xl opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">DOKUMENTASI</div>
            <div className="text-sm font-bold text-[#1E293B]">Langkah 2: Unggah Foto</div>
          </div>
        </div>

        {/* Step 3 (ACTIVE) */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F1F5F9] border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#A6DB00] text-[#1E293B] font-bold flex items-center justify-center text-sm">
            3
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">SINTESIS KOMPUTASI</div>
            <div className="text-sm font-bold text-[#1E293B]">Langkah 3: Analisis AI</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN ANALYSIS RESULT CARD                                 */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
        
        {/* Indikator Kategori Keamanan Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-[#64748B] tracking-wider uppercase">
            INDIKATOR KATEGORI KEAMANAN:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-[#64748B] rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Aman
            </span>
            <span className="px-3 py-1 bg-slate-100 text-[#64748B] rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Sebaiknya Dihindari
            </span>
            <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              Tidak Aman (Terdeteksi)
            </span>
          </div>
        </div>

        {/* Detail Foto & Komposisi Obat */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Foto Obat Terunggah */}
          <div className="md:col-span-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
                <Camera className="w-4 h-4" />
                FOTO KEMASAN TERUNGGAH
              </div>
              <span className="px-2 py-0.5 bg-[#A6DB00] text-[#1E293B] text-[10px] font-bold rounded-full">
                95%
              </span>
            </div>
            
            <div className="h-32 rounded-xl bg-slate-200 flex items-center justify-center overflow-hidden my-2">
              {formData.image ? (
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  alt="Foto Kemasan" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg mx-auto flex items-center justify-center font-bold text-xs mb-1">
                    OBAT
                  </div>
                </div>
              )}
            </div>

            
          </div>

          {/* Nama Obat & Kandungan OCR */}
          <div className="md:col-span-8 space-y-4">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">NAMA OBAT & VARIAN</span>
                <span className="text-xs text-[#64748B]">Batch: #02302001</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B]">
                Flu & Cough Relief Extra
              </h3>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                KANDUNGAN TERDETEKSI (AI OCR SCAN)
              </div>
              <p className="text-sm font-semibold text-[#1E293B] leading-relaxed">
                Pseudoephedrine HCl 30mg, Paracetamol 500mg, Chlorpheniramine Maleate 2mg
              </p>
            </div>
          </div>

        </div>

        {/* Box Penjelasan Medis & Interaksi */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-red-600 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Penjelasan Medis & Interaksi:
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Kandungan Pseudoephedrine bekerja menstimulasi vasokonstriksi (penyempitan pembuluh darah sistemik). Pada pasien dengan riwayat Hipertensi, hal ini dapat memicu lonjakan tekanan darah secara mendadak yang berisiko fatal terhadap pembuluh darah otak dan jantung.
          </p>
        </div>

        {/* Box Saran & Rekomendasi AI */}
        <div className="bg-[#EBF7C6] border border-[#d2ec70] rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#1E293B] font-bold text-base">
            <Lightbulb className="w-5 h-5 text-[#1E293B]" />
            Saran & Rekomendasi Tindakan AI:
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Hindari konsumsi obat ini. Disarankan beralih ke pereda hidung tersumbat topikal seperti semprot hidung saline (air garam fisiologis) atau alternatif obat flu non-vasokonstriktor, serta segera konsultasikan ke dokter atau apoteker.
          </p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* RIWAYAT CEK OBAT TERKINI SECTION                          */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1E293B]">Riwayat Cek Obat Terkini</h3>
              <p className="text-xs text-[#64748B]">Daftar obat yang telah dipindai dan dievaluasi sebelumnya</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">
            SINKRONISASI OTOMATIS
          </span>
        </div>

        <div className="space-y-3">
          {/* Item 1 - Tidak Aman */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                💊
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E293B]">Flu & Cough Relief Extra</h4>
                <p className="text-xs text-[#64748B]">Hari ini, 14:20 • Sediaan Sirup / Kapsul</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                ● Tidak Aman – Kontraindikasi
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem({ name: 'Flu & Cough Relief Extra', status: 'Tidak Aman – Kontraindikasi' })}
                className="text-xs font-bold text-[#1E293B] hover:underline px-2 py-1"
              >
                Lihat Detail &gt;
              </button>
              <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Item 2 - Aman */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                💊
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E293B]">Paracetamol 500mg Tablet</h4>
                <p className="text-xs text-[#64748B]">Kemarin, 09:15 • Analgesik Murni</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                ● Aman
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem({ name: 'Paracetamol 500mg Tablet', status: 'Aman' })}
                className="text-xs font-bold text-[#1E293B] hover:underline px-2 py-1"
              >
                Lihat Detail &gt;
              </button>
              <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Item 3 - Sebaiknya Dihindari */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                💊
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E293B]">Antasida Doen Suspensi</h4>
                <p className="text-xs text-[#64748B]">21 Okt 2025 • Antasida Lambung</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="px-3 py-1 bg-amber-200 text-amber-800 text-xs font-bold rounded-full">
                ● Sebaiknya Dihindari
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem({ name: 'Antasida Doen Suspensi', status: 'Sebaiknya Dihindari' })}
                className="text-xs font-bold text-[#1E293B] hover:underline px-2 py-1"
              >
                Lihat Detail &gt;
              </button>
              <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM ACTION BUTTONS                                     */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push('/check/step-2')}
          className="w-full sm:w-auto px-6 py-3 bg-[#F1F5F9] hover:bg-slate-200 text-[#1E293B] font-semibold text-sm rounded-full transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 bg-[#F1F5F9] hover:bg-slate-200 text-[#1E293B] font-semibold text-sm rounded-full transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Unduh Laporan PDF
          </button>

          <button
            type="button"
            onClick={() => router.push('/check/step-1')}
            className="w-full sm:w-auto px-6 py-3 bg-[#A6DB00] hover:bg-[#95c500] text-[#1E293B] font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Cek Obat Lagi
          </button>
        </div>
      </div>

{/* ========================================================= */}

{/* ========================================================= */}
{/* DISCLAIMER FOOTER                                         */}
{/* ========================================================= */}
<div className="bg-red-50 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#000000] border-2 border-red-500">
  <ShieldCheck className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
 <p>
  <strong className="text-red-600">Disclaimer:</strong> Analisis CureLens AI merupakan <strong className="text-slate-800">alat bantu triase informasi referensial</strong> dan <strong className="text-red-600">bukan pengganti diagnosis medis resmi</strong> dokter spesialis atau instruksi apoteker berlisensi. Jika Anda mengalami gejala akut atau reaksi alergi, segera kunjungi<strong className="text-red-600"> instalasi gawat darurat terdekat</strong>.
</p>
</div>

      {/* ========================================================= */}
      {/* POP UP DETAIL RIWAYAT                                     */}
      {/* ========================================================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#1E293B]">{selectedItem.name}</h3>
                <p className="text-xs text-[#64748B]">Status: {selectedItem.status}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed">
              Placeholder: detail hasil analisis obat akan ditampilkan di sini.
            </div>

            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="w-full px-6 py-3 bg-[#A6DB00] hover:bg-[#95c500] text-[#1E293B] font-bold text-sm rounded-full transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}