"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Globe,
  Home,
  User,
  Briefcase,
  Code2,
  FolderKanban,
  Trophy,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getCopy } from "@/lib/i18n/translations";

export const navigation = [
  { key: "home", href: "#hero", icon: Home },
  { key: "about", href: "#about", icon: User },
  { key: "experience", href: "#experience", icon: Briefcase },
  { key: "skills", href: "#skills", icon: Code2 },
  { key: "projects", href: "#projects", icon: FolderKanban },
  { key: "certifications", href: "#certifications", icon: BadgeCheck },
  { key: "contact", href: "#contact", icon: Mail },
] as const;

export type NavigationItem = (typeof navigation)[number];

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLanguage();
  const copy = getCopy(locale);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  const ease = [0.22, 1, 0.36, 1] as const;

  const springTransition = {
    type: "spring" as const,
    stiffness: 320,
    damping: 26,
  };

  const hoverMotion = reducedMotion ? undefined : { y: -2, scale: 1.02 };
  const tapMotion = reducedMotion ? { scale: 1 } : { scale: 0.96 };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navigation.forEach((item) => {
      const sectionId = item.href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Navbar — Floating centered pill */}
      <motion.header
        className={`fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 transition-shadow duration-300 lg:block ${
          isScrolled ? "shadow-[0_20px_46px_-28px_rgba(17,17,27,0.9)]" : ""
        }`}
        initial={
          reducedMotion ? { opacity: 0 } : { y: -20, opacity: 0, scale: 0.97 }
        }
        animate={
          reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }
        }
        transition={
          reducedMotion
            ? { duration: 0.2, ease }
            : { type: "spring", stiffness: 220, damping: 22, delay: 0.1 }
        }
      >
        <div className="rounded-[999px] bg-linear-to-r from-ctp-surface1/30 via-ctp-surface0/10 to-ctp-surface1/30 p-[1px] shadow-sm">
          <nav className="isolate flex items-center gap-1.5 rounded-[999px] bg-ctp-base/70 px-3 py-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl">
            <motion.a
              href="#hero"
              whileHover={hoverMotion}
              whileTap={tapMotion}
              transition={springTransition}
              className={`relative rounded-full px-3 py-2 text-base font-medium transition-colors text-ctp-subtext0 hover:text-ctp-text`}
              aria-label={copy.nav.home}
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <span className="nav-logo-mark">T.</span>
                <span className="sr-only">{copy.nav.home}</span>
              </span>
            </motion.a>

            <div className="mx-1 h-6 w-px bg-ctp-surface0/40" />

            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              const label = copy.nav[item.key];
              return (
                <motion.a
                  key={item.key}
                  href={item.href}
                  aria-label={label}
                  whileHover={hoverMotion}
                  whileTap={tapMotion}
                  transition={springTransition}
                  className={`relative rounded-full px-4 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "text-ctp-red"
                      : "text-ctp-subtext0 hover:text-ctp-text"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDesktop"
                      className="absolute inset-0.5 rounded-full border border-ctp-red/25 bg-ctp-red/12"
                      transition={springTransition}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </motion.a>
              );
            })}

            <div className="mx-1 h-6 w-px bg-ctp-surface0/40" />

            <motion.button
              type="button"
              onClick={toggleLocale}
              whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={tapMotion}
              transition={springTransition}
              className="rounded-full p-2.5 text-ctp-subtext0 transition-colors hover:bg-ctp-surface0/55 hover:text-ctp-text"
              aria-label={copy.common.toggleLanguage}
            >
              <Globe
                className={`h-5 w-5 ${locale === "bn" ? "text-ctp-maroon" : ""}`}
              />
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={reducedMotion ? undefined : { y: -2, scale: 1.04 }}
              whileTap={tapMotion}
              transition={springTransition}
              className="rounded-full p-2.5 text-ctp-subtext0 transition-colors hover:bg-ctp-surface0/55 hover:text-ctp-text"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Navbar — Bottom-docked icon-only pill */}
      <motion.nav
        className="fixed bottom-3 left-1/2 z-50 w-[calc(100vw-1rem)] max-w-sm -translate-x-1/2 px-1 md:max-w-md lg:hidden"
        initial={
          reducedMotion ? { opacity: 0 } : { y: 30, opacity: 0, scale: 0.98 }
        }
        animate={
          reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }
        }
        transition={
          reducedMotion
            ? { duration: 0.2, ease }
            : { type: "spring", stiffness: 220, damping: 24, delay: 0.2 }
        }
      >
        <div className="rounded-[999px] bg-linear-to-r from-ctp-surface1/55 via-ctp-surface0/15 to-ctp-surface1/55 p-px">
          <div className="flex items-center justify-between rounded-[999px] bg-ctp-base/70 px-3 py-2.5 shadow-[0_14px_30px_-22px_rgba(17,17,27,0.95)] backdrop-blur-2xl">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              const label = copy.nav[item.key];
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.key}
                  href={item.href}
                  whileHover={
                    reducedMotion ? undefined : { y: -2, scale: 1.04 }
                  }
                  whileTap={tapMotion}
                  transition={springTransition}
                  className={`relative rounded-full p-2.5 transition-colors ${
                    isActive
                      ? "text-ctp-red"
                      : "text-ctp-subtext0 hover:text-ctp-text"
                  }`}
                  aria-label={label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavMobile"
                      className="absolute inset-0.5 rounded-full border border-ctp-red/25 bg-ctp-red/12"
                      transition={springTransition}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
