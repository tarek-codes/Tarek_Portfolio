"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy } from "@/lib/i18n/translations";

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export default function FloatingLanguageToggle() {
  const { locale, toggleLocale } = useLanguage();
  const copy = getCopy(locale);

  return (
    <motion.div
      className="fixed bottom-24 left-4 z-40 lg:hidden"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.02, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        type="button"
        onClick={toggleLocale}
        whileHover={{ y: -3, scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={springTransition}
        className="rounded-full border border-ctp-surface0/60 bg-ctp-base/60 p-3 text-ctp-red shadow-lg backdrop-blur-xl transition-colors hover:border-ctp-surface1"
        aria-label={copy.common.toggleLanguage}
      >
        <Globe
          className={`h-5 w-5 ${locale === "bn" ? "text-ctp-maroon" : ""}`}
        />
      </motion.button>
    </motion.div>
  );
}



