'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';

export default function Step1Page() {
  const router = useRouter();
  const { profile, setProfile, quota } = useFormContext();

  // Preset Pilihan Komorbiditas
  const diseasePresets = [
    'Tidak Ada',
    'Hipertensi',
    'Diabetes Melitus',
    'Asma',
    'Penyakit Jantung',
    'Gagal Ginjal',
    'Maag/Lambung',
  ];

  // Preset Pilihan Alergi Obat
  const allergyPresets = [
    'Tidak Ada',
    'Penisilin / Amoksisilin',
    'Aspirin / NSAID',
    'Sulfonamida (Sulfa)',
    'Paracetamol',
    'Sefalosporin',
    'Antikonvulsan',
  ];

  // State lokal untuk tag komorbiditas
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [customCondition, setCustomCondition] = useState('');

  // State lokal untuk tag alergi
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState('');

  // Sinkronisasi awal dari Context ke State Lokal saat komponen dipasang / profile berubah
  useEffect(() => {
    if (profile.medicalConditions) {
      setSelectedConditions(
        profile.medicalConditions.split(', ').map((s) => s.trim()).filter(Boolean)
      );
    } else {
      setSelectedConditions([]);
    }

    if (profile.allergies) {
      setSelectedAllergies(
        profile.allergies.split(', ').map((s) => s.trim()).filter(Boolean)
      );
    } else {
      setSelectedAllergies([]);
    }
  }, [profile.medicalConditions, profile.allergies]);

  // Handler Komorbiditas
  const toggleCondition = (item: string) => {
    if (selectedConditions.includes(item)) {
      const updated = selectedConditions.filter((c) => c !== item);
      setSelectedConditions(updated);
    } else {
      if (item === 'Tidak Ada') {
        setSelectedConditions(['Tidak Ada']);
      } else {
        const filtered = selectedConditions.filter((c) => c !== 'Tidak Ada');
        setSelectedConditions([...filtered, item]);
      }
    }
  };

  const addCustomCondition = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const trimmed = customCondition.trim();
    if (trimmed) {
      const filtered = selectedConditions.filter((c) => c !== 'Tidak Ada');
      if (!filtered.includes(trimmed)) {
        setSelectedConditions([...filtered, trimmed]);
        setCustomCondition('');
      }
    }
  };

  // Handler Alergi
  const toggleAllergy = (item: string) => {
    if (selectedAllergies.includes(item)) {
      const updated = selectedAllergies.filter((a) => a !== item);
      setSelectedAllergies(updated);
    } else {
      if (item === 'Tidak Ada') {
        setSelectedAllergies(['Tidak Ada']);
      } else {
        const filtered = selectedAllergies.filter((a) => a !== 'Tidak Ada');
        setSelectedAllergies([...filtered, item]);
      }
    }
  };

  const addCustomAllergy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const trimmed = customAllergy.trim();
    if (trimmed) {
      const filtered = selectedAllergies.filter((a) => a !== 'Tidak Ada');
      if (!filtered.includes(trimmed)) {
        setSelectedAllergies([...filtered, trimmed]);
        setCustomAllergy('');
      }
    }
  };

  // Nilai kuota konsisten dibaca langsung dari FormContext
  const remainingQuota = quota?.remaining ?? 5;
  const totalQuota = quota?.total ?? 5;
  const isQuotaExhausted = remainingQuota <= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isQuotaExhausted) {
      alert('Kuota harian analisis Anda sudah habis. Silakan coba lagi besok!');
      return;
    }

    // 1. Validasi Usia
    if (!profile.age) {
      alert('Silakan isi usia pasien terlebih dahulu.');
      return;
    }

    // Hitung pilihan kondisi termasuk input kustom yang belum ditekan tombol "Tambah"
    let finalConditions = [...selectedConditions];
    if (customCondition.trim()) {
      finalConditions = finalConditions.filter((c) => c !== 'Tidak Ada');
      if (!finalConditions.includes(customCondition.trim())) {
        finalConditions.push(customCondition.trim());
      }
    }

    // 2. Validasi Riwayat Penyakit
    if (finalConditions.length === 0) {
      alert('Silakan pilih atau tambahkan riwayat penyakit (atau pilih "Tidak Ada").');
      return;
    }

    // Hitung pilihan alergi termasuk input kustom yang belum ditekan tombol "Tambah"
    let finalAllergies = [...selectedAllergies];
    if (customAllergy.trim()) {
      finalAllergies = finalAllergies.filter((a) => a !== 'Tidak Ada');
      if (!finalAllergies.includes(customAllergy.trim())) {
        finalAllergies.push(customAllergy.trim());
      }
    }

    // 3. Validasi Riwayat Alergi Obat
    if (finalAllergies.length === 0) {
      alert('Silakan pilih atau tambahkan riwayat alergi obat (atau pilih "Tidak Ada").');
      return;
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
        <div className="aria-hidden:true absolute -top-12 -right-12 w-96 h-96 bg-[#A6DB00]/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-2xl">
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

        {/* Quota Card Dinamis */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[280px] z-10">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-slate-500">Kuota Analisis Harian</span>
            <span className={`font-extrabold ${isQuotaExhausted ? 'text-rose-600' : 'text-slate-900'}`}>
              {remainingQuota}/{totalQuota} Tersisa
            </span>
          </div>
          <div className="flex gap-1.5 mb-2">
            {Array.from({ length: totalQuota }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index < remainingQuota ? 'bg-[#A6DB00]' : 'bg-slate-200/60'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Maksimal {totalQuota}x pemindaian aman per hari</p>
        </div>
      </div>

      {/* 2. STEPPER HEADER */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-[#F1F5F9] p-3.5 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#A6DB00] text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
            1
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FASE PENILAIAN</p>
            <p className="text-sm font-bold text-slate-900">Langkah 1: Profil Medis</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DOKUMENTASI</p>
            <p className="text-sm font-bold text-slate-700">Langkah 2: Unggah Foto</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            3
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SISTEM KOMPUTASI</p>
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
              value={profile.age || ''}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-20 bg-[#F1F5F9] border-none rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A6DB00]"
              placeholder="30"
            />
            <span className="text-xs font-medium text-slate-500">Tahun</span>
          </div>
        </div>

        {/* 3.2 Riwayat Penyakit */}
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

        {/* Peringatan jika kuota habis */}
        {isQuotaExhausted && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Kuota analisis harian Anda telah habis (0/5). Silakan kembali esok hari untuk menggunakan fitur ini.
          </div>
        )}

        {/* 3.4 Tombol Lanjut */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isQuotaExhausted}
            className={`font-bold px-6 py-3.5 rounded-full transition-all duration-200 flex items-center gap-2 shadow-sm text-sm ${
              isQuotaExhausted
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#A6DB00] hover:bg-[#95c600] text-slate-950'
            }`}
          >
            Lanjut ke Unggah Foto ➔
          </button>
        </div>
      </form>
    </div>
  );
}