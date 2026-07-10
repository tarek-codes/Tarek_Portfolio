"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  badge?: string;
  highlightWord?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  badge,
  highlightWord,
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // Split title to apply gradient to specific word
  const renderTitle = () => {
    if (!highlightWord) {
      return <>{title}</>;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient-red">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      className={`text-center max-w-4xl mx-auto mb-20 flex flex-col ${alignmentClasses[align]}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {badge && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-ctp-red/5 backdrop-blur-md border border-ctp-red/20 rounded-full text-[10px] md:text-xs font-bold mb-6 tracking-widest text-ctp-red"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 220,
            damping: 20,
          }}
        >
          <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span>{badge.toUpperCase()}</span>
        </motion.div>
      )}

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-ctp-text tracking-tight mb-6 !leading-[1.05]">
        {renderTitle()}
      </h2>

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-ctp-subtext0 max-w-2xl mx-auto leading-relaxed font-medium opacity-80"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
