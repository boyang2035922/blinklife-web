"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroParticles } from "./HeroParticles";
import { LatencyCounter } from "./LatencyCounter";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL particle background */}
      <HeroParticles />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.9)_100%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Brand */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-8">
            <Image
              src="/images/logo.jpg"
              alt="BlinkLife Logo"
              width={24}
              height={24}
              className="w-6 h-6 rounded-md object-cover"
            />
            <span className="text-white font-semibold text-sm">BlinkLife</span>
            <span className="text-gray-500 text-xs">|</span>
            <span className="text-gray-400 text-xs">
              记录生活中的每个精彩瞬间
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]"
        >
          一次按压
          <br />
          <span className="bg-gradient-to-r from-brand-400 via-accent-purple to-accent-pink bg-clip-text text-transparent">
            捕捉永恒
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          BLE 毫秒级打点 + 智能剪辑，让运动视频创作从数小时缩短到数秒
        </motion.p>

        {/* Latency counter */}
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
            BLE 延迟低至
          </p>
          <LatencyCounter />
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-brand-400"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
