"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="fixed bottom-56 right-4 z-40 lg:hidden"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        onClick={toggleTheme}
        whileHover={{ y: -3, scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={springTransition}
        className="relative rounded-full border border-ctp-surface0/60 bg-ctp-base/60 p-3 text-ctp-red shadow-lg backdrop-blur-xl transition-colors hover:border-ctp-surface1"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5 text-ctp-red" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}



