"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Code2, Globe, Wrench, BookOpen } from "lucide-react";
import { SKILLS, SKILL_LOGOS, type SkillLogo } from "@/lib/constants";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy, type Locale } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;
const MARQUEE_SPEED_PX_PER_SECOND = 56;
const TOUCH_TOOLTIP_DURATION_MS = 1200;

const getCategories = (locale: Locale) => {
  const copy = getCopy(locale);

  return [
    {
      key: "languages" as const,
      label: copy.skills.languages,
      icon: Code2,
      color: "text-ctp-red",
      bg: "bg-ctp-red/10",
    },
    {
      key: "frameworks" as const,
      label: copy.skills.frameworks,
      icon: Globe,
      color: "text-ctp-maroon",
      bg: "bg-ctp-maroon/10",
    },
    {
      key: "tools" as const,
      label: copy.skills.tools,
      icon: Wrench,
      color: "text-ctp-maroon",
      bg: "bg-ctp-maroon/10",
    },
    {
      key: "fundamentals" as const,
      label: copy.skills.fundamentals,
      icon: BookOpen,
      color: "text-ctp-red",
      bg: "bg-ctp-red/10",
    },
  ];
};

const getLogoKey = (logo: SkillLogo) =>
  `${logo.name}-${logo.path ?? logo.darkPath ?? logo.lightPath ?? "fallback"}`;

function InfiniteScrollingLogos() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [activeLogoKey, setActiveLogoKey] = useState<string | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const segmentRef = useRef<HTMLDivElement | null>(null);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const marqueeX = useMotionValue(0);

  const shouldLoop = !reducedMotion && !isMobile;

  const marqueePaused =
    !shouldLoop || segmentWidth === 0 || hoverPaused || touchPaused;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  useAnimationFrame((_time, delta) => {
    if (marqueePaused) {
      return;
    }

    const distance = (MARQUEE_SPEED_PX_PER_SECOND * delta) / 1000;
    const nextX = marqueeX.get() - distance;

    marqueeX.set(nextX <= -segmentWidth ? nextX + segmentWidth : nextX);
  });

  useEffect(() => {
    if (!shouldLoop) {
      return;
    }

    const segmentElement = segmentRef.current;
    if (!segmentElement) {
      return;
    }

    const measure = () => {
      setSegmentWidth(segmentElement.scrollWidth);
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(segmentElement);

    return () => resizeObserver.disconnect();
  }, [failedImages.size, isDark, shouldLoop]);

  useEffect(() => {
    marqueeX.set(0);
  }, [marqueeX, segmentWidth]);

  useEffect(() => {
    if (!shouldLoop) {
      marqueeX.set(0);
    }
  }, [marqueeX, shouldLoop]);

  useEffect(
    () => () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    },
    [],
  );

  const getLogoPath = (logo: SkillLogo) => {
    if (logo.darkPath && logo.lightPath) {
      return isDark ? logo.darkPath : logo.lightPath;
    }
    return logo.path ?? logo.darkPath ?? logo.lightPath ?? "";
  };

  const handleLogoActivate = (logoKey: string) => {
    setActiveLogoKey(logoKey);
    setHoverPaused(true);
  };

  const handleLogoDeactivate = () => {
    setHoverPaused(false);

    if (!touchPaused) {
      setActiveLogoKey(null);
    }
  };

  const handleLogoTouchPause = (logoKey: string) => {
    setActiveLogoKey(logoKey);
    setTouchPaused(true);

    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }

    touchTimerRef.current = setTimeout(() => {
      setTouchPaused(false);
      setActiveLogoKey(null);
      touchTimerRef.current = null;
    }, TOUCH_TOOLTIP_DURATION_MS);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reducedMotion ? 0.25 : 0.45, ease }}
      className="mb-10"
    >
      <div
        className={`relative py-7 sm:py-8 ${
          shouldLoop
            ? "overflow-hidden"
            : "overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        }`}
        role="region"
        aria-label="Featured technologies"
      >
        <div
          className="absolute bottom-0 left-0 top-0 z-10 w-24 bg-linear-to-r from-ctp-base to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 top-0 z-10 w-24 bg-linear-to-l from-ctp-base to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          className={`flex ${
            shouldLoop ? "w-max" : "min-w-max snap-x snap-mandatory px-2"
          }`}
          style={shouldLoop ? { x: marqueeX, willChange: "transform" } : {}}
          aria-live="off"
        >
          {(shouldLoop ? [0, 1] : [0]).map((segmentIndex) => (
            <div
              key={`segment-${segmentIndex}`}
              ref={segmentIndex === 0 ? segmentRef : undefined}
              className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
            >
              {SKILL_LOGOS.map((logo, logoIndex) => {
                const logoKey = getLogoKey(logo);
                const isActive = activeLogoKey === logoKey;
                const tooltipId = `skill-logo-tooltip-${segmentIndex}-${logoIndex}`;

                return (
                  <button
                    key={`${logoKey}-${segmentIndex}`}
                    type="button"
                    className="group relative shrink-0 snap-start rounded-lg cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                    aria-label={`${logo.name} logo`}
                    aria-describedby={tooltipId}
                    onMouseEnter={() => handleLogoActivate(logoKey)}
                    onMouseLeave={handleLogoDeactivate}
                    onFocus={() => handleLogoActivate(logoKey)}
                    onBlur={handleLogoDeactivate}
                    onPointerUp={(event) => {
                      if (event.pointerType === "touch") {
                        handleLogoTouchPause(logoKey);
                      }
                    }}
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center p-2">
                      {failedImages.has(logoKey) ? (
                        <span className="text-xs font-semibold text-ctp-red">
                          {logo.name}
                        </span>
                      ) : (
                        <Image
                          src={getLogoPath(logo)}
                          alt={logo.name}
                          width={64}
                          height={64}
                          loading="lazy"
                          sizes="64px"
                          className={`h-full w-full object-contain transition-opacity duration-200 ${
                            isActive
                              ? "opacity-100"
                              : "opacity-85 group-hover:opacity-100 group-focus-visible:opacity-100"
                          }`}
                          onError={() =>
                            setFailedImages((prev) =>
                              new Set(prev).add(logoKey),
                            )
                          }
                        />
                      )}
                    </div>

                    <motion.div
                      id={tooltipId}
                      role="tooltip"
                      initial={false}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                      }
                      transition={{ duration: 0.16, ease }}
                      className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-ctp-surface0 bg-ctp-crust px-3 py-1 text-xs font-medium text-ctp-text"
                    >
                      {logo.name}
                    </motion.div>
                  </button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

const getCardVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 24,
    filter: reducedMotion ? "none" : "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.3 : 0.5,
      ease,
    },
  },
});

const getContainerTransition = (reducedMotion: boolean) => ({
  delayChildren: reducedMotion ? 0 : 0.06,
  staggerChildren: reducedMotion ? 0.04 : 0.08,
});

export default function CodeSkills() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const categories = getCategories(locale);
  const cardVariants = getCardVariants(reducedMotion);

  return (
    <Section id="skills" className="relative overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-ctp-red/8 blur-3xl" />
        <div className="absolute -right-8 bottom-0 h-60 w-60 rounded-full bg-ctp-maroon/8 blur-3xl" />
      </div>

      <SectionTitle
        badge={copy.skills.badge}
        title={copy.skills.title}
        highlightWord={locale === "bn" ? "টেকনোলজিস" : "Technologies"}
        subtitle={copy.skills.subtitle}
      />

      <div className="mx-auto max-w-5xl">
        <InfiniteScrollingLogos />

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={getContainerTransition(reducedMotion)}
        >
          {categories.map((cat) => {
            const items = SKILLS[cat.key];

            return (
              <motion.article
                key={cat.key}
                variants={cardVariants}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.25, ease }}
                className="group relative overflow-hidden rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 p-6 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/40 hover:shadow-xl hover:shadow-ctp-crust/20"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full ${cat.bg} opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`rounded-lg p-2 transition-transform duration-300 ${cat.bg} ${
                      reducedMotion ? "" : "group-hover:-translate-y-0.5"
                    }`}
                  >
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-ctp-text">
                    {cat.label}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-ctp-overlay0">
                    {items.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-ctp-surface1/40 bg-ctp-surface0/60 px-3 py-1 text-xs font-medium text-ctp-subtext0 transition-colors duration-200 hover:border-ctp-surface1 hover:text-ctp-text"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}



