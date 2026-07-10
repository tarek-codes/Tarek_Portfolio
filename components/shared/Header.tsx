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
  { key: "achievements", href: "#achievements", icon: Trophy },
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
        className={`fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 transition-all duration-500 lg:block ${
          isScrolled ? "translate-y-0" : "translate-y-0"
        }`}
        initial={
          reducedMotion ? { opacity: 0 } : { y: -40, opacity: 0, scale: 0.95 }
        }
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...springTransition, delay: 0.2 }}
      >
  <nav className="glass-strong flex items-center gap-1 rounded-[2rem] px-2.5 py-2 border border-ctp-surface1/40 shadow-[0_18px_40px_-30px_rgba(17,17,27,0.85)]">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <motion.a
                key={item.key}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "text-ctp-crust"
                    : "text-ctp-subtext0 hover:text-ctp-red hover:bg-ctp-red/5"
                }`}
                whileHover={hoverMotion}
                whileTap={tapMotion}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 z-0 rounded-full bg-ctp-red shadow-[0_4px_12px_rgba(220,38,38,0.4)]"
                    transition={springTransition}
                  />
                )}
                {item.key === "home" ? (
                  <span className="relative z-10 font-display text-base tracking-[0.2em] uppercase">
                    {getCopy(locale).nav[item.key as keyof typeof copy.nav]}
                  </span>
                ) : (
                  <>
                    <item.icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10">
                      {getCopy(locale).nav[item.key as keyof typeof copy.nav]}
                    </span>
                  </>
                )}
              </motion.a>
            );
          })}

          <div className="mx-2 h-6 w-px bg-ctp-surface1/50" />

          <div className="flex items-center gap-1 px-1">
            <button
              onClick={toggleLocale}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ctp-subtext0 transition-all hover:bg-ctp-red/10 hover:text-ctp-red"
              title={copy.common.toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ctp-subtext0 transition-all hover:bg-ctp-red/10 hover:text-ctp-red"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>
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
