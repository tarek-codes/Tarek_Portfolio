"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  BarChart2,
  MessageSquare,
  Globe,
  Code2,
  Activity,
  LineChart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { ABOUT_CARDS, PERSONAL_INFO } from "@/lib/constants";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy, translateDynamicText } from "@/lib/i18n/translations";

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
  { label: "SQA Engineer", icon: ShieldCheck },
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

      <SectionTitle
        badge={getCopy(locale).about.badge}
        title={getCopy(locale).about.title}
        highlightWord={locale === "bn" ? "জানুন" : "Know"}
        subtitle={getCopy(locale).about.subtitle}
      />

      {/* Bento Grid Layout */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch max-w-6xl mx-auto">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp(0.05, rm)}
          className="group relative overflow-hidden rounded-3xl border border-ctp-surface0/60 bg-gradient-to-br from-ctp-surface0/20 via-ctp-surface0/10 to-ctp-mantle/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-ctp-red/35 hover:bg-ctp-surface0/15 hover:shadow-[0_20px_50px_-25px_rgba(237,135,150,0.15)] sm:p-6 lg:col-span-2 md:col-span-2 flex flex-col justify-between"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ctp-red/10 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="rounded-full border border-ctp-red/20 bg-ctp-red/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ctp-red">
                {translateDynamicText(locale, "Profile")}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Profile Picture */}
              <div className="relative group shrink-0 mx-auto md:mx-0 md:ml-6 order-1 md:order-2">
                <div className="absolute -inset-2 bg-gradient-to-tr from-ctp-red/20 to-ctp-peach/20 rounded-full blur-lg opacity-40 group-hover:opacity-85 transition-opacity duration-500" />
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-2 border-white/10 overflow-hidden bg-ctp-mantle shadow-lg">
                  <Image
                    src={PERSONAL_INFO.profileImageUrl}
                    alt={PERSONAL_INFO.name}
                    fill
                    className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Bio Text */}
              <div className="flex-1 text-center md:text-left order-2 md:order-1">
                <p className="text-base font-semibold leading-relaxed text-ctp-text sm:text-lg">
                  {bioText}
                </p>
                {secondaryText ? (
                  <p className="mt-3 text-sm leading-relaxed text-ctp-subtext0">
                    {secondaryText}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Core Interests Tablet-like Capsule Wrapper */}
          <div className="mt-8 border-t border-ctp-surface0/50 pt-6">
            <h4 className="text-[10px] font-semibold tracking-[0.24em] uppercase text-ctp-overlay0 mb-4">
              {translateDynamicText(locale, "CORE INTERESTS")}
            </h4>
            <div className="flex flex-wrap gap-3">
              {CORE_INTERESTS.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-full border border-ctp-surface1/60 bg-ctp-base/30 px-4 py-2 transition-all duration-300 hover:border-ctp-red/40 hover:bg-ctp-surface0/20"
                >
                  <Icon className="h-4 w-4 text-ctp-red" />
                  <span className="text-xs font-bold text-ctp-text">
                    {translateDynamicText(locale, label)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Target Roles (Spans 1 col, 2 rows on desktop, 2 cols on tablet) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp(0.22, rm)}
          className="group relative overflow-hidden rounded-3xl border border-ctp-surface0/60 bg-gradient-to-br from-ctp-surface0/20 via-ctp-surface0/10 to-ctp-mantle/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-ctp-red/35 hover:bg-ctp-surface0/15 hover:shadow-[0_20px_50px_-25px_rgba(237,135,150,0.15)] sm:p-6 lg:col-span-1 md:col-span-2 flex flex-col justify-between"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ctp-red/10 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[10px] font-semibold tracking-[0.24em] uppercase text-ctp-overlay0">
                {translateDynamicText(locale, "TARGET ROLES")}
              </h3>
              <span className="flex items-center gap-1.5 rounded-full border border-ctp-red/25 bg-ctp-red/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-ctp-red">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ctp-red opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ctp-red" />
                </span>
                {translateDynamicText(locale, "SEEKING")}
              </span>
            </div>

            <motion.div
              variants={staggerContainer(0.26, rm)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-2"
            >
              {TARGET_ROLES.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={slideRight(rm)}
                  className="flex items-center gap-3 rounded-xl border border-ctp-surface0/50 bg-ctp-base/10 px-3.5 py-2.5 transition-all duration-300 hover:border-ctp-red/30 hover:bg-ctp-surface0/40"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ctp-red/10 transition-colors">
                    <Icon className="h-4 w-4 text-ctp-red" />
                  </div>
                  <span className="text-sm font-semibold text-ctp-text">
                    {translateDynamicText(locale, label)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Card 6: GitHub Contribution Matrix (Spans 3 cols on desktop, 2 on tablet) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp(0.1, rm)}
          className="group relative overflow-hidden rounded-3xl border border-ctp-surface1/60 bg-gradient-to-br from-ctp-surface0/40 via-ctp-mantle/40 to-ctp-crust/60 p-5 shadow-[0_20px_45px_-30px_rgba(17,17,27,0.9)] backdrop-blur-sm transition-all duration-300 hover:border-ctp-red/35 hover:shadow-[0_20px_50px_-25px_rgba(237,135,150,0.15)] sm:p-6 lg:col-span-3 md:col-span-2"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ctp-red/10 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-[10px] tracking-[0.22em] uppercase text-ctp-overlay0">
              {translateDynamicText(locale, "GIT CONTRIBUTION MATRIX")}
            </span>
            <span className="flex items-center gap-1.5 font-display text-[10px] tracking-[0.1em] text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {translateDynamicText(locale, "LIVE_SYNC")}
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-ctp-surface1/60 bg-ctp-crust/70 p-4 shadow-inner shadow-black/30 backdrop-blur-sm">
            {heatmapError ? (
              <div className="flex h-20 items-center justify-center gap-2 text-xs text-ctp-overlay0">
                <span className="font-display tracking-wider">
                  github.com/2ManyFaces
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://ghchart.rshah.org/dc2626/2ManyFaces"
                alt="GitHub contribution graph for 2ManyFaces"
                className="h-auto w-full rounded-lg opacity-80 transition-opacity hover:opacity-100"
                onError={() => setHeatmapError(true)}
              />
            )}
          </div>
        </motion.div>
        
      </div>
    </Section>
  );
}
