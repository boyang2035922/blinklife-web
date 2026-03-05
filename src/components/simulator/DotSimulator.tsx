"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WebGLCanvas } from "./WebGLCanvas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp } from "@/lib/animations";

interface DotMark {
  id: number;
  time: number; // 0-1 normalized position on timeline
  timestamp: number; // creation time in ms
  latencyMs: number;
  category: string;
}

interface PulseEffect {
  x: number;
  y: number;
  createdAt: number;
}

const CATEGORIES = ["进球", "精彩", "失误", "防守"];
const CATEGORY_COLORS: Record<string, string> = {
  进球: "bg-accent-green",
  精彩: "bg-brand-400",
  失误: "bg-accent-red",
  防守: "bg-accent-purple",
};

let dotId = 0;

export function DotSimulator() {
  const [dots, setDots] = useState<DotMark[]>([]);
  const [pulses, setPulses] = useState<PulseEffect[]>([]);
  const [latencyDisplay, setLatencyDisplay] = useState<number | null>(null);
  const [totalDots, setTotalDots] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const addDot = useCallback(() => {
    const time = (Date.now() % 60000) / 60000; // rolling 0-1
    const latency = 5 + Math.random() * 3; // 5-8ms
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    const newDot: DotMark = {
      id: ++dotId,
      time,
      timestamp: Date.now(),
      latencyMs: Math.round(latency * 10) / 10,
      category,
    };

    setDots((prev) => [...prev.slice(-19), newDot]); // keep last 20
    setTotalDots((prev) => prev + 1);

    // Pulse at a random position within the canvas area
    setPulses((prev) => [
      ...prev,
      {
        x: 0.1 + time * 0.8,
        y: 0.35,
        createdAt: Date.now(),
      },
    ]);

    // Show latency
    setLatencyDisplay(newDot.latencyMs);
    setTimeout(() => setLatencyDisplay(null), 1200);

    // Clean old pulses
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => Date.now() - p.createdAt < 1500));
    }, 2000);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        addDot();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [addDot]);

  const webglDots = useMemo(
    () => dots.map((d) => ({ x: d.time, time: d.time })),
    [dots]
  );

  return (
    <section id="simulator" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="交互体验"
          title="亲手感受毫秒级打点"
          description="按下空格键或点击下方区域，体验 BLE 6ms 实时响应的打点反馈"
        />

        {/* Simulator container */}
        <motion.div
          ref={containerRef}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            className="relative rounded-3xl overflow-hidden bg-surface-2/50 border border-white/5 cursor-pointer select-none"
            style={{ minHeight: "500px" }}
            onClick={addDot}
          >
            {/* WebGL layer */}
            <WebGLCanvas
              dots={webglDots}
              pulses={pulses}
              timelineProgress={0}
            />

            {/* UI overlay */}
            <div className="relative z-10 p-6 md:p-10 flex flex-col h-full" style={{ minHeight: "500px" }}>
              {/* Top bar */}
              <div className="flex items-center justify-between mb-auto">
                {/* Device indicator */}
                <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-sm text-gray-300">
                    BLE Ring Pro 已连接
                  </span>
                  <span className="text-xs text-gray-600 font-mono">
                    CI: 7.5ms
                  </span>
                </div>

                {/* Stats */}
                <div className="glass rounded-xl px-4 py-2 flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold font-mono text-white">
                      {totalDots}
                    </div>
                    <div className="text-[10px] text-gray-500">打点</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-xl font-bold font-mono text-brand-400">
                      {dots.length > 0
                        ? `${dots[dots.length - 1].latencyMs}`
                        : "—"}
                    </div>
                    <div className="text-[10px] text-gray-500">ms</div>
                  </div>
                </div>
              </div>

              {/* Center area - latency flash */}
              <div className="flex-1 flex items-center justify-center">
                <AnimatePresence>
                  {latencyDisplay !== null && (
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-6xl md:text-8xl font-bold font-mono text-brand-400">
                        {latencyDisplay}
                      </div>
                      <div className="text-lg text-gray-500 mt-1">
                        毫秒响应
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Timeline visualization */}
              <div className="mt-auto">
                {/* Dot events log */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                  <AnimatePresence mode="popLayout">
                    {dots.slice(-8).map((dot) => (
                      <motion.div
                        key={dot.id}
                        className="glass rounded-lg px-3 py-1.5 flex items-center gap-2 shrink-0"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        layout
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[dot.category] || "bg-brand-400"}`}
                        />
                        <span className="text-xs text-gray-300">
                          {dot.category}
                        </span>
                        <span className="text-[10px] text-gray-600 font-mono">
                          {dot.latencyMs}ms
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Timeline bar */}
                <div className="relative h-12 glass rounded-2xl overflow-hidden">
                  {/* Progress bar */}
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500/20 to-brand-500/5"
                    animate={{ width: `${((Date.now() % 60000) / 60000) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />

                  {/* Dot markers */}
                  {dots.map((dot) => (
                    <motion.div
                      key={dot.id}
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ left: `${dot.time * 100}%` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {/* Clip bracket */}
                      <div className="absolute -top-4 -bottom-4 -left-3 -right-3 border-x border-brand-400/30" />
                      {/* Dot */}
                      <div
                        className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[dot.category] || "bg-brand-400"} shadow-lg`}
                      />
                    </motion.div>
                  ))}

                  {/* Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <span className="text-[10px] text-gray-600 font-mono">
                      00:00
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono">
                      01:00
                    </span>
                  </div>
                </div>

                {/* Clip info */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-600">
                    剪辑窗口: 前 10s / 后 2s
                  </span>
                  <span className="text-xs text-gray-500">
                    按{" "}
                    <kbd className="glass rounded px-1.5 py-0.5 text-[10px] text-brand-400 font-mono">
                      Space
                    </kbd>{" "}
                    或点击打点
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generated clips preview */}
        <AnimatePresence>
          {dots.length > 0 && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm text-gray-500 mb-3 font-medium">
                已生成 {dots.length} 个高光片段
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {dots.slice(-4).map((dot, i) => (
                  <motion.div
                    key={dot.id}
                    className="glass rounded-xl p-3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="aspect-video rounded-lg bg-surface-3/50 mb-2 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-purple/10" />
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-white/30"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[dot.category]}`}
                        />
                        <span className="text-xs text-gray-400">
                          {dot.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-600">
                        12s
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
