"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  X,
  Trophy,
  Medal,
  GraduationCap,
  Star,
  BookOpen,
  Heart,
  Calendar,
  FileImage,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  ACHIEVEMENTS,
  type Achievement,
  type AchievementType,
} from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getCopy,
  translateDynamicText,
  type Locale,
} from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

const getTypeStyles = (
  locale: Locale,
): Record<
  AchievementType,
  {
    icon: LucideIcon;
    color: string;
    bg: string;
    accent: string;
    glow: string;
    label: string;
  }
> => {
  const copy = getCopy(locale);

  return {
    competition: {
      icon: Trophy,
      color: "text-ctp-red",
      bg: "bg-ctp-red/10",
      accent: "bg-ctp-red/70",
      glow: "bg-ctp-red/15",
      label: copy.achievements.competition,
    },
    scholarship: {
      icon: Medal,
      color: "text-ctp-red",
      bg: "bg-ctp-red/10",
      accent: "bg-ctp-red/70",
      glow: "bg-ctp-red/15",
      label: copy.achievements.scholarship,
    },
    academic: {
      icon: GraduationCap,
      color: "text-ctp-maroon",
      bg: "bg-ctp-maroon/10",
      accent: "bg-ctp-maroon/70",
      glow: "bg-ctp-maroon/15",
      label: copy.achievements.academic,
    },
    rating: {
      icon: Star,
      color: "text-ctp-maroon",
      bg: "bg-ctp-maroon/10",
      accent: "bg-ctp-maroon/70",
      glow: "bg-ctp-maroon/15",
      label: copy.achievements.rating,
    },
    certification: {
      icon: BadgeCheck,
      color: "text-ctp-flamingo",
      bg: "bg-ctp-flamingo/10",
      accent: "bg-ctp-flamingo/70",
      glow: "bg-ctp-flamingo/15",
      label: copy.achievements.certification,
    },
    training: {
      icon: BookOpen,
      color: "text-ctp-flamingo",
      bg: "bg-ctp-flamingo/10",
      accent: "bg-ctp-flamingo/70",
      glow: "bg-ctp-flamingo/15",
      label: copy.achievements.training,
    },
    volunteer: {
      icon: Heart,
      color: "text-ctp-pink",
      bg: "bg-ctp-pink/10",
      accent: "bg-ctp-pink/70",
      glow: "bg-ctp-pink/15",
      label: copy.achievements.volunteer,
    },
  };
};

const INITIAL_VISIBLE_ACHIEVEMENTS = 9;

const getContainerVariants = (reducedMotion: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: reducedMotion ? 0 : 0.04,
      staggerChildren: reducedMotion ? 0.03 : 0.06,
    },
  },
});

const getCardVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 22,
    filter: reducedMotion ? "none" : "blur(6px)",
  },
  visible: (custom: { featured: boolean; index: number }) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.28 : custom.featured ? 0.48 : 0.4,
      ease,
      delay: reducedMotion
        ? 0
        : custom.featured
          ? custom.index * 0.015
          : custom.index * 0.008,
    },
  }),
});

interface AchievementCardProps {
  achievement: Achievement;
  reducedMotion: boolean;
  index: number;
  locale: Locale;
  onOpenCertificate: (achievement: Achievement) => void;
}

function AchievementCard({
  achievement,
  reducedMotion,
  index,
  locale,
  onOpenCertificate,
}: AchievementCardProps) {
  const copy = getCopy(locale);
  const style = getTypeStyles(locale)[achievement.type];
  const Icon = style.icon;
  const isFeatured = Boolean(achievement.featured);

  const iconHoverClasses = reducedMotion
    ? ""
    : "group-hover:-translate-y-0.5 group-hover:scale-105";
  const iconRotateClasses =
    reducedMotion ||
    achievement.type === "volunteer" ||
    achievement.type === "training"
      ? ""
      : "group-hover:rotate-6";

  return (
    <motion.article
      custom={{ featured: isFeatured, index }}
      variants={getCardVariants(reducedMotion)}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      transition={{ duration: 0.25, ease }}
      className={`group relative h-full overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 ${
        isFeatured
          ? "min-h-57 border-ctp-surface1/70 bg-ctp-surface0/45"
          : "min-h-51 border-ctp-surface0/60 bg-ctp-surface0/30 hover:border-ctp-surface1 hover:bg-ctp-surface0/45"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${style.glow} transition-opacity duration-300 ${
          reducedMotion
            ? isFeatured
              ? "opacity-45"
              : "opacity-0"
            : isFeatured
            ? "opacity-55 group-hover:opacity-70"
            : "opacity-0 group-hover:opacity-85"
        }`}
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${style.bg} ${style.color}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.accent}`} />
          {style.label}
        </span>

        {isFeatured && (
          <span className="inline-flex items-center rounded-full border border-ctp-surface1/60 bg-ctp-surface0/50 px-2.5 py-1 text-[11px] font-medium text-ctp-subtext0">
            {copy.achievements.featured}
          </span>
        )}
      </div>

      <div className="flex h-full items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${style.bg} ${iconHoverClasses}`}
        >
          <Icon
            className={`h-4 w-4 transition-transform duration-300 ${style.color} ${iconRotateClasses}`}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-sm font-semibold leading-snug text-ctp-text line-clamp-2">
            {achievement.title}
          </h3>
          <p className="mt-1 text-xs text-ctp-subtext0">
            {translateDynamicText(locale, achievement.organization)}
          </p>
          <span className="mt-1 flex items-center gap-1 text-xs text-ctp-overlay0">
            <Calendar className="h-3 w-3" />
            {translateDynamicText(locale, achievement.date)}
          </span>

          {isFeatured && (
            <p className="mt-2 text-xs leading-relaxed text-ctp-subtext1 line-clamp-2">
              {translateDynamicText(locale, achievement.description)}
            </p>
          )}

          <div className="mt-auto pt-3">
            {achievement.viewType === "link" && achievement.link && (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-ctp-red transition-colors hover:text-ctp-flamingo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base rounded"
              >
                {copy.achievements.view}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {achievement.viewType === "image" &&
              achievement.certificateImage && (
                <button
                  type="button"
                  onClick={() => onOpenCertificate(achievement)}
                  className="inline-flex items-center gap-1 text-xs text-ctp-red transition-colors hover:text-ctp-flamingo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base rounded"
                  aria-label={`${copy.achievements.viewCertificateFor} ${achievement.title}`}
                >
                  {copy.achievements.certificate}
                  <FileImage className="h-3 w-3" />
                </button>
              )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Achievements() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);

  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [showMoreAchievements, setShowMoreAchievements] = useState(false);
  const [certificationViewMode, setCertificationViewMode] = useState<"slideshow" | "grid">("slideshow");
  const [certificationSlideIndex, setCertificationSlideIndex] = useState(0);

  const orderedAchievements = useMemo(
    () =>
      [...ACHIEVEMENTS].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      ),
    [],
  );

  const primaryAchievements = orderedAchievements.slice(
    0,
    INITIAL_VISIBLE_ACHIEVEMENTS,
  );
  const additionalAchievements = orderedAchievements.slice(
    INITIAL_VISIBLE_ACHIEVEMENTS,
  );

  // Certifications logic
  const certifications = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.type === "certification"),
    []
  );

  const sortedCertifications = useMemo(
    () => [
      ...certifications.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      ),
    ],
    [certifications]
  );

  const featuredCertifications = sortedCertifications.filter(
    (c) => c.featured
  );
  const displayCertifications =
    featuredCertifications.length > 0
      ? featuredCertifications
      : sortedCertifications.slice(0, 1);

  const nextCertSlide = () => {
    setCertificationSlideIndex(
      (prev) => (prev + 1) % displayCertifications.length
    );
  };

  const prevCertSlide = () => {
    setCertificationSlideIndex(
      (prev) =>
        (prev - 1 + displayCertifications.length) %
        displayCertifications.length
    );
  };

  useEffect(() => {
    if (!selectedAchievement) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAchievement(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAchievement]);

  return (
    <Section id="certifications" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 left-0 h-60 w-60 rounded-full bg-ctp-flamingo/10 opacity-12" />
        <div className="absolute -bottom-10 right-0 h-60 w-60 rounded-full bg-ctp-flamingo/8 opacity-10" />
      </div>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display select-none text-[7rem] font-black uppercase leading-none text-ctp-flamingo/10 opacity-12 sm:text-[10rem] lg:text-[15rem] xl:text-[18rem] mix-blend-overlay">
          CERTS
        </span>
      </div>

      <SectionTitle
        badge="Certifications"
        title="Professional Certifications"
        highlightWord="Certifications"
        subtitle="Industry-recognized certifications and credentials"
      />

      {/* View Toggle */}
      <div className="mb-8 flex justify-center gap-2">
        <motion.button
          onClick={() => setCertificationViewMode("slideshow")}
          whileHover={reducedMotion ? undefined : { y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium text-sm transition-all duration-200 ${
            certificationViewMode === "slideshow"
              ? "bg-ctp-flamingo text-white shadow-lg shadow-ctp-flamingo/30"
              : "border border-ctp-surface1 bg-ctp-surface0/40 text-ctp-subtext0 hover:bg-ctp-surface0/60 hover:text-ctp-text"
          }`}
        >
          ▶ Slideshow
        </motion.button>

        <motion.button
          onClick={() => setCertificationViewMode("grid")}
          whileHover={reducedMotion ? undefined : { y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium text-sm transition-all duration-200 ${
            certificationViewMode === "grid"
              ? "bg-ctp-flamingo text-white shadow-lg shadow-ctp-flamingo/30"
              : "border border-ctp-surface1 bg-ctp-surface0/40 text-ctp-subtext0 hover:bg-ctp-surface0/60 hover:text-ctp-text"
          }`}
        >
          <Grid3x3 className="h-4 w-4" />
          Grid View
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {/* Slideshow View */}
        {certificationViewMode === "slideshow" && displayCertifications.length > 0 && (
          <motion.div
            key="slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="mx-auto max-w-4xl"
          >
            <div className="group relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={certificationSlideIndex}
                  initial={{
                    opacity: 0,
                    x: reducedMotion ? 0 : 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: reducedMotion ? 0 : -40,
                  }}
                  transition={{
                    duration: reducedMotion ? 0.2 : 0.4,
                    ease,
                  }}
                  className="overflow-hidden rounded-2xl border border-ctp-surface1/60 bg-ctp-surface0/30 backdrop-blur-sm"
                >
                  <div className="space-y-6 p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-ctp-flamingo/15">
                        <BadgeCheck className="h-8 w-8 text-ctp-flamingo" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ctp-text">
                          {displayCertifications[certificationSlideIndex]?.title}
                        </h3>
                        <p className="mt-1 text-sm text-ctp-subtext0">
                          {translateDynamicText(
                            locale,
                            displayCertifications[certificationSlideIndex]?.organization || ""
                          )}
                        </p>
                        <p className="mt-2 leading-relaxed text-ctp-subtext1">
                          {translateDynamicText(
                            locale,
                            displayCertifications[certificationSlideIndex]?.description || ""
                          )}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <span className="inline-block rounded-full bg-ctp-flamingo/15 px-3 py-1 text-xs font-medium text-ctp-flamingo">
                            {displayCertifications[certificationSlideIndex]?.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {displayCertifications.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    onClick={prevCertSlide}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : { scale: 1.1, x: -4 }
                    }
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-ctp-flamingo/20 p-2 text-ctp-flamingo backdrop-blur-sm transition-colors hover:bg-ctp-flamingo/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-flamingo/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                    aria-label="Previous certification"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={nextCertSlide}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : { scale: 1.1, x: 4 }
                    }
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-ctp-flamingo/20 p-2 text-ctp-flamingo backdrop-blur-sm transition-colors hover:bg-ctp-flamingo/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-flamingo/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                    aria-label="Next certification"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}

              {/* Slide Indicators */}
              {displayCertifications.length > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  {displayCertifications.map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => setCertificationSlideIndex(index)}
                      whileHover={
                        reducedMotion ? undefined : { scale: 1.2 }
                      }
                      whileTap={{ scale: 0.95 }}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        index === certificationSlideIndex
                          ? "w-8 bg-ctp-flamingo"
                          : "w-2 bg-ctp-surface1/50 hover:bg-ctp-surface1"
                      }`}
                      aria-label={`Go to certification ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              {/* Visible slider control (always rendered with slideshow) */}
              {displayCertifications.length > 1 && (
                <div className="mt-4 mx-auto max-w-xl px-6">
                  <input
                    aria-label="Certification slider"
                    type="range"
                    min={0}
                    max={displayCertifications.length - 1}
                    value={certificationSlideIndex}
                    onChange={(e) => setCertificationSlideIndex(Number(e.target.value))}
                    className="w-full h-1 appearance-none rounded-full bg-ctp-surface1/40 accent-ctp-flamingo/80 hover:accent-ctp-flamingo"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-ctp-subtext0">
                    <span>{certificationSlideIndex + 1}</span>
                    <span>
                      {displayCertifications.length} / Slides
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Grid View */}
        {certificationViewMode === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sortedCertifications.map((cert, index) => (
              <motion.article
                key={cert.title}
                initial={{
                  opacity: 0,
                  y: reducedMotion ? 0 : 16,
                  filter: reducedMotion ? "none" : "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: reducedMotion ? 0 : index * 0.06,
                  duration: reducedMotion ? 0.2 : 0.36,
                  ease,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                className="group relative overflow-hidden rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/45"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ctp-flamingo/10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ctp-flamingo/15">
                      <BadgeCheck className="h-5 w-5 text-ctp-flamingo" />
                    </div>
                    {cert.featured && (
                      <span className="ml-auto inline-flex items-center rounded-full border border-ctp-surface1/60 bg-ctp-surface0/50 px-2.5 py-1 text-[11px] font-medium text-ctp-subtext0">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold leading-snug text-ctp-text line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-ctp-subtext0">
                    {translateDynamicText(locale, cert.organization)}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-ctp-flamingo/15 px-2.5 py-1 text-[10px] font-medium text-ctp-flamingo">
                    {translateDynamicText(locale, cert.date)}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-ctp-subtext1 line-clamp-2">
                    {translateDynamicText(locale, cert.description)}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedAchievement?.certificateImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ctp-crust/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.24, ease }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-ctp-surface0 bg-ctp-base shadow-2xl"
              initial={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.97,
                y: reducedMotion ? 0 : 12,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.98,
                y: reducedMotion ? 0 : 8,
              }}
              transition={{ duration: reducedMotion ? 0.2 : 0.28, ease }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${copy.achievements.certificateFor} ${selectedAchievement.title}`}
            >
              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-ctp-surface0 p-2 text-ctp-text transition-colors hover:bg-ctp-surface1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                aria-label={copy.achievements.closeCertificate}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-ctp-surface0/70 bg-ctp-surface0/30 px-6 py-4 pr-14">
                <p className="text-sm font-semibold text-ctp-text line-clamp-1">
                  {selectedAchievement.title}
                </p>
                <p className="mt-1 text-xs text-ctp-subtext0">
                  {translateDynamicText(
                    locale,
                    selectedAchievement.organization,
                  )}{" "}
                  · {translateDynamicText(locale, selectedAchievement.date)}
                </p>
              </div>

              <div className="p-8">
                <Image
                  src={selectedAchievement.certificateImage}
                  alt={`${selectedAchievement.title} certificate`}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[calc(90vh-10rem)] max-w-full rounded-lg object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
