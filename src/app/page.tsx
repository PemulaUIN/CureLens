import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Pill, 
  AlertTriangle, 
  Camera, 
  ShieldAlert, 
  Check, 
  Sparkles 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#A6DB00] selection:text-black">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sisi Kiri: Text & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Cek Keamanan & Kontraindikasi Obat Berdasarkan Profil Medis secara Instan
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Unggah foto kemasan obat dan dapatkan analisis keamanan medis berbasis AI dalam hitungan detik untuk menghindari risiko efek samping & interaksi berbahaya.
            </p>
            <div className="pt-2">
              <Link
                href="/check"
                className="inline-flex items-center gap-3 bg-[#A6DB00] hover:bg-[#95c400] text-slate-950 font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <span>Cek Obat Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Sisi Kanan: Card Preview Hero (Ultra-Clean) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#A6DB00]/20 to-rose-400/20 rounded-[2.5rem] blur-xl opacity-70" />

            <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-slate-100 rounded-3xl p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden space-y-4">
              
              {/* Header Profile Pasien */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#A6DB00]/20 flex items-center justify-center text-slate-800 shrink-0">
                  <User className="w-5 h-5 text-slate-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 tracking-tight">Data Medis</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Usia: 52 Thn | Riwayat: Hipertensi | Alergi: -</p>
                </div>
              </div>

              {/* Box Info Obat Terdeteksi */}
              <div className="bg-slate-50/70 rounded-2xl p-3 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider">
                    <Pill className="w-3.5 h-3.5 text-slate-400" />
                    <span>OBAT TERDETEKSI</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-sm">
                    TIDAK AMAN
                  </span>
                </div>

                {/* Detail Obat dengan Thumbnail */}
                <div className="bg-white rounded-xl p-2.5 border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                    <Image
                      src="/obat.jpg"
                      alt="Kemasan Obat"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                        NAMA OBAT & VARIAN
                      </span>
                      <p className="text-xs font-extrabold text-slate-900 truncate">
                        Flu & Batuk
                      </p>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                        KANDUNGAN TERDETEKSI
                      </span>
                      <p className="text-[10px] text-slate-600 font-medium leading-tight line-clamp-1">
                        Paracetamol 125mg, Pseudoephedrine HCl 7.5mg
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout Merah: Penjelasan Medis */}
              <div className="bg-[#FEF2F2] border border-rose-200/80 rounded-2xl p-3 text-rose-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Penjelasan Medis & Interaksi:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-rose-900/90 pl-5">
                  Kandungan <strong className="font-semibold text-rose-950">Pseudoephedrine</strong> memicu penyempitan pembuluh darah. Pada riwayat Hipertensi Anda, hal ini berisiko meningkatkan tekanan darah secara mendadak.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= CARA KERJA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-100">
        
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cara Kerja CureLens
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Kelola keamanan konsumsi obat lebih cerdas dengan analisis kontraindikasi medis berbasis AI yang dipersonalisasi sesuai profil kesehatan Anda.
          </p>
        </div>

        {/* Step Grid 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#A6DB00]/20 flex items-center justify-center text-slate-900 mb-6">
                <User className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                1. Sinkronisasi Profil Medis
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Lengkapi profil kesehatan Anda untuk menyesuaikan deteksi kontraindikasi medis dan mendapatkan analisis yang aman.
              </p>
            </div>

            {/* Sub-Badges Input Preview */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Usia Pasien</span>
                <p className="text-sm font-extrabold text-slate-900">43 <span className="text-xs font-normal text-slate-500">Tahun</span></p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Riwayat Penyakit</span>
                <p className="text-sm font-extrabold text-slate-900">Hipertensi</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Riwayat Alergi</span>
                <p className="text-sm font-extrabold text-slate-900">Alergi Penisilin</p>
              </div>
            </div>
          </div>

          {/* Step 2 (Highlight Lime) */}
          <div className="bg-[#A6DB00] rounded-3xl p-8 text-slate-950 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-950/10 flex items-center justify-center text-slate-950 mb-6">
                <Camera className="w-5 h-5 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-2">
                2. Pindai Kemasan Obat
              </h3>
              <p className="text-slate-900 text-sm leading-relaxed mb-6 font-medium">
                Cukup ambil foto dan unggah label/komposisi pada kemasan obat. Sistem membaca nama & komposisi kimia aktif secara otomatis.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-950">
                  Deteksi teks OCR nama dan bahan aktif obat secara presisi.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-950">
                  Dukungan kemasan blister, botol sirup, strip tablet, hingga salep.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Step 3 (Full Width Result Card Preview) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
          
          {/* Header Step 3 */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-rose-100 rounded-lg text-rose-600">
                <Pill className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                3. Analisis Instan & Status Keamanan Medis
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium pl-8">
              AI akan menganalisis keamanan obat berdasarkan data medis user dan foto obat yang diunggah. Hasil disajikan dalam status (Aman, Sebaiknya Dihindari, Tidak Aman) beserta penjelasan dan rekomendasi.
            </p>
          </div>

          {/* Filter Status Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              INDIKATOR KATEGORI KEAMANAN:
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-400">
                Aman
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-400">
                Sebaiknya Dihindari
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                TIDAK AMAN
              </span>
            </div>
          </div>

          {/* Content Layout: Foto Obat di Kiri & Info Utama di Kanan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
            
            {/* Kartu Foto Obat (Kiri) */}
            <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-3 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  FOTO KEMASAN TERUNGGAH
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  95% Match
                </span>
              </div>

              <div className="relative w-full h-28 rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-inner flex items-center justify-center p-1">
                <Image
                  src="/obat.jpg"
                  alt="Kemasan Obat Bisamol Syrup"
                  fill
                  className="object-contain p-1"
                />
              </div>

              
            </div>

            {/* Detail Nama & Kandungan OCR (Kanan) */}
            <div className="lg:col-span-8 space-y-2">
              {/* Nama Obat */}
              <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    NAMA OBAT & VARIAN
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Batch: #02302001
                  </span>
                </div>
                <p className="text-base font-extrabold text-slate-900">
                  Flu & Batuk
                </p>
              </div>

              {/* Kandungan Terdeteksi */}
              <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  KANDUNGAN TERDETEKSI (AI OCR SCAN)
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  <strong className="text-slate-950 font-bold">Pseudoephedrine HCl 7.5mg</strong>, Paracetamol 125mg, Guaifenesin 50mg, Chlorpheniramine Maleate 1mg
                </p>
              </div>
            </div>

          </div>

          {/* Callouts Box: Penjelasan & Saran */}
          <div className="space-y-2.5 pt-1">
            
            {/* Callout Merah: Penjelasan Medis */}
            <div className="bg-[#FEF2F2] border border-rose-200/80 rounded-2xl p-3.5 text-rose-950">
              <div className="flex items-center gap-2 font-bold text-xs text-rose-700 mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Hasil Analisis:</span>
              </div>
              <p className="text-xs leading-relaxed font-normal text-rose-900/90 pl-6">
                Kandungan <strong className="font-semibold text-rose-950">Pseudoephedrine</strong> bekerja menstimulasi vasokonstriksi (penyempitan pembuluh darah sistemik). Pada pasien dengan riwayat Hipertensi, hal ini dapat memicu lonjakan tekanan darah secara mendadak yang berisiko fatal terhadap pembuluh darah otak dan jantung.
              </p>
            </div>

            {/* Callout Hijau: Saran AI */}
            <div className="bg-[#ECFCCB]/60 border border-[#A6DB00]/60 rounded-2xl p-3.5 text-slate-950">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                <Sparkles className="w-4 h-4 shrink-0 text-slate-800" />
                <span>Saran & Rekomendasi AI:</span>
              </div>
              <p className="text-xs leading-relaxed font-normal text-slate-800 pl-6">
                Hindari konsumsi obat ini. Disarankan beralih ke pereda hidung tersumbat topikal seperti semprot hidung saline (air garam fisiologis) atau alternatif obat flu non-vasokonstriktor, serta segera konsultasikan ke dokter atau apoteker.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= VALUE PROPOSITION / BANNER SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#A6DB00] rounded-3xl p-8 sm:p-12 text-slate-950 shadow-sm relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-950/10 px-3 py-1 rounded-full text-xs font-bold text-slate-950">
              <ShieldAlert className="w-4 h-4" />
              <span>PENTINGNYA KEAMANAN MEDIS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-snug tracking-tight">
              Hindari Risiko Fatal Akibat Interaksi Obat & Kondisi Bawaan
            </h2>

            <p className="text-slate-900/90 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              Banyak pasien tidak sadar bahwa obat bebas (<span className="italic">over-the-counter</span>) yang dikonsumsi sembarangan dapat memicu kontraindikasi serius terhadap penyakit kronis seperti hipertensi, diabetes, atau asma. CureLens hadir sebagai lapisan perlindungan pertama Anda.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-950 shadow-sm">
                <Check className="w-4 h-4 text-slate-950" />
                <span>Deteksi Komposisi Aktif</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-950 shadow-sm">
                <Check className="w-4 h-4 text-slate-950" />
                <span>Peringatan Dini Alergi</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold text-slate-950 shadow-sm">
                <Check className="w-4 h-4 text-slate-950" />
                <span>Saran Dosis & Petunjuk</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}