"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, RefreshCcw } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

type CopyState = "idle" | "copied" | "error";

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timerRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  const languageLabel = (language || "code").toUpperCase();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setCopyState("idle");
    }, 1800);
  };

  const fallbackCopy = (value: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const isCopied = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!isCopied) {
      throw new Error("Fallback copy command failed");
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        fallbackCopy(code);
      }
      setCopyState("copied");
    } catch (error) {
      console.error("Failed to copy code block:", error);
      setCopyState("error");
    } finally {
      scheduleReset();
    }
  };

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-ctp-surface0/60 bg-ctp-crust/45">
      <div className="flex items-center justify-between border-b border-ctp-surface0/55 bg-ctp-mantle/55 px-3 py-1.5">
        <span className="font-mono text-[11px] tracking-wide text-ctp-overlay0">
          {languageLabel}
        </span>

        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={reducedMotion ? undefined : { y: -1, scale: 1.02 }}
          whileTap={reducedMotion ? { scale: 1 } : { scale: 0.95 }}
          className="inline-flex items-center gap-1.5 rounded-md border border-ctp-surface0/60 bg-ctp-surface0/35 px-2 py-1 text-xs text-ctp-subtext0 transition-colors hover:border-ctp-surface1 hover:text-ctp-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-maroon/60"
          aria-label="Copy code block"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copyState === "copied" ? (
              <motion.span
                key="copied"
                className="inline-flex items-center gap-1.5 text-ctp-maroon"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
              >
                <Check className="h-3.5 w-3.5" />
                Copied
              </motion.span>
            ) : copyState === "error" ? (
              <motion.span
                key="error"
                className="inline-flex items-center gap-1.5 text-ctp-red"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Retry
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                className="inline-flex items-center gap-1.5"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <pre className="overflow-x-auto p-3 text-xs leading-relaxed text-ctp-subtext0">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}



