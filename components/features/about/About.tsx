"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Brain,
  BarChart2,
  MessageSquare,
  Globe,
  Code2,
  Activity,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { ABOUT_CARDS, PERSONAL_INFO } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translateDynamicText } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Static data ───────────────────────────────────────────────────────── */

const CORE_INTERESTS: { label: string; icon: LucideIcon }[] = [
  { label: "Data Engineering & Analysis", icon: BarChart2 },
  { label: "Machine Learning & Deep Learning", icon: Brain },
  { label: "Natural Language Processing", icon: MessageSquare },
  { label: "Full-stack Web Development", icon: Globe },
];

const TARGET_ROLES: { label: string; icon: LucideIcon }[] = [
  { label: "ML Engineer", icon: Brain },
  { label: "Software Engineer", icon: Code2 },
  { label: "Data Analyst", icon: LineChart },
  { label: "Data Engineer", icon: Activity },
  { label: "AI/ML Researcher", icon: BarChart2 },
];

/* ─── Animation helpers ─────────────────────────────────────────────────── */

const fadeUp = (delay = 0, reduced = false) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.25 : 0.5, delay, ease },
  },
});

const slideRight = (reduced = false) => ({
  hidden: { opacity: 0, x: reduced ? 0 : -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: reduced ? 0.2 : 0.35, ease },
  },
});

const staggerContainer = (delay = 0, reduced = false) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reduced ? 0.03 : 0.07,
      delayChildren: reduced ? 0 : delay,
    },
  },
});

/* ─── Main component ────────────────────────────────────────────────────── */

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const rm = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const [heatmapError, setHeatmapError] = useState(false);

  const bioCard = ABOUT_CARDS.find((c) => c.id === "bio");
  const currentCard = ABOUT_CARDS.find((c) => c.id === "current");

  const bioText =
    bioCard?.content.kind === "paragraph"
      ? translateDynamicText(locale, bioCard.content.text)
      : "";
  const secondaryText =
    currentCard?.content.kind === "paragraph"
      ? translateDynamicText(locale, currentCard.content.text)
      : "";

  return (
    <Section id="about" className="relative">
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-10 left-0 h-60 w-60 rounded-full bg-ctp-red/10 opacity-12" />
        <div className="absolute -bottom-10 right-0 h-60 w-60 rounded-full bg-ctp-maroon/10 opacity-10" />
      </div>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display select-none text-[7rem] font-black uppercase leading-none text-ctp-red/10 opacity-12 sm:text-[10rem] lg:text-[15rem] xl:text-[18rem] mix-blend-overlay">
          ABOUT
        </span>
      </div>

      {/* ── Section title ────────────────────────────────────────────── */}
      <motion.div
        className="mb-10 sm:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp(0, rm)}
      >
        <h2 className="font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-ctp-text">About </span>
          <span className="text-ctp-red">Me</span>
        </h2>
      </motion.div>

      {/* ── Two-column layout ───────────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
        {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp(0.05, rm)}
        >
          {/* Primary bio — red left border accent */}
          <div className="border-l-[3px] border-ctp-red pl-5">
            <p className="text-base font-bold leading-relaxed text-ctp-text sm:text-lg lg:text-xl">
              {bioText}
            </p>
          </div>

          {/* Secondary paragraph */}
          <p className="text-sm leading-relaxed text-ctp-subtext0 sm:text-[0.95rem]">
            {secondaryText}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-ctp-red" />
            <span className="font-display text-[11px] tracking-[0.18em] uppercase text-ctp-subtext0">
              {PERSONAL_INFO.location}
            </span>
          </div>

          {/* GitHub contribution matrix */}
          <div className="mt-2">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-[10px] tracking-[0.22em] uppercase text-ctp-overlay0">
                GIT CONTRIBUTION MATRIX
              </span>
              <span className="flex items-center gap-1.5 font-display text-[10px] tracking-[0.1em] text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                LIVE_SYNC
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-ctp-surface0/60 bg-ctp-mantle/60 p-4 backdrop-blur-sm">
              {heatmapError ? (
                <div className="flex h-20 items-center justify-center gap-2 text-xs text-ctp-overlay0">
                  <span className="font-display tracking-wider">
                    github.com/2ManyFaces
                  </span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="https://ghchart.rshah.org/2ManyFaces"
                  alt="GitHub contribution graph for 2ManyFaces"
                  className="h-auto w-full rounded-lg opacity-80"
                  onError={() => setHeatmapError(true)}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Core Interests card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0.1, rm)}
            className="overflow-hidden rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/20 p-5 backdrop-blur-sm sm:p-6"
          >
            <h3 className="mb-4 font-display text-[10px] font-semibold tracking-[0.24em] uppercase text-ctp-overlay0">
              CORE INTERESTS
            </h3>

            <motion.div
              variants={staggerContainer(0.18, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-0.5"
            >
              {CORE_INTERESTS.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={slideRight(rm)}
                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-ctp-surface0/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ctp-red/10 transition-colors group-hover:bg-ctp-red/15">
                    <Icon className="h-4 w-4 text-ctp-red" />
                  </div>
                  <span className="text-sm font-semibold text-ctp-text">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Target Roles card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0.18, rm)}
            className="overflow-hidden rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/20 p-5 backdrop-blur-sm sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[10px] font-semibold tracking-[0.24em] uppercase text-ctp-overlay0">
                TARGET ROLES
              </h3>
              <span className="flex items-center gap-1.5 rounded-full border border-ctp-red/25 bg-ctp-red/8 px-2.5 py-0.5 text-[10px] font-medium text-ctp-red/90">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ctp-red opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ctp-red" />
                </span>
                SEEKING
              </span>
            </div>

            <motion.div
              variants={staggerContainer(0.26, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-0.5"
            >
              {TARGET_ROLES.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={slideRight(rm)}
                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-ctp-surface0/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ctp-red/10 transition-colors group-hover:bg-ctp-red/15">
                    <Icon className="h-4 w-4 text-ctp-red" />
                  </div>
                  <span className="text-sm font-semibold text-ctp-red">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
