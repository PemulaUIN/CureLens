import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "CureLens - Analisis Keamanan & Kontraindikasi Obat Berbasis AI",
  description: "Cek keamanan obat berdasarkan profil medis Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${manrope.variable}`}>
      <body className="font-sans bg-white text-slate-800 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}