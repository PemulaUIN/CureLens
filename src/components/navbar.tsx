"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCheck = pathname === "/check";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Gambar */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="CureLens Logo"
            width={200}
            height={50}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation Switcher Pill */}
        <nav className="inline-flex items-center bg-white border border-slate-200/80 rounded-full p-1.5 shadow-sm">
          {/* Link Beranda */}
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isHome
                ? "bg-[#A6DB00] text-slate-950 shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Beranda
          </Link>

          {/* Link Cek Obat */}
          <Link
            href="/check"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isCheck
                ? "bg-[#A6DB00] text-slate-950 shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Cek Obat
          </Link>
        </nav>
      </div>
    </header>
  );
}