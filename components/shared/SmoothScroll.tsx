"use client";

import { useEffect, useState } from "react";

export default function SmoothScroll() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let rafId = 0;
    let lenisInstance: {
      raf: (time: number) => void;
      destroy: () => void;
    } | null = null;
    let cancelled = false;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisInstance = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    void initLenis();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, [isMobile]);

  return null;
}



