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
      className="relative flex min-h-svh items-center overflow-hidden bg-ctp-base pt-20 pb-12 md:min-h-screen md:pt-20 md:pb-12"
    >
      {/* Layered ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 text-ctp-red/15 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[42px_42px] mask-[radial-gradient(circle_at_center,black_30%,transparent_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.14),transparent_34%),radial-gradient(circle_at_85%_78%,rgba(153,27,27,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-ctp-base/20 to-ctp-base/85" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex w-full flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content */}
          <div className="flex flex-col items-center text-center">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-ctp-red/10 px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-[0.2em] text-ctp-red uppercase border border-ctp-red/20 shadow-[0_0_20px_-5px_rgba(220,38,38,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ctp-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ctp-red"></span>
                </span>
                {copy.hero.hello || "HELLO WORLD"}
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-5xl font-black tracking-tighter text-ctp-text sm:text-6xl md:text-7xl lg:text-8xl !leading-[0.9] text-center"
              variants={itemVariants}
            >
              <span className="block">{heroName.first}</span>
              <span className="text-gradient-red block">{heroName.second}</span>
            </motion.h1>

            <motion.p
              className="mb-10 max-w-xl text-base font-medium leading-relaxed text-ctp-subtext0 md:text-lg lg:text-xl opacity-90 text-center"
              variants={itemVariants}
            >
              {copy.hero.roleLine}
            </motion.p>

            <motion.div
              variants={ctaVariants}
              className="flex flex-wrap items-center justify-center gap-4"
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
                        y: -3,
                        scale: 1.02,
                        boxShadow: "0 20px 40px -15px rgba(220,38,38,0.5)",
                      }),
                }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="group relative overflow-hidden rounded-2xl bg-ctp-red px-8 py-4 font-bold text-ctp-crust transition-all duration-300 text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {copy.hero.viewWork}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  ...(reduceVisualEffects ? {} : { y: -3, scale: 1.02 }),
                }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="group relative overflow-hidden rounded-2xl border border-ctp-surface2/50 bg-ctp-surface0/20 px-8 py-4 font-bold text-ctp-text transition-all duration-300 hover:border-ctp-red/50 hover:bg-ctp-red/5 text-lg backdrop-blur-md"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-ctp-red" />
                  {copy.hero.resume}
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center justify-center gap-6"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "var(--color-ctp-red)" }}
                  className="text-ctp-overlay0 transition-all duration-300"
                >
                  <social.icon className="h-7 w-7" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-12 w-[2px] bg-linear-to-b from-ctp-red to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}
