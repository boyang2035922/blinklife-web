"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`max-w-2xl ${alignment} mb-16`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {eyebrow && (
        <span className="text-brand-400 text-sm font-medium tracking-widest uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
