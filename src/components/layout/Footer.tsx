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
          <a href="/privacy" className="hover:text-gray-300 transition-colors">
            隐私政策
          </a>
          <a href="/terms" className="hover:text-gray-300 transition-colors">
            使用条款
          </a>
          <a href="/contact" className="hover:text-gray-300 transition-colors">
            联系我们
          </a>
        </div>
      </div>

      {/* Legal */}
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
        <p>© 2026 石家庄灵眸光年科技有限公司. All rights reserved.</p>
        <p>
          {/* 备案号申请后替换下方占位文字 */}
          <a
            href="https://beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            冀ICP备XXXXXXXX号
          </a>
        </p>
      </div>
    </footer>
  );
}
