"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";

const traditionalSteps = [
  { icon: "🎥", label: "全程录制 2 小时", time: "2h" },
  { icon: "💻", label: "导入电脑", time: "15min" },
  { icon: "👀", label: "逐帧回看素材", time: "2h" },
  { icon: "✂️", label: "手动剪辑", time: "3h" },
  { icon: "📤", label: "渲染导出", time: "30min" },
];

const blinklifeSteps = [
  { icon: "🎥", label: "录制 + BLE 实时打点", time: "2h" },
  { icon: "✨", label: "一键生成高光", time: "30s" },
  { icon: "📤", label: "直接分享", time: "10s" },
];

export function PainSolutionSection() {
  return (
    <section className="py-32 px-6 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="为什么选择 BlinkLife"
          title="从 5 小时到 30 秒"
          description="传统运动视频后期流程冗长且痛苦。BlinkLife 用一个按压动作取代了整个回看剪辑链路。"
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Traditional */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <GlassCard className="p-8 h-full" hover={false}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent-red/20 flex items-center justify-center">
                  <span className="text-accent-red text-lg">✕</span>
                </div>
                <h3 className="text-xl font-semibold text-white">传统方式</h3>
              </div>

              <div className="space-y-4">
                {traditionalSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-xl">{step.icon}</span>
                    <span className="text-gray-300 flex-1">{step.label}</span>
                    <span className="text-gray-600 font-mono text-sm">
                      {step.time}
                    </span>
                    {i < traditionalSteps.length - 1 && (
                      <div className="absolute left-[2.1rem] mt-16 w-px h-4 bg-white/5" />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-gray-500">总耗时</span>
                <span className="text-accent-red font-bold font-mono text-2xl">
                  5h+
                </span>
              </div>
            </GlassCard>
          </motion.div>

          {/* BlinkLife */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <GlassCard
              className="p-8 h-full border-brand-500/20"
              hover={false}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <span className="text-brand-400 text-lg">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-white">BlinkLife</h3>
                <span className="text-xs text-brand-400 glass px-2 py-1 rounded-full">
                  推荐
                </span>
              </div>

              <div className="space-y-4">
                {blinklifeSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-brand-500/[0.06]"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span className="text-xl">{step.icon}</span>
                    <span className="text-gray-200 flex-1">{step.label}</span>
                    <span className="text-brand-400 font-mono text-sm font-medium">
                      {step.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-brand-500/10 flex items-center justify-between">
                <span className="text-gray-500">总耗时</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-brand-400 font-bold font-mono text-2xl">
                    2h
                  </span>
                  <span className="text-gray-600 font-mono text-lg">+</span>
                  <span className="text-accent-green font-bold font-mono text-2xl">
                    30s
                  </span>
                </div>
              </div>

              {/* Efficiency badge */}
              <motion.div
                className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 to-accent-purple/10 border border-brand-500/10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-gray-400 text-sm">后期效率提升</span>
                <div className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-accent-green bg-clip-text text-transparent mt-1">
                  99.7%
                </div>
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
