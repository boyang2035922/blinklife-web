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
    <div className="flex items-baseline gap-1">
      <motion.span
        className="text-7xl md:text-9xl font-bold font-mono tabular-nums"
        animate={{
          color: isAnimating ? "#1d93ff" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
      <span className="text-2xl md:text-4xl font-light text-gray-500">ms</span>
    </div>
  );
}
