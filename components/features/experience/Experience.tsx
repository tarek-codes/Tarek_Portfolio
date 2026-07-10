"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  Award,
  Briefcase,
  ChevronDown,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Image from "next/image";
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

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const parseYear = (value: string) => {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
};

const getExperienceSortScore = (startDate: string, endDate: string) => {
  if (/present/i.test(endDate)) return 9999;
  return parseYear(endDate) || parseYear(startDate);
};

const orderedExperience = [...EXPERIENCE].sort(
  (a, b) =>
    getExperienceSortScore(b.startDate, b.endDate) -
    getExperienceSortScore(a.startDate, a.endDate),
);

const workExperience = orderedExperience.filter((e) => e.type === "work");
const educationExperience = orderedExperience.filter(
  (e) => e.type === "education",
);

/* ─── Organising category config ────────────────────────────────────────── */

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

const resolveOrganizingCategoryConfig = (
  category: string,
  config: ReturnType<typeof getOrganizingCategoryConfig>,
) => (category === "organizer" ? config.organizer : config.volunteer);

/* ─── Animation variants ────────────────────────────────────────────────── */

const cardVariants = (rm: boolean) => ({
  hidden: { opacity: 0, y: rm ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: rm ? 0.3 : 0.55, ease },
  },
});

const rowVariants = (rm: boolean) => ({
  hidden: { opacity: 0, x: rm ? 0 : -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: rm ? 0.2 : 0.3, ease },
  },
});

const stagger = (delay = 0, rm = false) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: rm ? 0.02 : 0.07,
      delayChildren: rm ? 0 : delay,
    },
  },
});

/* ─── Status badge ──────────────────────────────────────────────────────── */

function StatusBadge({ endDate, type }: { endDate: string; type: string }) {
  const isActive = /present/i.test(endDate);
  const isEducation = type === "education";

  let label: string;
  let cls: string;

  if (isActive) {
    label = "ACTIVE";
    cls = "border-ctp-red/30 bg-ctp-red/10 text-ctp-red";
  } else if (isEducation) {
    label = "GRADUATED";
    cls = "border-ctp-maroon/30 bg-ctp-maroon/10 text-ctp-maroon";
  } else {
    label = "CONCLUDED";
    cls = "border-ctp-surface1/60 bg-ctp-surface0/40 text-ctp-overlay0";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-display text-[10px] font-medium tracking-wider ${cls}`}
    >
      {isActive ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ctp-red opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ctp-red" />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      )}
      {label}
    </span>
  );
}

/* ─── Org logo ─────────────────────────────────────────────────────────── */

const ORG_LOGOS: Record<string, string> = {
  "Betopia Limted":
    "https://www.betopialimited.com/favicon.ico?favicon.10dld~._d741r.ico",
  "Betopia Limited":
    "https://www.betopialimited.com/favicon.ico?favicon.10dld~._d741r.ico",
  "BRAC University":
    "https://www.bracu.ac.bd/sites/default/files/resources/media/bracu_logo_12-0-2022.png",
};

function OrgLogo({
  organization,
  type,
}: {
  organization: string;
  type: string;
}) {
  const [failed, setFailed] = useState(false);
  const logoPath = ORG_LOGOS[organization];

  const initials = organization
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const bg = type === "education" ? "bg-[#7c1d1d]" : "bg-[#0f172a]";

  if (!logoPath || failed) {
    return (
      <div
        className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${bg} border border-white/10 shadow-xl`}
      >
        <span className="font-display text-xl font-black text-white">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: 20 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      whileHover={{
        scale: 1.1,
        rotate: -3,
        filter: "brightness(1.1) contrast(1.1)",
        boxShadow: "0 0 40px rgba(220, 38, 38, 0.4)",
      }}
      viewport={{ once: true }}
      className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl transition-all hover:border-ctp-red/60 mt-1"
    >
      {/* Subtle background glow inside the logo box */}
      <div className="absolute inset-0 bg-radial-gradient from-ctp-red/20 to-transparent opacity-60" />

      <Image
        src={logoPath}
        alt={`${organization} logo`}
        width={96}
        height={96}
        className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
        unoptimized
        onError={() => setFailed(true)}
      />
    </motion.div>
  );
}

/* ─── Experience card ───────────────────────────────────────────────────── */

function ExperienceCard({
  exp,
  rm,
  locale,
  isWork,
}: {
  exp: (typeof EXPERIENCE)[number];
  rm: boolean;
  locale: Locale;
  isWork: boolean;
}) {
  const implementationLabel = isWork
    ? "// Technical Implementation"
    : "// Academic Details";

  return (
    <motion.div
      variants={cardVariants(rm)}
      className="group relative overflow-hidden rounded-3xl border border-ctp-surface0/60 bg-gradient-to-br from-ctp-surface0/20 via-ctp-surface0/10 to-ctp-mantle/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-ctp-red/35 hover:bg-ctp-surface0/15 hover:shadow-[0_20px_50px_-25px_rgba(237,135,150,0.15)] sm:p-8 flex flex-col justify-between"
    >
      {/* Corner glow */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
          isWork ? "bg-ctp-red/15" : "bg-ctp-maroon/15"
        }`}
      />

      <div>
        {/* Date range & status badge */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p
            className={`font-display text-sm font-semibold tracking-wide ${
              isWork ? "text-ctp-red" : "text-ctp-maroon"
            }`}
          >
            / {translateDynamicText(locale, exp.startDate)} –{" "}
            {translateDynamicText(locale, exp.endDate)}
          </p>
          <StatusBadge endDate={exp.endDate} type={exp.type} />
        </div>

        {/* Title, organization name and logo */}
        <div className="mb-4 flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h3 className="font-display text-xl font-black tracking-wide text-ctp-text sm:text-2xl">
              {translateDynamicText(locale, exp.organization)}
            </h3>
            <p className="text-sm font-semibold text-ctp-subtext0 mt-1">
              {translateDynamicText(locale, exp.title)}
            </p>
          </div>
          <div className="flex shrink-0 justify-end sm:block">
            <OrgLogo organization={exp.organization} type={exp.type} />
          </div>
        </div>

        {/* Location row */}
        <div className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-ctp-overlay0">
          <MapPin className="h-3.5 w-3.5" />
          {translateDynamicText(locale, exp.location)}
        </div>

        {/* Implementation / details header */}
        <div className="mb-4 flex items-center gap-3">
          <span className="font-display text-xs font-bold tracking-[0.15em] uppercase text-ctp-overlay0">
            {implementationLabel}
          </span>
          <div className="h-px flex-1 bg-ctp-surface1/40" />
        </div>

        {/* Bullet points */}
        <motion.ul
          className="space-y-3"
          variants={stagger(0.1, rm)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {exp.description.map((item) => (
            <motion.li
              key={item}
              variants={rowVariants(rm)}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-ctp-subtext0"
            >
              <span
                className={`mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full ${
                  isWork ? "bg-ctp-red" : "bg-ctp-maroon"
                }`}
              />
              <span>{translateDynamicText(locale, item)}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

/* ─── Section group header ──────────────────────────────────────────────── */

function GroupHeader({
  icon: Icon,
  label,
  rm,
}: {
  icon: React.ElementType;
  label: string;
  rm: boolean;
}) {
  return (
    <motion.div
      className="mb-5 flex items-center gap-3"
      initial={{ opacity: 0, x: rm ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: rm ? 0.2 : 0.4, ease }}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ctp-red/10">
        <Icon className="h-4 w-4 text-ctp-red" />
      </div>
      <span className="font-display text-[11px] font-semibold tracking-[0.22em] uppercase text-ctp-overlay0">
        {label}
      </span>
      <div className="h-px flex-1 bg-ctp-surface0/70" />
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const rm = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const organizingCategoryConfig = getOrganizingCategoryConfig(locale);
  const [showOrganizing, setShowOrganizing] = useState(false);
  const organizingPanelId = "experience-organizing-panel";

  const organizingCountLabel =
    locale === "bn"
      ? ORGANIZING_VOLUNTEERING.length.toLocaleString("bn-BD")
      : String(ORGANIZING_VOLUNTEERING.length);

  return (
    <Section id="experience" className="relative">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-ctp-red/8 opacity-12" />
        <div className="absolute -bottom-12 right-8 h-48 w-48 rounded-full bg-ctp-maroon/8 opacity-10" />
      </div>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display select-none text-[5rem] font-black uppercase leading-none text-ctp-red/8 opacity-12 sm:text-[8rem] lg:text-[11rem] xl:text-[14rem] mix-blend-overlay">
          EXPERIENCE
        </span>
      </div>

      <SectionTitle
        badge={copy.experience.badge}
        title={copy.experience.title}
        highlightWord={locale === "bn" ? "কর্মজীবন" : "Work"}
        subtitle={copy.experience.subtitle}
      />

      <div className="mx-auto max-w-7xl space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ── Work Experience ──────────────────────────────────────── */}
          {workExperience.length > 0 && (
            <div className="flex flex-col">
              <GroupHeader icon={Briefcase} label="Work Experience" rm={rm} />
              <motion.div
                className="flex-1 flex flex-col gap-6"
                variants={stagger(0.04, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {workExperience.map((exp) => (
                  <ExperienceCard
                    key={`${exp.title}-${exp.startDate}`}
                    exp={exp}
                    rm={rm}
                    locale={locale}
                    isWork={true}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* ── Education ────────────────────────────────────────────── */}
          {educationExperience.length > 0 && (
            <div className="flex flex-col">
              <GroupHeader icon={GraduationCap} label="Education" rm={rm} />
              <motion.div
                className="flex-1 flex flex-col gap-6"
                variants={stagger(0.04, rm)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {educationExperience.map((exp) => (
                  <ExperienceCard
                    key={`${exp.title}-${exp.startDate}`}
                    exp={exp}
                    rm={rm}
                    locale={locale}
                    isWork={false}
                  />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* ── Other types (teaching, etc.) ─────────────────────────── */}
        {orderedExperience
          .filter((e) => e.type !== "work" && e.type !== "education")
          .map((exp) => (
            <div key={`${exp.title}-${exp.startDate}`} className="mx-auto max-w-3xl">
              <ExperienceCard
                exp={exp}
                rm={rm}
                locale={locale}
                isWork={false}
              />
            </div>
          ))}

        {/* ── Organising & Volunteering toggle ─────────────────────── */}
        {ORGANIZING_VOLUNTEERING.length > 0 && (
          <div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowOrganizing(!showOrganizing)}
                aria-expanded={showOrganizing}
                aria-controls={organizingPanelId}
                className="group mx-auto inline-flex items-center gap-2 rounded-full border border-ctp-surface0/60 bg-ctp-surface0/25 px-4 py-2 text-sm font-medium text-ctp-subtext0 transition-[color,border-color,background-color] duration-200 hover:border-ctp-surface1 hover:bg-ctp-surface0/40 hover:text-ctp-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red/60"
              >
                <Award className="w-4 h-4 text-ctp-red" />
                {copy.experience.organizingButton} ({organizingCountLabel})
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showOrganizing ? "rotate-180" : ""}`}
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
                  transition={{ duration: rm ? 0.2 : 0.32, ease }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="grid sm:grid-cols-2 gap-3 mt-6"
                    initial="hidden"
                    animate="visible"
                    variants={stagger(0.04, rm)}
                  >
                    {ORGANIZING_VOLUNTEERING.map((item) => {
                      const category = resolveOrganizingCategoryConfig(
                        item.category,
                        organizingCategoryConfig,
                      );
                      return (
                        <motion.div
                          key={`${item.title}-${item.date}`}
                          variants={cardVariants(rm)}
                          className="rounded-xl border border-ctp-surface0/60 bg-ctp-surface0/20 p-4 transition-colors hover:border-ctp-surface1"
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <span className="text-xs font-display text-ctp-red">
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
        )}
      </div>
    </Section>
  );
}
