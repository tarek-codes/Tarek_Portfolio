"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  const ease = [0.22, 1, 0.36, 1] as const;
  const springTransition = {
    type: "spring" as const,
    stiffness: 250,
    damping: 20,
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={
            reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 12 }
          }
          animate={
            reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
          }
          exit={
            reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }
          }
          transition={
            reducedMotion
              ? { duration: 0.2, ease }
              : { ...springTransition, duration: 0.35 }
          }
          whileHover={reducedMotion ? undefined : { y: -2, scale: 1.04 }}
          whileTap={reducedMotion ? { scale: 1 } : { scale: 0.94 }}
          onClick={scrollToTop}
          className="fixed bottom-40 left-4 z-40 rounded-full border border-ctp-surface0/60 bg-ctp-base/60 p-3 text-ctp-text shadow-lg shadow-ctp-crust/25 backdrop-blur-xl transition-colors hover:border-ctp-surface1 hover:bg-ctp-base/75 lg:bottom-7 lg:left-6"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}



