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
import { Activity, Code2, Database, Layers } from "lucide-react";
import { SKILLS, SKILL_LOGOS, type SkillLogo } from "@/lib/constants";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy, type Locale } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;
const MARQUEE_SPEED_PX_PER_SECOND = 56;
const TOUCH_TOOLTIP_DURATION_MS = 1200;

/* ─── Skill sub-descriptions ───────────────────────────────────────────── */
const SKILL_DESCRIPTIONS: Record<string, string> = {
  Python: "Backend & Data Analysis",
  HTML: "Web Structure",
  CSS: "Styling & Layout",
  JavaScript: "Interactive Frontend",
  TypeScript: "Type-safe Dev",
  PHP: "Server-side Scripting",
  C: "Systems Programming",
  "C++": "Performance Computing",
  SQL: "Relational Querying",
  "Next.js": "SSR React Framework",
  Laravel: "PHP Web Framework",
  Django: "Python Web Framework",
  Tensorflow: "Machine Learning",
  Pytorch: "Deep Learning & AI",
  PostgreSQL: "Relational DB Engine",
  MySQL: "Relational DB",
  MongoDB: "NoSQL Document DB",
  Docker: "Containerized Workloads",
  Git: "Version Control",
  GitHub: "Code Collaboration",
  Excel: "Advanced Data Modeling",
  Figma: "UI/UX Design",
  OOP: "Object-Oriented Design",
  DSA: "Data Structures & Algos",
  DBMS: "Database Management",
  "System Design": "Scalable Architecture",
  OS: "Operating Systems",
  Networking: "Computer Networks",
};

/* ─── Static logo paths per skill ──────────────────────────────────────── */
const SKILL_LOGO_PATHS: Record<
  string,
  string | { dark: string; light: string }
> = {
  Python: "/tech-logos/python.svg",
  HTML: "/tech-logos/html.svg",
  CSS: "/tech-logos/css.svg",
  JavaScript: "/tech-logos/javascript.svg",
  TypeScript: "/tech-logos/typescript.svg",
  PHP: "/tech-logos/php.svg",
  C: "/tech-logos/c.svg",
  "C++": "/tech-logos/cpp.svg",
  "Next.js": "/tech-logos/nextjs.svg",
  Laravel: "/tech-logos/laravel.svg",
  Django: "/tech-logos/django.svg",
  Tensorflow: "/tech-logos/tensorflow.svg",
  Pytorch: "/tech-logos/pytorch.svg",
  PostgreSQL: "/tech-logos/postgresql.svg",
  MySQL: { dark: "/tech-logos/mysql-d.svg", light: "/tech-logos/mysql-l.svg" },
  MongoDB: "/tech-logos/mongodb.svg",
  Docker: "/tech-logos/docker.svg",
  Git: "/tech-logos/git.svg",
  GitHub: "/tech-logos/github.svg",
  Excel: "/tech-logos/excel.svg",
  Figma: "/tech-logos/figma.svg",
};

/* ─── Sector definitions ────────────────────────────────────────────────── */
const getSectors = (locale: Locale) => {
  const copy = getCopy(locale);
  return [
    {
      key: "languages" as const,
      sectorNum: "01",
      label: copy.skills.languages,
      icon: Code2,
      color: "text-ctp-red",
      iconBg: "bg-ctp-red/15",
      glow: "bg-ctp-red/10",
    },
    {
      key: "frameworks" as const,
      sectorNum: "02",
      label: copy.skills.frameworks,
      icon: Layers,
      color: "text-ctp-red",
      iconBg: "bg-ctp-red/15",
      glow: "bg-ctp-red/8",
    },
    {
      key: "tools" as const,
      sectorNum: "03",
      label: locale === "bn" ? copy.skills.tools : "TOOLS & DATABASES",
      icon: Database,
      color: "text-ctp-maroon",
      iconBg: "bg-ctp-maroon/15",
      glow: "bg-ctp-maroon/10",
    },
    {
      key: "fundamentals" as const,
      sectorNum: "04",
      label: copy.skills.fundamentals,
      icon: Activity,
      color: "text-ctp-maroon",
      iconBg: "bg-ctp-maroon/15",
      glow: "bg-ctp-maroon/8",
    },
  ];
};

/* ─── Skill logo component ──────────────────────────────────────────────── */
function SkillLogoIcon({ name, isDark }: { name: string; isDark: boolean }) {
  const [failed, setFailed] = useState(false);
  const entry = SKILL_LOGO_PATHS[name];

  if (!entry || failed) {
    return (
      <span className="text-[9px] font-bold text-ctp-overlay0 leading-none select-none">
        {name.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  const src =
    typeof entry === "string" ? entry : isDark ? entry.dark : entry.light;

  return (
    <Image
      src={src}
      alt={name}
      width={20}
      height={20}
      className="object-contain w-5 h-5"
      onError={() => setFailed(true)}
    />
  );
}

/* ─── Infinite scrolling logo marquee ──────────────────────────────────── */
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
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useAnimationFrame((_t, delta) => {
    if (marqueePaused) return;
    const dist = (MARQUEE_SPEED_PX_PER_SECOND * delta) / 1000;
    const next = marqueeX.get() - dist;
    marqueeX.set(next <= -segmentWidth ? next + segmentWidth : next);
  });

  useEffect(() => {
    if (!shouldLoop) return;
    const el = segmentRef.current;
    if (!el) return;
    const measure = () => setSegmentWidth(el.scrollWidth);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [failedImages.size, isDark, shouldLoop]);

  useEffect(() => {
    marqueeX.set(0);
  }, [marqueeX, segmentWidth]);

  useEffect(() => {
    if (!shouldLoop) marqueeX.set(0);
  }, [marqueeX, shouldLoop]);

  useEffect(
    () => () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    },
    [],
  );

  const getLogoPath = (logo: SkillLogo) => {
    if (logo.darkPath && logo.lightPath)
      return isDark ? logo.darkPath : logo.lightPath;
    return logo.path ?? logo.darkPath ?? logo.lightPath ?? "";
  };

  const handleActivate = (key: string) => {
    setActiveLogoKey(key);
    setHoverPaused(true);
  };
  const handleDeactivate = () => {
    setHoverPaused(false);
    if (!touchPaused) setActiveLogoKey(null);
  };
  const handleTouch = (key: string) => {
    setActiveLogoKey(key);
    setTouchPaused(true);
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
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
      className="mb-12"
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
          className={`flex ${shouldLoop ? "w-max" : "min-w-max snap-x snap-mandatory px-2"}`}
          style={shouldLoop ? { x: marqueeX, willChange: "transform" } : {}}
          aria-live="off"
        >
          {(shouldLoop ? [0, 1] : [0]).map((si) => (
            <div
              key={`segment-${si}`}
              ref={si === 0 ? segmentRef : undefined}
              className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
            >
              {SKILL_LOGOS.map((logo, li) => {
                const logoKey = getLogoKey(logo);
                const isActive = activeLogoKey === logoKey;
                const tooltipId = `skill-logo-tooltip-${si}-${li}`;
                return (
                  <button
                    key={`${logoKey}-${si}`}
                    type="button"
                    className="group relative shrink-0 snap-start rounded-lg cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                    aria-label={`${logo.name} logo`}
                    aria-describedby={tooltipId}
                    onMouseEnter={() => handleActivate(logoKey)}
                    onMouseLeave={handleDeactivate}
                    onFocus={() => handleActivate(logoKey)}
                    onBlur={handleDeactivate}
                    onPointerUp={(e) => {
                      if (e.pointerType === "touch") handleTouch(logoKey);
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
                          className={`h-full w-full object-contain transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-85 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
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

/* ─── Main component ────────────────────────────────────────────────────── */
export default function CodeSkills() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const { theme } = useTheme();
  const copy = getCopy(locale);
  const sectors = getSectors(locale);
  const isDark = theme === "dark";

  return (
    <Section id="skills" className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-ctp-red/8 opacity-12" />
        <div className="absolute -right-8 bottom-0 h-60 w-60 rounded-full bg-ctp-maroon/8 opacity-10" />
      </div>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pb-0"
        aria-hidden="true"
      >
        <span className="font-display select-none text-[5rem] font-black uppercase leading-none text-ctp-red/8 opacity-12 sm:text-[8rem] lg:text-[11rem] xl:text-[15rem] mix-blend-overlay">
          SKILLS
        </span>
      </div>

      <SectionTitle
        badge={copy.skills.badge}
        title={copy.skills.title}
        highlightWord={locale === "bn" ? "টেকনোলজিস" : "Technologies"}
        subtitle={copy.skills.subtitle}
      />

      <div className="mx-auto max-w-7xl">
        <InfiniteScrollingLogos />

        {/* ── Sector columns ─────────────────────────────────────────── */}
        <div className="overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-ctp-surface0/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-ctp-surface1/60">
          <motion.div
            className="flex gap-4 min-w-max xl:min-w-0 xl:grid xl:grid-cols-4 xl:gap-5"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reducedMotion ? 0.02 : 0.1,
                  delayChildren: reducedMotion ? 0 : 0.05,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {sectors.map((sector, sectorIndex) => {
              const SectorIcon = sector.icon;
              const skills = SKILLS[sector.key];

              return (
                <motion.div
                  key={sector.key}
                  variants={{
                    hidden: { opacity: 0, y: reducedMotion ? 0 : 32 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: reducedMotion ? 0.3 : 0.55,
                        ease,
                      },
                    },
                  }}
                  className="w-64 shrink-0 xl:w-auto rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/20 backdrop-blur-sm overflow-hidden"
                >
                  {/* Column header */}
                  <div className="relative overflow-hidden p-5 border-b border-ctp-surface0/60">
                    <div
                      className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${sector.glow} opacity-30`}
                    />
                    <p className="font-display text-[10px] tracking-[0.25em] uppercase text-ctp-overlay0 mb-3">
                      SECTOR {sector.sectorNum}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${sector.iconBg}`}
                      >
                        <SectorIcon className={`h-5 w-5 ${sector.color}`} />
                      </div>
                      <h3 className="font-display text-sm font-bold uppercase tracking-widest text-ctp-text leading-tight">
                        {sector.label}
                      </h3>
                    </div>
                  </div>

                  {/* Skills list */}
                  <motion.div
                    className="p-3 space-y-0.5"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: reducedMotion ? 0.01 : 0.05,
                          delayChildren: reducedMotion
                            ? 0
                            : sectorIndex * 0.06 + 0.15,
                        },
                      },
                    }}
                  >
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={{
                          hidden: { opacity: 0, x: reducedMotion ? 0 : -10 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: reducedMotion ? 0.2 : 0.3,
                              ease,
                            },
                          },
                        }}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-ctp-surface0/50 cursor-default"
                      >
                        {/* Logo icon */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ctp-surface1/30 group-hover:bg-ctp-surface1/50 transition-colors duration-200">
                          <SkillLogoIcon name={skill.name} isDark={isDark} />
                        </div>

                        {/* Name + description */}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-ctp-text leading-tight truncate">
                            {skill.name}
                          </p>
                          <p className="text-[10px] font-display uppercase tracking-wider text-ctp-overlay0 truncate mt-0.5">
                            {SKILL_DESCRIPTIONS[skill.name] ?? skill.category}
                          </p>
                        </div>

                        {/* Level dot */}
                        <span
                          className={`shrink-0 h-1.5 w-1.5 rounded-full ${
                            skill.level === "Advanced"
                              ? "bg-ctp-red"
                              : skill.level === "Intermediate"
                                ? "bg-ctp-maroon/60"
                                : "bg-ctp-overlay0/40"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Proficiency legend ─────────────────────────────────────── */}
        <motion.div
          className="mt-5 flex items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
        >
          <span className="text-[11px] text-ctp-overlay0 font-display">
            Proficiency:
          </span>
          {[
            { label: "Advanced", color: "bg-ctp-red" },
            { label: "Intermediate", color: "bg-ctp-maroon/60" },
            { label: "Beginner", color: "bg-ctp-overlay0/40" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[11px] text-ctp-overlay0"
            >
              <span className={`h-2 w-2 rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
