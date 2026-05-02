"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { EXPERIENCE, ORGANIZING_VOLUNTEERING } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getCopy,
  translateDynamicText,
  type Locale,
} from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

type ExperienceItem = (typeof EXPERIENCE)[number];

const getTypeConfig = (locale: Locale) => {
  const copy = getCopy(locale);

  return {
    work: {
      icon: Briefcase,
      color: "text-ctp-red",
      bg: "bg-ctp-red/10",
      label: copy.experience.work,
      marker: "bg-ctp-red",
      rail: "bg-ctp-red/70",
    },
    teaching: {
      icon: BookOpen,
      color: "text-ctp-maroon",
      bg: "bg-ctp-maroon/10",
      label: copy.experience.teaching,
      marker: "bg-ctp-maroon",
      rail: "bg-ctp-maroon/70",
    },
    education: {
      icon: GraduationCap,
      color: "text-ctp-maroon",
      bg: "bg-ctp-maroon/10",
      label: copy.experience.education,
      marker: "bg-ctp-maroon",
      rail: "bg-ctp-maroon/70",
    },
  };
};

const getOrganizingCategoryConfig = (locale: Locale) => {
  const copy = getCopy(locale);

  return {
    organizer: {
      label: copy.experience.organizer,
      badge: "bg-ctp-red/10 text-ctp-red",
      dot: "bg-ctp-red",
    },
    volunteer: {
      label: copy.experience.volunteer,
      badge: "bg-ctp-pink/10 text-ctp-pink",
      dot: "bg-ctp-pink",
    },
  };
};

const resolveExperienceTypeConfig = (
  type: string,
  config: ReturnType<typeof getTypeConfig>,
) => {
  if (type === "teaching") return config.teaching;
  if (type === "education") return config.education;
  return config.work;
};

const resolveOrganizingCategoryConfig = (
  category: string,
  config: ReturnType<typeof getOrganizingCategoryConfig>,
) => {
  if (category === "organizer") return config.organizer;
  return config.volunteer;
};

const parseYear = (value: string) => {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
};

const getExperienceSortScore = (startDate: string, endDate: string) => {
  if (/present/i.test(endDate)) {
    return 9999;
  }

  return parseYear(endDate) || parseYear(startDate);
};

const orderedExperience = [...EXPERIENCE].sort(
  (a, b) =>
    getExperienceSortScore(b.startDate, b.endDate) -
    getExperienceSortScore(a.startDate, a.endDate),
);

const featuredExperience: ExperienceItem | null =
  orderedExperience.find(
    (exp) => exp.type === "work" && /present/i.test(exp.endDate),
  ) ??
  orderedExperience.find((exp) => /present/i.test(exp.endDate)) ??
  null;

const timelineExperience = orderedExperience.filter(
  (exp) => exp.title !== featuredExperience?.title,
);

const getContainerVariants = (reducedMotion: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: reducedMotion ? 0 : 0.04,
      staggerChildren: reducedMotion ? 0.04 : 0.08,
    },
  },
});

const getFeaturedCardVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 24,
    filter: reducedMotion ? "none" : "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reducedMotion ? 0.3 : 0.55,
      ease,
    },
  },
});

const getTimelineItemVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 20,
    x: reducedMotion ? 0 : -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: reducedMotion ? 0.28 : 0.45,
      ease,
    },
  },
});

const getMarkerVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    scale: reducedMotion ? 1 : 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: reducedMotion ? 0.2 : 0.35,
      ease,
    },
  },
});

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const typeConfig = getTypeConfig(locale);
  const organizingCategoryConfig = getOrganizingCategoryConfig(locale);
  const [showOrganizing, setShowOrganizing] = useState(false);
  const organizingPanelId = "experience-organizing-panel";

  const containerVariants = getContainerVariants(reducedMotion);
  const featuredCardVariants = getFeaturedCardVariants(reducedMotion);
  const timelineItemVariants = getTimelineItemVariants(reducedMotion);
  const markerVariants = getMarkerVariants(reducedMotion);

  const featuredConfig = featuredExperience
    ? resolveExperienceTypeConfig(featuredExperience.type, typeConfig)
    : typeConfig.work;
  const FeaturedIcon = featuredConfig.icon;
  const organizingCountLabel =
    locale === "bn"
      ? ORGANIZING_VOLUNTEERING.length.toLocaleString("bn-BD")
      : String(ORGANIZING_VOLUNTEERING.length);

  return (
    <Section id="experience" className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-ctp-red/10 blur-3xl" />
        <div className="absolute -bottom-12 right-8 h-48 w-48 rounded-full bg-ctp-maroon/10 blur-3xl" />
      </div>

      <SectionTitle
        badge={copy.experience.badge}
        title={copy.experience.title}
        highlightWord={locale === "bn" ? "কর্মজীবন" : "Work"}
        subtitle={copy.experience.subtitle}
      />

      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
      >
        {featuredExperience && (
          <motion.article
            variants={featuredCardVariants}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    y: -4,
                  }
            }
            transition={{ duration: 0.25, ease }}
            className="group relative overflow-hidden rounded-2xl border border-ctp-surface0/70 bg-ctp-surface0/35 p-6 sm:p-7 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/45"
          >
            <div
              className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${featuredConfig.bg} opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${featuredConfig.bg} ${featuredConfig.color}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${featuredConfig.marker}`}
                />
                {copy.experience.currentWork}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div
                className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${featuredConfig.bg} ${
                  reducedMotion
                    ? ""
                    : "group-hover:-translate-y-0.5 group-hover:scale-105"
                }`}
              >
                <FeaturedIcon className={`h-5 w-5 ${featuredConfig.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-display font-bold text-ctp-text leading-tight mb-1">
                  {translateDynamicText(locale, featuredExperience.title)}
                </h3>
                <p className="text-sm text-ctp-subtext0 mb-3">
                  {translateDynamicText(
                    locale,
                    featuredExperience.organization,
                  )}{" "}
                  · {translateDynamicText(locale, featuredExperience.location)}
                </p>

                <div className="inline-flex items-center gap-1.5 rounded-lg border border-ctp-surface1/60 bg-ctp-surface0/30 px-2.5 py-1 text-xs text-ctp-red mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {translateDynamicText(
                    locale,
                    featuredExperience.startDate,
                  )} –{" "}
                  {translateDynamicText(locale, featuredExperience.endDate)}
                </div>

                <ul className="space-y-2">
                  {featuredExperience.description.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-ctp-subtext0"
                    >
                      <span
                        className={`mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full ${featuredConfig.marker}`}
                      />
                      <span>{translateDynamicText(locale, item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        )}

        {timelineExperience.length > 0 && (
          <motion.div variants={featuredCardVariants} className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-ctp-surface1/70" />
              <span className="text-xs font-mono tracking-wide uppercase text-ctp-overlay0">
                {copy.experience.timeline}
              </span>
              <div className="h-px flex-1 bg-ctp-surface1/70" />
            </div>

            <div className="relative pl-7 sm:pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-ctp-surface1/70" />

              <div className="space-y-4">
                {timelineExperience.map((exp) => {
                  const config = resolveExperienceTypeConfig(
                    exp.type,
                    typeConfig,
                  );
                  const Icon = config.icon;

                  return (
                    <motion.article
                      key={`${exp.title}-${exp.startDate}`}
                      variants={timelineItemVariants}
                      whileHover={
                        reducedMotion
                          ? undefined
                          : {
                              y: -3,
                            }
                      }
                      transition={{ duration: 0.25, ease }}
                      className="group relative overflow-hidden rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 p-5 sm:p-6 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/40"
                    >
                      <motion.span
                        variants={markerVariants}
                        className={`absolute -left-[1.38rem] top-7 h-3 w-3 rounded-full border-2 border-ctp-base ${config.marker}`}
                      />

                      <div
                        className={`pointer-events-none absolute -left-9 top-2 h-14 w-14 rounded-full ${config.bg} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-80`}
                      />

                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`p-2.5 rounded-xl ${config.bg} shrink-0`}
                        >
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="text-base sm:text-lg font-display font-semibold text-ctp-text leading-snug">
                              {translateDynamicText(locale, exp.title)}
                            </h3>

                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
                            >
                              {config.label}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-ctp-subtext0">
                            {translateDynamicText(locale, exp.organization)} ·{" "}
                            {translateDynamicText(locale, exp.location)}
                          </p>

                          <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-ctp-red">
                            <Calendar className="w-3.5 h-3.5" />
                            {translateDynamicText(locale, exp.startDate)} –{" "}
                            {translateDynamicText(locale, exp.endDate)}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-1.5">
                        {exp.description.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-ctp-subtext0"
                          >
                            <span
                              className={`mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full ${config.marker}`}
                            />
                            <span>{translateDynamicText(locale, item)}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="max-w-3xl mx-auto mt-12">
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowOrganizing(!showOrganizing)}
            aria-expanded={showOrganizing}
            aria-controls={organizingPanelId}
            aria-label={`${showOrganizing ? copy.experience.hide : copy.experience.show} ${copy.experience.ariaOrganizingToggle}`}
            className="group mx-auto inline-flex items-center gap-2 rounded-full border border-ctp-surface0/60 bg-ctp-surface0/25 px-4 py-2 text-sm font-medium text-ctp-subtext0 transition-[color,border-color,background-color] duration-200 hover:border-ctp-surface1 hover:bg-ctp-surface0/40 hover:text-ctp-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60"
          >
            <Award className="w-4 h-4 text-ctp-red" />
            {copy.experience.organizingButton} ({organizingCountLabel})
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showOrganizing ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showOrganizing && (
            <motion.div
              id={organizingPanelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.32, ease }}
              className="overflow-hidden"
            >
              <motion.div
                className="grid sm:grid-cols-2 gap-3 mt-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: reducedMotion ? 0 : 0.04,
                      staggerChildren: reducedMotion ? 0.03 : 0.05,
                    },
                  },
                }}
              >
                {ORGANIZING_VOLUNTEERING.map((item) => {
                  const category = resolveOrganizingCategoryConfig(
                    item.category,
                    organizingCategoryConfig,
                  );

                  return (
                    <motion.div
                      key={`${item.title}-${item.date}`}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: reducedMotion ? 0 : 10,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: reducedMotion ? 0.2 : 0.3,
                            ease,
                          },
                        },
                      }}
                      className="rounded-xl border border-ctp-surface0/60 bg-ctp-surface0/20 p-4 transition-colors duration-200 hover:border-ctp-surface1"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-ctp-red">
                          {translateDynamicText(locale, item.date)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${category.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${category.dot}`}
                          />
                          {category.label}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-ctp-text leading-snug line-clamp-2">
                        {translateDynamicText(locale, item.title)}
                      </h4>
                      <p className="text-xs text-ctp-subtext0 mt-1 line-clamp-2">
                        {translateDynamicText(locale, item.organization)}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}



