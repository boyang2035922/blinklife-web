"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-brand-400"
      >
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 15v4M8 22h8" strokeLinecap="round" />
      </svg>
    ),
    title: "BLE 毫秒打点",
    description:
      "蓝牙低功耗 6ms 延迟，按下即标记。开放外设协议，兼容指环、手表、遥控器等任意 BLE 设备。",
    stats: "6ms",
    statsLabel: "延迟",
    color: "brand",
    details: ["CI 7.5-15ms 连接间隔", "多按键分类映射", "纽扣电池续航数月"],
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent-purple"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 4v16M16 4v16M2 12h20" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "智能剪辑",
    description:
      "根据打点时间戳自动截取前 M 秒后 N 秒，智能去重合并。AI 语义边界识别，告别机械式裁切。",
    stats: "1键",
    statsLabel: "生成",
    color: "purple",
    details: ["自动截取 M/N 秒", "智能去重与合并", "上下文感知剪辑"],
  },
  {
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent-pink"
      >
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2" />
        <path d="M18 2l4 4-4 4" />
        <path d="M22 6h-6a4 4 0 0 0-4 4v2" />
      </svg>
    ),
    title: "云端同步",
    description:
      "原始视频、打点数据、剪辑工程跨设备同步。云端重算引擎释放手机性能瓶颈。",
    stats: "∞",
    statsLabel: "同步",
    color: "pink",
    details: ["跨设备无缝同步", "云端 4K 渲染", "工程级数据备份"],
  },
];

export function FeatureTriptych() {
  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/50 to-surface-0" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="核心能力"
          title="三大支柱，重塑工作流"
          description="从物理世界的按压到数字世界的高光，每一环都经过精密设计"
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feat, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <GlassCard className="p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6">{feat.icon}</div>

                {/* Stats */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold font-mono ${
                        feat.color === "brand"
                          ? "text-brand-400"
                          : feat.color === "purple"
                            ? "text-accent-purple"
                            : "text-accent-pink"
                      }`}
                    >
                      {feat.stats}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {feat.statsLabel}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {feat.description}
                </p>

                {/* Detail list */}
                <ul className="space-y-2">
                  {feat.details.map((d, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${
                          feat.color === "brand"
                            ? "bg-brand-400"
                            : feat.color === "purple"
                              ? "bg-accent-purple"
                              : "bg-accent-pink"
                        }`}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
