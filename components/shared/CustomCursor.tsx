"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Near-instant spring for the main cursor (maintains clicking precision)
  const mainX = useSpring(mouseX, { damping: 45, stiffness: 750, mass: 0.15 });
  const mainY = useSpring(mouseY, { damping: 45, stiffness: 750, mass: 0.15 });

  const [hovered, setHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOffScreen, setIsOffScreen] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on devices with mouse/pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      // Set mouse position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === "pointer";

      const isText =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      setHovered(!!isClickable);
      setIsInput(!!isText);
    };

    const handleMouseOut = () => {
      setHovered(false);
      setIsInput(false);
    };

    const handleMouseLeave = () => setIsOffScreen(true);
    const handleMouseEnter = () => setIsOffScreen(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hide default system cursor
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible || isOffScreen) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Main Cursor Element */}
      <motion.div
        style={{
          x: mainX,
          y: mainY,
        }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={
            isInput
              ? {
                  scale: 1,
                  rotate: 0,
                  x: -2, // Center the caret on coordinates
                  y: -16,
                }
              : hovered
                ? {
                    scale: 1.2, // Animate up to 1.2 scale
                    rotate: 0,
                    x: -6.8, // Keep tip aligned at coordinates
                    y: -6.2,
                  }
                : {
                    scale: 1,
                    rotate: 0,
                    x: -6.8, // Align chevron tip to coordinates
                    y: -6.2,
                  }
          }
          transition={{
            scale: hovered
              ? {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.6,
                  ease: "easeInOut",
                }
              : {
                  type: "spring",
                  stiffness: 450,
                  damping: 25,
                },
            default: {
              type: "spring",
              stiffness: 450,
              damping: 25,
            },
          }}
        >
          {isInput ? (
            // Text input caret shape (custom animated bar)
            <div className="h-8 w-1 rounded bg-ctp-red glow-red animate-pulse" />
          ) : (
            // The custom red pointer arrow SVG
            <Image
              src="/cursors/custom-pointer.svg"
              alt="Cursor"
              width={40}
              height={40}
              priority
              className="select-none"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
