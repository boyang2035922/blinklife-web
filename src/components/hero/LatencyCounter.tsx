"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LatencyCounter() {
  const [value, setValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setValue(0);

      // Count from 0 to 6 quickly
      let count = 0;
      const step = setInterval(() => {
        count++;
        setValue(count);
        if (count >= 6) {
          clearInterval(step);
          setTimeout(() => setIsAnimating(false), 800);
        }
      }, 1); // ~1ms per step, total ~6ms

      return () => clearInterval(step);
    }, 4000);

    // Initial animation
    setTimeout(() => {
      setIsAnimating(true);
      let count = 0;
      const step = setInterval(() => {
        count++;
        setValue(count);
        if (count >= 6) {
          clearInterval(step);
          setTimeout(() => setIsAnimating(false), 800);
        }
      }, 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center justify-center gap-3 glass rounded-2xl px-6 py-3">
      {/* 动态指示点 */}
      <motion.div
        className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"
        animate={{ opacity: isAnimating ? [1, 0.3, 1] : 1, scale: isAnimating ? [1, 1.4, 1] : 1 }}
        transition={{ duration: 0.4, repeat: isAnimating ? Infinity : 0 }}
      />
      <div className="flex items-baseline gap-1">
        <motion.span
          className="text-3xl md:text-4xl font-bold font-mono tabular-nums leading-none"
          animate={{
            color: isAnimating ? "#1d93ff" : "#e2e8f0",
          }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
        <span className="text-base font-medium text-gray-500">ms</span>
      </div>
      <span className="text-gray-500 text-sm">BLE 端到端延迟</span>
    </div>
  );
}
