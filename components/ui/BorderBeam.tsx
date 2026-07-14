"use client";

import { motion } from "framer-motion";

interface BorderBeamProps {
  duration?: number;
  color?: string;
  borderWidth?: number;
}

export default function BorderBeam({
  duration = 5,
  color = "#dc2626",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-20">
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          border: `${borderWidth}px solid transparent`,
          maskImage: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskImage: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: duration,
            ease: "linear",
          }}
          style={{
            background: `conic-gradient(from 0deg, transparent 65%, ${color} 90%, transparent 100%)`,
            top: "50%",
            left: "50%",
            width: "300%",
            height: "300%",
            position: "absolute",
            transformOrigin: "center center",
          }}
          className="-translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
