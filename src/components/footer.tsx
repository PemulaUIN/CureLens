import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="CureLens Logo"
            width={110}
            height={30}
            className="h-7 w-auto object-contain"
          />
        </div>

        {/* Hak Cipta */}
        <p>© {new Date().getFullYear()} CureLens. All rights reserved.</p>
      </div>
    </footer>
  );
}