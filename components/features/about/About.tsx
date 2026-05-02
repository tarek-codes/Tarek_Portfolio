"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Code2,
  GraduationCap,
  Heart,
  MapPin,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  ABOUT_CARDS,
  type AboutCardIconKey,
  type AboutCardLayoutKey,
  type AboutCardToneKey,
} from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy, translateDynamicText } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<AboutCardIconKey, LucideIcon> = {
  code: Code2,
  education: GraduationCap,
  competitive: Trophy,
  location: MapPin,
  current: Briefcase,
  interests: Heart,
};

const toneMap: Record<
  AboutCardToneKey,
  {
    icon: string;
    badge: string;
    dot: string;
    accent: string;
  }
> = {
  blue: {
    icon: "text-ctp-red",
    badge: "bg-ctp-red/10",
    dot: "bg-ctp-red",
    accent: "bg-ctp-red/70",
  },
  green: {
    icon: "text-ctp-maroon",
    badge: "bg-ctp-maroon/10",
    dot: "bg-ctp-maroon",
    accent: "bg-ctp-maroon/70",
  },
  yellow: {
    icon: "text-ctp-red",
    badge: "bg-ctp-red/10",
    dot: "bg-ctp-red",
    accent: "bg-ctp-red/70",
  },
  pink: {
    icon: "text-ctp-pink",
    badge: "bg-ctp-pink/10",
    dot: "bg-ctp-pink",
    accent: "bg-ctp-pink/70",
  },
  mauve: {
    icon: "text-ctp-maroon",
    badge: "bg-ctp-maroon/10",
    dot: "bg-ctp-maroon",
    accent: "bg-ctp-maroon/70",
  },
  red: {
    icon: "text-ctp-red",
    badge: "bg-ctp-red/10",
    dot: "bg-ctp-red",
    accent: "bg-ctp-red/70",
  },
};

const layoutMap: Record<AboutCardLayoutKey, string> = {
  default: "",
  feature: "md:col-span-2",
};

const cardOrder = [
  "current",
  "bio",
  "education",
  "competitive",
  "location",
  "interests",
] as const;

const getCardSpan = (id: string, layout: AboutCardLayoutKey) => {
  if (id === "current") {
    return "md:col-span-3";
  }

  return layoutMap[layout];
};

const getCardVariants = (reducedMotion: boolean) => ({
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
      duration: reducedMotion ? 0.3 : 0.5,
      ease,
    },
  },
});

const getContainerTransition = (reducedMotion: boolean) => ({
  delayChildren: reducedMotion ? 0 : 0.06,
  staggerChildren: reducedMotion ? 0.04 : 0.08,
});

const hoverTransition = {
  duration: 0.25,
  ease,
};

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const cardVariants = getCardVariants(reducedMotion);

  const orderedCards = [...ABOUT_CARDS].sort((a, b) => {
    const aIndex = cardOrder.indexOf(a.id as (typeof cardOrder)[number]);
    const bIndex = cardOrder.indexOf(b.id as (typeof cardOrder)[number]);

    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });

  const iconHoverClasses = reducedMotion
    ? ""
    : "group-hover:-translate-y-0.5 group-hover:scale-105";
  const iconRotateClasses = reducedMotion ? "" : "group-hover:rotate-6";
  const glowClasses = reducedMotion ? "opacity-0" : "group-hover:opacity-100";

  return (
    <Section id="about" className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-0 h-52 w-52 rounded-full bg-ctp-red/10 blur-3xl" />
        <div className="absolute -bottom-8 right-6 h-56 w-56 rounded-full bg-ctp-maroon/10 blur-3xl" />
      </div>

      <SectionTitle
        badge={copy.about.badge}
        title={copy.about.title}
        highlightWord={locale === "bn" ? "জানুন" : "Know Me"}
        subtitle={copy.about.subtitle}
      />

      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={getContainerTransition(reducedMotion)}
      >
        {orderedCards.map((card) => {
          const Icon = iconMap[card.icon];
          const tone = toneMap[card.tone];

          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              transition={hoverTransition}
              className={`group relative overflow-hidden rounded-2xl border border-ctp-surface0/70 bg-ctp-surface0/35 p-4 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/45 sm:p-5 ${getCardSpan(card.id, card.layout)}`}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${tone.badge} opacity-0 blur-3xl transition-opacity duration-300 ${glowClasses}`}
              />

              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 ${tone.badge} ${iconHoverClasses}`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 ${tone.icon} ${iconRotateClasses}`}
                  />
                </div>

                <h3 className="font-display text-lg font-semibold text-ctp-text">
                  {translateDynamicText(locale, card.label)}
                </h3>
              </div>

              {card.content.kind === "paragraph" ? (
                <p className="text-sm leading-relaxed text-ctp-subtext0 md:text-[0.95rem]">
                  {translateDynamicText(locale, card.content.text)}
                </p>
              ) : (
                <ul className="space-y-2">
                  {card.content.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-ctp-subtext0"
                    >
                      <span
                        className={`mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`}
                      />
                      <span>{translateDynamicText(locale, item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}



