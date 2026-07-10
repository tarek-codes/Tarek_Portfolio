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
  FileImage,
  ExternalLink,
  Layers,
  Tv,
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

const getCredentialId = (cert: Achievement) => {
  if (cert.link) {
    const driveIdMatch = cert.link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveIdMatch && driveIdMatch[1]) {
      return `#${driveIdMatch[1].substring(0, 8).toUpperCase()}`;
    }
  }
  let hash = 0;
  for (let i = 0; i < cert.title.length; i++) {
    hash = cert.title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idStr = Math.abs(hash).toString(16).substring(0, 8).toUpperCase();
  return `#${idStr}`;
};

const getEyebrowLabel = (type: AchievementType, locale: Locale) => {
  const isBn = locale === "bn";
  switch (type) {
    case "competition":
      return isBn ? "/ প্রতিযোগিতামূলক অর্জন" : "/ COMPETITION RECORD";
    case "certification":
      return isBn ? "/ অর্জিত সার্টিফিকেট" : "/ STATEMENT OF ACCOMPLISHMENT";
    case "training":
      return isBn ? "/ প্রশিক্ষণ প্রোগ্রাম" : "/ TRAINING ACCOMPLISHMENT";
    case "scholarship":
      return isBn ? "/ একাডেমিক স্কলারশিপ" : "/ SCHOLARSHIP AWARD";
    case "academic":
      return isBn ? "/ একাডেমিক সম্মাননা" : "/ ACADEMIC DISTINCTION";
    case "rating":
      return isBn ? "/ অর্জিত রেটিং" : "/ RATING MILESTONE";
    case "volunteer":
      return isBn ? "/ স্বেচ্ছাসেবক রেকর্ড" : "/ VOLUNTEERING RECORD";
    default:
      return isBn ? "/ অর্জন" : "/ ACHIEVEMENT RECORD";
  }
};

export default function Achievements() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);

  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [certificationViewMode, setCertificationViewMode] = useState<
    "slideshow" | "grid"
  >("slideshow");
  const [certificationSlideIndex, setCertificationSlideIndex] = useState(0);
  const [achievementFilter, setAchievementFilter] = useState<
    "all" | "competition" | "certification" | "training"
  >("all");

  // Certifications logic filtered by tab state
  const certifications = useMemo(
    () => {
      const filtered = ACHIEVEMENTS.filter((a) =>
        ["certification", "competition", "training"].includes(a.type),
      );
      if (achievementFilter === "all") return filtered;
      return filtered.filter((a) => a.type === achievementFilter);
    },
    [achievementFilter],
  );

  const sortedCertifications = useMemo(
    () => [
      ...certifications.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      ),
    ],
    [certifications],
  );

  const displayCertifications = sortedCertifications;

  useEffect(() => {
    setCertificationSlideIndex(0);
  }, [achievementFilter]);

  const nextCertSlide = () => {
    setCertificationSlideIndex(
      (prev) => (prev + 1) % displayCertifications.length,
    );
  };

  const prevCertSlide = () => {
    setCertificationSlideIndex(
      (prev) =>
        (prev - 1 + displayCertifications.length) %
        displayCertifications.length,
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
    <Section id="achievements" className="relative">
      {/* Background decorations */}
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
          {locale === "bn" ? "অর্জন" : "ACHIEVEMENTS"}
        </span>
      </div>

      <SectionTitle
        badge={copy.achievements.badge}
        title={copy.achievements.title}
        highlightWord={locale === "bn" ? "অর্জন" : "Achievements"}
        subtitle={copy.achievements.subtitle}
      />

      {/* Filters and View Mode Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 max-w-7xl mx-auto px-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
          {([
            { key: "all", label: locale === "bn" ? "সব" : "All", icon: Layers },
            { key: "competition", label: copy.achievements.competition, icon: Trophy },
            { key: "certification", label: locale === "bn" ? "সার্টিফিকেট" : "Certificates", icon: BadgeCheck },
            { key: "training", label: copy.achievements.training, icon: GraduationCap }
          ] as const).map((item) => {
            const Icon = item.icon;
            const isActive = achievementFilter === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setAchievementFilter(item.key)}
                aria-pressed={isActive}
                className={`group relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-flamingo/60 ${
                  isActive
                    ? "text-white"
                    : "text-ctp-subtext0 hover:text-ctp-text bg-ctp-surface0/40 hover:bg-ctp-surface0/60 border border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl bg-ctp-red shadow-lg shadow-ctp-red/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Toggle */}
        <div className="flex justify-center shrink-0">
          <div className="flex items-center gap-1 rounded-full border border-white/5 bg-ctp-crust/50 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setCertificationViewMode("slideshow")}
              className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none ${
                certificationViewMode === "slideshow"
                  ? "bg-ctp-red text-white shadow-md shadow-ctp-red/20"
                  : "text-ctp-subtext0 hover:text-ctp-text"
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
              {locale === "bn" ? "স্লাইডশো" : "Slideshow"}
            </button>
            <button
              type="button"
              onClick={() => setCertificationViewMode("grid")}
              className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none ${
                certificationViewMode === "grid"
                  ? "bg-ctp-red text-white shadow-md shadow-ctp-red/20"
                  : "text-ctp-subtext0 hover:text-ctp-text"
              }`}
            >
              <Grid3x3 className="h-3.5 w-3.5" />
              {locale === "bn" ? "গ্রিড" : "Grid View"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Slideshow View */}
        {certificationViewMode === "slideshow" &&
          displayCertifications.length > 0 && (
            <motion.div
              key="slideshow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mx-auto max-w-7xl px-4"
            >
              <div className="group relative">
                <AnimatePresence mode="wait">
                  {(() => {
                    const currentCert = displayCertifications[certificationSlideIndex];
                    if (!currentCert) return null;
                    const currentStyle = getTypeStyles(locale)[currentCert.type];
                    const CurrentIcon = currentStyle.icon;
                    return (
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
                        className="overflow-hidden rounded-3xl border border-white/5 bg-[#0b0c10]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative flex flex-col md:flex-row min-h-[30rem] md:min-h-[26rem] p-6 md:p-10 gap-8 items-center"
                      >
                        {/* Glow effect in slideshow */}
                        <div className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${currentStyle.glow} opacity-30`} />

                        {/* Left Column: Image or Gradient */}
                        <div className="relative w-full md:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-lg shrink-0">
                          {currentCert.certificateImage ? (
                            <Image
                              src={currentCert.certificateImage}
                              alt={currentCert.title}
                              fill
                              className="object-contain p-2 transition-transform duration-500 cursor-pointer hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 400px"
                              onClick={() => setSelectedAchievement(currentCert)}
                            />
                          ) : (
                            <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${currentCert.type === "competition" ? "from-ctp-red/15 to-ctp-maroon/5" : currentCert.type === "training" ? "from-ctp-flamingo/15 to-ctp-pink/5" : "from-ctp-pink/15 to-ctp-red/5"}`}>
                              <CurrentIcon className={`h-20 w-20 opacity-35 ${currentStyle.color}`} />
                            </div>
                          )}
                        </div>

                        {/* Right Column: Details */}
                        <div className="flex-1 w-full flex flex-col justify-between self-stretch relative z-10">
                          <div>
                            {/* Eyebrow Label */}
                            <span className="font-display text-[10px] font-bold tracking-[0.2em] text-ctp-red block mb-2 uppercase">
                              {getEyebrowLabel(currentCert.type, locale)}
                            </span>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-black tracking-wide text-ctp-red uppercase leading-snug mb-6">
                              {currentCert.title}
                            </h3>

                            {/* Details Table */}
                            <div className="space-y-4">
                              {/* Awarded To */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ctp-overlay0">
                                  {locale === "bn" ? "প্রদান করা হয়েছে" : "AWARDED TO"}
                                </span>
                                <span className="text-xs font-bold text-white bg-white/5 border border-white/10 px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                                  {locale === "bn" ? "তারেক আলম ভুইয়া" : "TAREK ALAM BHUIYAN"}
                                </span>
                              </div>

                              {/* Provider */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ctp-overlay0">
                                  {locale === "bn" ? "সরবরাহকারী" : "PROVIDER"}
                                </span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">
                                  {translateDynamicText(locale, currentCert.organization)}
                                </span>
                              </div>

                              {/* Completed */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ctp-overlay0">
                                  {locale === "bn" ? "সম্পন্ন হয়েছে" : "COMPLETED"}
                                </span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">
                                  {translateDynamicText(locale, currentCert.date)}
                                </span>
                              </div>

                              {/* Credential ID */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ctp-overlay0">
                                  {locale === "bn" ? "ক্রেডেনশিয়াল আইডি" : "CREDENTIAL ID"}
                                </span>
                                <span className="text-xs font-mono font-bold text-white/80">
                                  {getCredentialId(currentCert)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <div className="mt-8">
                            {currentCert.link ? (
                              <a
                                href={currentCert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-extrabold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 text-xs tracking-widest uppercase shadow-lg hover:shadow-white/5"
                              >
                                {locale === "bn" ? "ক্রেডেনশিয়াল যাচাই করুন" : "VERIFY CREDENTIAL"}
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            ) : currentCert.certificateImage ? (
                              <button
                                type="button"
                                onClick={() => setSelectedAchievement(currentCert)}
                                className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-extrabold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 text-xs tracking-widest uppercase shadow-lg hover:shadow-white/5"
                              >
                                {locale === "bn" ? "সার্টিফিকেট দেখুন" : "VIEW CERTIFICATE"}
                                <FileImage className="h-4 w-4" />
                              </button>
                            ) : (
                              <div className="text-xs text-ctp-overlay0 italic text-center">
                                {locale === "bn" ? "কোনো লিংক উপলব্ধ নেই" : "No verification link available"}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>

                {/* Navigation Arrows */}
                {displayCertifications.length > 1 && (
                  <>
                    <motion.button
                      type="button"
                      onClick={prevCertSlide}
                      whileHover={
                        reducedMotion ? undefined : { scale: 1.1 }
                      }
                      whileTap={{ scale: 0.95 }}
                      className="absolute left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 p-3 text-white backdrop-blur-md transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60"
                      aria-label="Previous certification"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={nextCertSlide}
                      whileHover={
                        reducedMotion ? undefined : { scale: 1.1 }
                      }
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 p-3 text-white backdrop-blur-md transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60"
                      aria-label="Next certification"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </>
                )}

                {/* Slide Indicators */}
                {displayCertifications.length > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    {displayCertifications.map((_, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => setCertificationSlideIndex(index)}
                        whileHover={reducedMotion ? undefined : { scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          index === certificationSlideIndex
                            ? "w-8 bg-ctp-red"
                            : "w-2 bg-ctp-surface1/50 hover:bg-ctp-surface1"
                        }`}
                        aria-label={`Go to certification ${index + 1}`}
                      />
                    ))}
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
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4"
          >
            {sortedCertifications.map((cert, index) => {
              const certStyle = getTypeStyles(locale)[cert.type];
              const CertIcon = certStyle.icon;
              return (
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
                          y: -6,
                        }
                  }
                  className="group relative overflow-hidden rounded-2xl border border-ctp-surface0 bg-ctp-surface0/20 backdrop-blur-sm transition-all duration-300 hover:border-ctp-surface1/80 hover:bg-ctp-surface0/35 flex flex-col h-full shadow-md hover:shadow-lg"
                >
                  <div className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${certStyle.glow} transition-opacity duration-300 opacity-0 group-hover:opacity-100`} />

                  {/* Header Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-ctp-surface0/60 border-b border-ctp-surface0/50">
                    {cert.certificateImage ? (
                      <>
                        <Image
                          src={cert.certificateImage}
                          alt={cert.title}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onClick={() => setSelectedAchievement(cert)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ctp-base/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </>
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${cert.type === "competition" ? "from-ctp-red/10 to-ctp-maroon/5" : cert.type === "training" ? "from-ctp-flamingo/10 to-ctp-pink/5" : "from-ctp-pink/10 to-ctp-red/5"}`}>
                        <CertIcon className={`h-12 w-12 opacity-35 ${certStyle.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`} />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${certStyle.bg} ${certStyle.color}`}
                        >
                          <span className={`h-1 w-1 rounded-full ${certStyle.accent}`} />
                          {certStyle.label}
                        </span>
                        {cert.featured && (
                          <span className="inline-flex items-center rounded-full border border-ctp-surface1/60 bg-ctp-surface0/50 px-2 py-0.5 text-[10px] font-medium text-ctp-subtext0">
                            {copy.achievements.featured}
                          </span>
                        )}
                        <span className={`ml-auto text-[11px] font-medium text-ctp-overlay0`}>
                          {translateDynamicText(locale, cert.date)}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold leading-snug text-ctp-text line-clamp-2 group-hover:text-ctp-red transition-colors duration-200">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-ctp-subtext0">
                        {translateDynamicText(locale, cert.organization)}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-ctp-subtext1 line-clamp-3">
                        {translateDynamicText(locale, cert.description)}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-ctp-surface0/40 flex items-center justify-between">
                      {cert.viewType === "image" && cert.certificateImage ? (
                        <button
                          type="button"
                          onClick={() => setSelectedAchievement(cert)}
                          className="inline-flex items-center gap-1.5 text-xs text-ctp-red transition-colors hover:text-ctp-flamingo font-semibold focus-visible:outline-none rounded"
                        >
                          {copy.achievements.certificate}
                          <FileImage className="h-3.5 w-3.5" />
                        </button>
                      ) : cert.viewType === "link" && cert.link ? (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-ctp-red transition-colors hover:text-ctp-flamingo font-semibold focus-visible:outline-none rounded"
                        >
                          {copy.achievements.view}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-ctp-overlay0 italic">No external link</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
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
