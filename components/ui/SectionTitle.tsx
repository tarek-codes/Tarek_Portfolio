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
        <span className="animate-text-gradient">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      className={`text-center max-w-3xl mx-auto mb-16 flex flex-col ${alignmentClasses[align]}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-ctp-surface0/50 backdrop-blur-sm border border-ctp-surface1 rounded-full text-sm mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Sparkles className="w-4 h-4 text-ctp-maroon" />
          <span className="text-ctp-text font-medium">{badge}</span>
        </motion.div>
      )}

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ctp-text mb-6">
        {renderTitle()}
      </h2>

      {subtitle && (
        <motion.p
          className="text-base sm:text-lg text-ctp-subtext0 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}



