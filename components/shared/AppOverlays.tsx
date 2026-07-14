"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FloatingThemeToggle from "@/components/shared/FloatingThemeToggle";
import FloatingLanguageToggle from "@/components/shared/FloatingLanguageToggle";
import SmoothScroll from "@/components/shared/SmoothScroll";

const ScrollToTop = dynamic(() => import("@/components/shared/ScrollToTop"), {
  ssr: false,
  loading: () => null,
});

const FloatingStats = dynamic(
  () => import("@/components/features/stats/FloatingStats"),
  {
    ssr: false,
    loading: () => null,
  },
);

const Chatbot = dynamic(() => import("@/components/features/chatbot/Chatbot"), {
  ssr: false,
  loading: () => null,
});

const CustomCursor = dynamic(() => import("@/components/shared/CustomCursor"), {
  ssr: false,
  loading: () => null,
});

export default function AppOverlays() {
  const [showHeavyOverlays, setShowHeavyOverlays] = useState(false);

  useEffect(() => {
    let idleId: number | null = null;

    const enableHeavyOverlays = () => {
      setShowHeavyOverlays(true);
    };

    const requestIdle =
      window.requestIdleCallback?.bind(window) ??
      ((callback: IdleRequestCallback) => window.setTimeout(callback, 500));

    const cancelIdle =
      window.cancelIdleCallback?.bind(window) ??
      ((handle: number) => window.clearTimeout(handle));

    idleId = requestIdle(enableHeavyOverlays, {
      timeout: 1200,
    });

    return () => {
      if (idleId !== null) {
        cancelIdle(idleId);
      }
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <FloatingThemeToggle />
      <FloatingLanguageToggle />
      <SmoothScroll />
      {showHeavyOverlays ? (
        <>
          <FloatingStats />
          <Chatbot />
        </>
      ) : null}
    </>
  );
}



