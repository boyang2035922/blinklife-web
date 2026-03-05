"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-1 to-surface-0" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        className="relative max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span className="text-brand-400 text-sm font-medium tracking-widest uppercase">
            关于灵眸
          </span>
        </motion.div>

        {/* Mission Statement */}
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-8"
        >
          灵眸光年致力于通过
          <span className="bg-gradient-to-r from-brand-400 via-accent-purple to-accent-pink bg-clip-text text-transparent">
            {" "}AI 视觉技术
          </span>
          ，<br />
          重构人类捕捉与记录运动瞬间的方式。
        </motion.h2>

        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          className="w-12 h-px bg-white/10 mb-10"
        />

        {/* Info grid */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {[
            { label: "公司全称", value: "石家庄灵眸光年科技有限公司" },
            { label: "成立年份", value: "2025" },
            { label: "联系我们", value: "hello@blinklife.ai" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
                {label}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
