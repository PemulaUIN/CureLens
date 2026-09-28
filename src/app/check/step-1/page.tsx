'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';

export default function Step1Page() {
  const router = useRouter();
  const { profile, setProfile } = useFormContext();

  // Preset Pilihan
  const diseasePresets = [
    'Hipertensi',
    'Diabetes Melitus',
    'Asma',
    'Penyakit Jantung',
    'Gagal Ginjal',
    'Maag/Lambung',
  ];

  // Menghapus 'Seafood' dan 'Kacang-kacangan'
  const allergyPresets = [
    'Alergi Penisilin',
    'Aspirin',
    'Sulfonamida',
  ];

  // State lokal untuk tag yang dipilih & input custom
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    profile.medicalConditions ? profile.medicalConditions.split(', ').filter(Boolean) : []
  );
  const [customCondition, setCustomCondition] = useState('');

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    profile.allergies ? profile.allergies.split(', ').filter(Boolean) : []
  );
  const [customAllergy, setCustomAllergy] = useState('');

  // Toggle Komorbiditas
  const toggleCondition = (item: string) => {
    const updated = selectedConditions.includes(item)
      ? selectedConditions.filter((c) => c !== item)
      : [...selectedConditions, item];
    setSelectedConditions(updated);
  };

  const addCustomCondition = () => {
    if (customCondition.trim() && !selectedConditions.includes(customCondition.trim())) {
      setSelectedConditions([...selectedConditions, customCondition.trim()]);
      setCustomCondition('');
    }
  };

  // Toggle Alergi
  const toggleAllergy = (item: string) => {
    const updated = selectedAllergies.includes(item)
      ? selectedAllergies.filter((a) => a !== item)
      : [...selectedAllergies, item];
    setSelectedAllergies(updated);
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      setSelectedAllergies([...selectedAllergies, customAllergy.trim()]);
      setCustomAllergy('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      medicalConditions: selectedConditions.join(', '),
      allergies: selectedAllergies.join(', '),
    });
    router.push('/check/step-2');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Info & Kuota */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="inline-block bg-[#8CC63F]/10 text-[#8CC63F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            ✓ Clinical AI Triaging Engine
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">Cek Obat</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Lengkapi data dan riwayat kondisi medis lalu unggah foto obat untuk analisis kontraindikasi serta keamanan polifarmasi yang akurat.
          </p>
        </div>

        {/* Card Kuota */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm min-w-[260px]">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-500">Kuota Analisis Harian</span>
            <span className="text-slate-800">3/5 Tersisa</span>
          </div>
          <div className="flex gap-1 mb-2">
            <div className="h-2 flex-1 bg-[#8CC63F] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#8CC63F] rounded-full"></div>
            <div className="h-2 flex-1 bg-[#8CC63F] rounded-full"></div>
            <div className="h-2 flex-1 bg-slate-100 rounded-full"></div>
            <div className="h-2 flex-1 bg-slate-100 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400">Maksimal 5x pemindaian aman per hari</p>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-2">
        {/* Step 1 (Active) */}
        <div className="flex-1 bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#8CC63F] text-white font-bold flex items-center justify-center text-sm">
            1
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FASE PENILAIAN</p>
            <p className="text-sm font-bold text-slate-800">Langkah 1: Profil Medis</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex-1 p-4 rounded-xl flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DOKUMENTASI</p>
            <p className="text-sm font-bold text-slate-700">Langkah 2: Unggah Foto</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex-1 p-4 rounded-xl flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-sm">
            3
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SINTESIS KOMPUTASI</p>
            <p className="text-sm font-bold text-slate-700">Langkah 3: Analisis AI</p>
          </div>
        </div>
      </div>

      {/* Form Card Utama */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Data & Riwayat Farmakologi</h2>
          <p className="text-xs text-slate-400 mt-1">
            Data ini digunakan untuk menghitung potensi interaksi obat dengan kondisi komorbiditas dan respon imun.
          </p>
        </div>

        {/* Usia Pasien */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <span>📅</span> Usia Pasien (Tahun)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              required
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              placeholder="30"
            />
            <span className="text-sm font-medium text-slate-500">Tahun</span>
          </div>
        </div>

        {/* Riwayat Penyakit / Komorbiditas */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span>📋</span> Riwayat Penyakit / Komorbiditas
            </label>
            <span className="text-xs text-slate-400">Pilih atau ketik kustom</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {diseasePresets.map((item) => {
              const isSelected = selectedConditions.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleCondition(item)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#8CC63F] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 max-w-md pt-1">
            <input
              type="text"
              value={customCondition}
              onChange={(e) => setCustomCondition(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              placeholder="Tambah penyakit lain (cth: Asam Urat)..."
            />
            <button
              type="button"
              onClick={addCustomCondition}
              className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-slate-800 transition"
            >
              Tambah
            </button>
          </div>
        </div>

        {/* Riwayat Alergi */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span>⚠️</span> Riwayat Alergi Obat 
            </label>
            <span className="text-xs text-slate-400">Pilih atau ketik kustom</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {allergyPresets.map((item) => {
              const isSelected = selectedAllergies.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleAllergy(item)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#8CC63F] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 max-w-md pt-1">
            <input
              type="text"
              value={customAllergy}
              onChange={(e) => setCustomAllergy(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
              placeholder="Tambah alergi lain (cth: Ibuprofen)..."
            />
            <button
              type="button"
              onClick={addCustomAllergy}
              className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-slate-800 transition"
            >
              Tambah
            </button>
          </div>
        </div>

        {/* Tombol Lanjut */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-[#8CC63F] hover:bg-[#7bb333] text-slate-900 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            Lanjut ke Unggah Foto ➔
          </button>
        </div>
      </form>
    </div>
  );
}