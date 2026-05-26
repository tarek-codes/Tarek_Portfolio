"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/constants";
import DiscordIcon from "@/components/ui/DiscordIcon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

const springTransition = {
  type: "spring" as const,
  stiffness: 130,
  damping: 18,
  mass: 0.9,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 125,
      damping: 16,
      mass: 0.9,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, rotate: 2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
      mass: 0.95,
    },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const reduceVisualEffects = Boolean(prefersReducedMotion) || isMobile;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  const heroName =
    locale === "bn"
      ? { first: "তারেক", second: "আলম ভূইয়া" }
      : { first: "Tarek", second: "Alam Bhuiyan" };

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.githubUrl, label: "GitHub" },
    { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: "LinkedIn" },
    { icon: Twitter, href: PERSONAL_INFO.twitterUrl, label: "Twitter" },
    { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: "Facebook" },
    { icon: Instagram, href: PERSONAL_INFO.instagramUrl, label: "Instagram" },
    { icon: DiscordIcon, href: PERSONAL_INFO.discordUrl, label: "Discord" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-ctp-base pt-20 pb-10 md:min-h-screen md:py-0"
    >
      {/* Layered ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 text-ctp-red/15 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[42px_42px] mask-[radial-gradient(circle_at_center,black_30%,transparent_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.14),transparent_34%),radial-gradient(circle_at_85%_78%,rgba(153,27,27,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-ctp-base/20 to-ctp-base/85" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image first on mobile, right side on desktop */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            variants={imageVariants}
            whileHover={
              reduceVisualEffects ? undefined : { y: -4, scale: 1.015 }
            }
            transition={springTransition}
          >
            <div className="relative w-[min(66vw,16rem)] sm:w-80 md:w-96 lg:w-100">
              {reduceVisualEffects ? (
                <div className="absolute -inset-6 rounded-[2.5rem] bg-ctp-red/10 blur-2xl" />
              ) : (
                <motion.div
                  className="absolute -inset-6 rounded-[2.5rem] bg-ctp-red/10 blur-2xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease }}
                />
              )}

              <div className="relative aspect-square overflow-hidden rounded-full border border-ctp-surface1/70 bg-ctp-mantle/70 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-ctp-surface0/80">
                  <Image
                    src={PERSONAL_INFO.profileImageUrl}
                    alt={
                      locale === "bn"
                        ? PERSONAL_INFO.nameBn
                        : PERSONAL_INFO.name
                    }
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
              
              {/* Available for Work Badge (Outside overflow-hidden context) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease }}
                className="absolute bottom-6 right-2 z-50 sm:bottom-8 sm:right-6 lg:bottom-10 lg:right-4"
              >
                <div className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1.5 border border-emerald-400/50 shadow-lg shadow-emerald-500/40 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </span>
                  <span className="text-[11px] font-bold text-white whitespace-nowrap tracking-wider">
                    Available
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-2 space-y-6 text-center lg:order-1 lg:text-left">
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              {/* Education badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-ctp-surface1/60 bg-ctp-surface0/40 px-4 py-2 text-sm font-medium backdrop-blur-md shadow-sm">
                <GraduationCap className="h-4 w-4 text-ctp-red" />
                <span className="text-ctp-subtext1">
                  CSE Graduate · BRACU
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-[5.5rem] leading-[1.15]"
            >
              <span
                className={`inline-block animate-text-gradient ${
                  locale === "bn" ? "translate-y-[0.04em]" : ""
                }`}
              >
                {heroName.first}
              </span>{" "}
              <br />
              <span className="text-ctp-text">{heroName.second}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl font-body text-lg sm:text-xl leading-relaxed text-ctp-subtext1 lg:mx-0"
            >
              {copy.hero.roleLine}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-base text-ctp-subtext0 lg:justify-start"
            >
              <span
                className="inline-block h-3.5 w-5 overflow-hidden rounded-sm"
                role="img"
                aria-label="Flag of Bangladesh"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 800"
                  className="w-full h-full"
                >
                  <rect width="1200" height="800" fill="#006a4e" />
                  <circle cx="460" cy="400" r="200" fill="#f42a41" />
                </svg>
              </span>
              <span>{copy.hero.location}</span>
            </motion.div>

            <motion.div
              variants={ctaVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start"
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{
                  ...(reduceVisualEffects
                    ? {}
                    : {
                        y: -2,
                        scale: 1.02,
                        boxShadow: "0 14px 28px -10px rgba(220,38,38,0.6)",
                      }),
                }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="group relative overflow-hidden rounded-xl bg-ctp-red px-7 py-3.5 font-body font-semibold text-ctp-crust transition-all duration-300 hover:bg-ctp-flamingo text-base shadow-[0_4px_14px_-2px_rgba(220,38,38,0.3)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center gap-2">
                  {copy.hero.viewWork}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  ...(reduceVisualEffects
                    ? {}
                    : {
                        y: -2,
                        scale: 1.02,
                      }),
                }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="group relative overflow-hidden rounded-xl border border-ctp-surface2/50 bg-ctp-surface0/30 px-7 py-3.5 font-body font-semibold text-ctp-text transition-all duration-300 hover:border-ctp-red/50 hover:bg-ctp-red/10 text-base backdrop-blur-md"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-ctp-subtext0 transition-colors group-hover:text-ctp-red" />
                  {copy.hero.resume}
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 pt-2 lg:justify-start"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={
                    reduceVisualEffects ? undefined : { y: -3, scale: 1.08 }
                  }
                  whileTap={{ scale: 0.95 }}
                  transition={springTransition}
                  className="text-ctp-overlay0 transition-colors hover:text-ctp-red"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-l-2 border-ctp-red/30 pl-3 text-center lg:text-left"
            >
              <p className="text-sm italic text-ctp-overlay0">
                &ldquo;Talk is cheap. Show me the code.&rdquo;
              </p>
              <p className="text-xs not-italic text-ctp-overlay0/60">
                &mdash; Linus Torvalds
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="flex h-8 w-5 justify-center rounded-full border border-ctp-surface1 pt-1.5">
          <motion.div
            className="h-1 w-1 rounded-full bg-ctp-red"
            animate={reduceVisualEffects ? { y: 0 } : { y: [0, 10, 0] }}
            transition={
              reduceVisualEffects
                ? { duration: 0.2 }
                : { duration: 1.5, repeat: Infinity, ease }
            }
          />
        </div>
      </motion.div>
    </section>
  );
}
