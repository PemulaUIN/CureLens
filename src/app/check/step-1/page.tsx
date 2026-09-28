'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';

export default function Step1Page() {
  const router = useRouter();
  const { profile, setProfile } = useFormContext();

  // Preset Pilihan Komorbiditas
  const diseasePresets = [
    'Hipertensi',
    'Diabetes Melitus',
    'Asma',
    'Penyakit Jantung',
    'Gagal Ginjal',
    'Maag/Lambung',
  ];

  // Preset Pilihan Alergi Obat
const allergyPresets = [
  'Penisilin / Amoksisilin',
  'Aspirin / NSAID',
  'Sulfonamida (Sulfa)',
  'Paracetamol',
  'Sefalosporin',
  'Antikonvulsan',
];

  // State lokal untuk tag komorbiditas
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    profile.medicalConditions ? profile.medicalConditions.split(', ').filter(Boolean) : []
  );
  const [customCondition, setCustomCondition] = useState('');

  // State lokal untuk tag alergi
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    profile.allergies ? profile.allergies.split(', ').filter(Boolean) : []
  );
  const [customAllergy, setCustomAllergy] = useState('');

  // Handler Komorbiditas
  const toggleCondition = (item: string) => {
    const updated = selectedConditions.includes(item)
      ? selectedConditions.filter((c) => c !== item)
      : [...selectedConditions, item];
    setSelectedConditions(updated);
  };

  const addCustomCondition = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const trimmed = customCondition.trim();
    if (trimmed && !selectedConditions.includes(trimmed)) {
      setSelectedConditions((prev) => [...prev, trimmed]);
      setCustomCondition('');
    }
  };

  // Handler Alergi
  const toggleAllergy = (item: string) => {
    const updated = selectedAllergies.includes(item)
      ? selectedAllergies.filter((a) => a !== item)
      : [...selectedAllergies, item];
    setSelectedAllergies(updated);
  };

  const addCustomAllergy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const trimmed = customAllergy.trim();
    if (trimmed && !selectedAllergies.includes(trimmed)) {
      setSelectedAllergies((prev) => [...prev, trimmed]);
      setCustomAllergy('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalConditions = [...selectedConditions];
    let finalAllergies = [...selectedAllergies];

    if (customCondition.trim() && !finalConditions.includes(customCondition.trim())) {
      finalConditions.push(customCondition.trim());
    }
    if (customAllergy.trim() && !finalAllergies.includes(customAllergy.trim())) {
      finalAllergies.push(customAllergy.trim());
    }

    setProfile({
      ...profile,
      medicalConditions: finalConditions.join(', '),
      allergies: finalAllergies.join(', '),
    });

    router.push('/check/step-2');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-800 font-sans">
      {/* 1. HEADER PAGE & KUOTA CARD */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-2">
        {/* Glow Hijaunya Kuota (Radial Background Glow) */}
        <div className="aria-hidden:true absolute -top-12 -right-12 w-96 h-96 bg-[#A6DB00]/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-2xl">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#A6DB00] text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Clinical AI
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Cek Obat</h1>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Lengkapi data dan riwayat kondisi medis lalu unggah foto obat untuk analisis kontraindikasi serta keamanan polifarmasi yang akurat.
          </p>
        </div>

        {/* Quota Card (Kanan Top) */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[280px] z-10">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-slate-500">Kuota Analisis Harian</span>
            <span className="text-slate-900 font-extrabold">3/5 Tersisa</span>
          </div>
          <div className="flex gap-1.5 mb-2">
            <div className="h-2 flex-1 bg-[#A6DB00] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#A6DB00] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#A6DB00] rounded-full"></div>
            <div className="h-2 flex-1 bg-slate-200/60 rounded-full"></div>
            <div className="h-2 flex-1 bg-slate-200/60 rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Maksimal 5x pemindaian aman per hari</p>
        </div>
      </div>

      {/* 2. STEPPER HEADER (3 STEPS) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Step 1 (Aktif) */}
        <div className="bg-[#F1F5F9] p-3.5 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#A6DB00] text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
            1
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FASE PENILAIAN</p>
            <p className="text-sm font-bold text-slate-900">Langkah 1: Profil Medis</p>
          </div>
        </div>

        {/* Step 2 (Inaktif) */}
        <div className="p-3.5 rounded-xl flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DOKUMENTASI</p>
            <p className="text-sm font-bold text-slate-700">Langkah 2: Unggah Foto</p>
          </div>
        </div>

        {/* Step 3 (Inaktif) */}
        <div className="p-3.5 rounded-xl flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            3
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SISTEMKOMPUTASI</p>
            <p className="text-sm font-bold text-slate-700">Langkah 3: Analisis AI</p>
          </div>
        </div>
      </div>

      {/* 3. FORM CARD UTAMA */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Data & Riwayat Medis</h2>
          <p className="text-xs text-slate-500 mt-1">
            Data ini digunakan untuk menghitung potensi interaksi obat dengan kondisi komorbiditas dan respon imun.
          </p>
        </div>

        {/* 3.1 Usia Pasien */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Usia Pasien (Tahun)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              required
              min="0"
              max="120"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-20 bg-[#F1F5F9] border-none rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A6DB00]"
              placeholder="30"
            />
            <span className="text-xs font-medium text-slate-500">Tahun</span>
          </div>
        </div>

        {/* 3.2 Riwayat Penyakit / Komorbiditas */}
<div className="space-y-3">
  <div className="flex justify-between items-center">
    <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Riwayat Penyakit
    </label>
    <span className="text-xs text-slate-400 font-medium">Pilih atau ketik kustom</span>
  </div>

  {/* Gabungkan array preset dan selectedConditions agar item kustom ikut ter-render */}
  <div className="flex flex-wrap gap-2">
    {Array.from(new Set([...diseasePresets, ...selectedConditions])).map((item) => {
      const isSelected = selectedConditions.includes(item);
      return (
        <button
          type="button"
          key={item}
          onClick={() => toggleCondition(item)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            isSelected
              ? 'bg-[#A6DB00] text-slate-950 shadow-sm'
              : 'bg-[#F1F5F9] text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          {item}
          {isSelected && <span className="text-[10px] font-bold">✕</span>}
        </button>
      );
    })}
  </div>

  <div className="flex gap-2 max-w-md pt-1">
    <input
      type="text"
      value={customCondition}
      onChange={(e) => setCustomCondition(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addCustomCondition();
        }
      }}
      className="flex-1 bg-[#F1F5F9] border-none rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#A6DB00]"
      placeholder="Tambah penyakit lain (cth: Asam Urat)..."
    />
    <button
      type="button"
      onClick={addCustomCondition}
      className="bg-[#18181B] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
    >
      Tambah
    </button>
  </div>
</div>

        {/* 3.3 Riwayat Alergi Obat */}
<div className="space-y-3">
  <div className="flex justify-between items-center">
    <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Riwayat Alergi Obat
    </label>
    <span className="text-xs text-slate-400 font-medium">Pilih atau ketik kustom</span>
  </div>

  {/* Render gabungan dari Preset + Input Custom yang sudah ditambahkan */}
  <div className="flex flex-wrap gap-2">
    {Array.from(new Set([...allergyPresets, ...selectedAllergies])).map((item) => {
      const isSelected = selectedAllergies.includes(item);
      return (
        <button
          type="button"
          key={item}
          onClick={() => toggleAllergy(item)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            isSelected
              ? 'bg-[#A6DB00] text-slate-950 shadow-sm'
              : 'bg-[#F1F5F9] text-slate-700 hover:bg-slate-200/80'
          }`}
        >
          {item}
          {isSelected && <span className="text-[10px] font-bold">✕</span>}
        </button>
      );
    })}
  </div>

  <div className="flex gap-2 max-w-md pt-1">
    <input
      type="text"
      value={customAllergy}
      onChange={(e) => setCustomAllergy(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addCustomAllergy();
        }
      }}
      className="flex-1 bg-[#F1F5F9] border-none rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#A6DB00]"
      placeholder="Tambah kandungan obat lain (cth: Ibuprofen)..."
    />
    <button
      type="button"
      onClick={addCustomAllergy}
      className="bg-[#18181B] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
    >
      Tambah
    </button>
  </div>
</div>

        {/* 3.4 Tombol Lanjut (Right-aligned Pill Button) */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-[#A6DB00] hover:bg-[#95c600] text-slate-950 font-bold px-6 py-3.5 rounded-full transition-all duration-200 flex items-center gap-2 shadow-sm text-sm"
          >
            Lanjut ke Unggah Foto ➔
          </button>
        </div>
      </form>
    </div>
  );
}