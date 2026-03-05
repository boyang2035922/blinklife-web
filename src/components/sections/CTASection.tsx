"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CTASection() {
  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 to-surface-1" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/5 rounded-full blur-[120px]" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeInUp}>
          <span className="text-brand-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            开始使用
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6"
        >
          准备好重新定义
          <br />
          <span className="bg-gradient-to-r from-brand-400 to-accent-purple bg-clip-text text-transparent">
            你的运动视频
          </span>
          了吗？
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
        >
          下载 BlinkLife，连接你的 BLE 外设，开始捕捉每一个精彩瞬间
        </motion.p>

        {/* App download buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            App Store
          </Button>
          <Button variant="secondary" size="lg">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l10 10-10 10c-.48-.22-1-.67-1-1.5zm14.66-6.2L5.84 21.4l9.02-9.02 2.8 1.92zm1.22-.83l-2.3-1.57 2.3-1.57c.79.54.79 2.6 0 3.14zM5.84 2.6l11.82 7.1-2.8 1.92L5.84 2.6z" />
            </svg>
            Google Play
          </Button>
        </motion.div>

        {/* Pricing hint */}
        <motion.div
          variants={fadeInUp}
          className="glass rounded-3xl p-8 md:p-12 max-w-lg mx-auto"
        >
          <div className="text-gray-500 text-sm mb-2">核心功能</div>
          <div className="text-4xl font-bold text-white mb-2">免费</div>
          <p className="text-gray-500 text-sm mb-6">
            打点、剪辑、分享 — 核心功能永久免费
          </p>
          <div className="border-t border-white/5 pt-6 space-y-3">
            {[
              "BLE 外设连接与打点",
              "自动剪辑与片段管理",
              "本地导出与社交分享",
              "多运动模式支持",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-accent-green/20 flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-accent-green"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-gray-600 text-xs">
              Pro 订阅：云存储 + AI 分析 + 专业模板 — 即将推出
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
