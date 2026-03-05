import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="BlinkLife Logo"
            width={24}
            height={24}
            className="w-6 h-6 rounded-md object-cover"
          />
          <span className="text-white font-semibold">BlinkLife</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-300 transition-colors">
            隐私政策
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            使用条款
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            联系我们
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} BlinkLife. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
