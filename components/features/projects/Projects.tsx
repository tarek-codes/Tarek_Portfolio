"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Download,
  Sparkles,
  Layers,
  CircleDot,
  ArrowUpRight,
  Code2,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS, type ProjectStatusKey } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getCopy,
  translateDynamicText,
  type Locale,
} from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

type ProjectItem = (typeof PROJECTS)[number];

type ProjectStats = {
  stars: number;
  forks: number;
  language: string;
  downloads?: number;
};

type FilterType = "all" | "web" | "ai";

const getFilterConfig = (
  locale: Locale,
): Record<FilterType, { label: string; icon: LucideIcon }> => {
  const copy = getCopy(locale);

  return {
    all: {
      label: copy.projects.allTab,
      icon: Layers,
    },
    web: {
      label: copy.projects.webTab,
      icon: Code2,
    },
    ai: {
      label: copy.projects.aiTab,
      icon: BrainCircuit,
    },
  };
};

const getStatusConfig = (
  locale: Locale,
): Record<
  ProjectStatusKey,
  {
    label: string;
    badge: string;
    dot: string;
    text: string;
    rail: string;
    glow: string;
  }
> => {
  const copy = getCopy(locale);

  return {
    active: {
      label: copy.projects.active,
      badge: "bg-ctp-maroon/12",
      dot: "bg-ctp-maroon",
      text: "text-ctp-maroon",
      rail: "bg-ctp-maroon/70",
      glow: "bg-ctp-maroon/12",
    },
    stable: {
      label: copy.projects.stable,
      badge: "bg-ctp-red/12",
      dot: "bg-ctp-red",
      text: "text-ctp-red",
      rail: "bg-ctp-red/70",
      glow: "bg-ctp-red/12",
    },
    prototype: {
      label: copy.projects.prototype,
      badge: "bg-ctp-maroon/12",
      dot: "bg-ctp-maroon",
      text: "text-ctp-maroon",
      rail: "bg-ctp-maroon/70",
      glow: "bg-ctp-maroon/12",
    },
    research: {
      label: copy.projects.research,
      badge: "bg-ctp-peach/14",
      dot: "bg-ctp-peach",
      text: "text-ctp-peach",
      rail: "bg-ctp-peach/70",
      glow: "bg-ctp-peach/14",
    },
  };
};

const fallbackStatus: ProjectStatusKey = "active";

const getGridVariants = (reducedMotion: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: reducedMotion ? 0 : 0.06,
      staggerChildren: reducedMotion ? 0.04 : 0.08,
    },
  },
});

const getCardVariants = (reducedMotion: boolean): Variants => ({
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

const getMetaVariants = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.2 : 0.35,
      ease,
    },
  },
});

const getCardLayout = (project: ProjectItem, index: number) => {
  const prominent = Boolean(project.featured);

  return {
    prominent,
    spanClass: prominent 
      ? "md:col-span-2 lg:col-span-3" 
      : "md:col-span-1 lg:col-span-2",
    imageClass: prominent ? "h-60 sm:h-64" : "h-52 sm:h-56",
    descClampClass: prominent ? "line-clamp-4" : "line-clamp-2",
  };
};

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const filterConfig = getFilterConfig(locale);
  const statusConfig = getStatusConfig(locale);
  const [filter, setFilter] = useState<FilterType>("all");
  const [projectStats, setProjectStats] = useState<
    Record<string, ProjectStats>
  >(() =>
    PROJECTS.reduce<Record<string, ProjectStats>>((acc, project) => {
      acc[project.title] = { stars: 0, forks: 0, language: "" };
      return acc;
    }, {}),
  );

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "web") return p.category === "Web Development";
    if (filter === "ai")
      return (
        p.category === "Machine Learning" ||
        p.category === "Natural Language Processing"
      );
    return true;
  });
  const formatNumber = (value: number) =>
    locale === "bn" ? value.toLocaleString("bn-BD") : value.toLocaleString();

  const gridVariants = getGridVariants(reducedMotion);
  const cardVariants = getCardVariants(reducedMotion);
  const metaVariants = getMetaVariants(reducedMotion);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/projects-stats", {
          signal: controller.signal,
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch project stats: ${response.status}`);
        }

        const data = (await response.json()) as Record<string, ProjectStats>;
        setProjectStats((prev) => ({ ...prev, ...data }));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching project stats:", error);
      }
    };

    void fetchStats();

    return () => controller.abort();
  }, []);

  return (
    <Section id="projects" className="relative overflow-hidden">
      <SectionTitle
        badge={copy.projects.badge}
        title={copy.projects.title}
        highlightWord={locale === "bn" ? "প্রজেক্টস" : "Projects"}
        subtitle={copy.projects.subtitle}
      />

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {(["all", "web", "ai"] as const).map((f) => {
          const config = filterConfig[f];
          const Icon = config.icon;

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`group flex items-center gap-2.5 rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base ${
                filter === f
                  ? "bg-ctp-red text-ctp-crust shadow-[0_0_20px_-5px_rgba(237,135,150,0.4)]"
                  : "text-ctp-subtext0 hover:text-ctp-text bg-ctp-surface0/40 hover:bg-ctp-surface0/60"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-300 ${filter === f ? "scale-110" : "group-hover:scale-110"}`}
              />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={gridVariants}
        key={filter}
      >
        {filteredProjects.map((project, index) => {
          const stats = projectStats[project.title];
          const layout = getCardLayout(project, index);
          const resolvedStatus: ProjectStatusKey =
            project.status ?? (project.featured ? "active" : fallbackStatus);
          const status = statusConfig[resolvedStatus];
          const renderedTags =
            project.tags && project.tags.length > 0
              ? project.tags
              : project.techStack.slice(0, 3);

          return (
            <motion.article
              key={project.title}
              variants={cardVariants}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.006,
                      rotateX: layout.prominent ? 1.1 : 0.8,
                      rotateY: layout.prominent ? -1.1 : -0.8,
                    }
              }
              transition={{ duration: reducedMotion ? 0.22 : 0.26, ease }}
              style={{ transformPerspective: 1200 }}
              className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-ctp-surface0/70 bg-ctp-surface0/35 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-ctp-surface1 hover:bg-ctp-surface0/45 ${layout.spanClass}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px ${status.rail}`} />
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full ${status.glow} opacity-0 blur-3xl transition-opacity duration-300 ${
                  reducedMotion ? "" : "group-hover:opacity-100"
                }`}
              />

              {/* Image */}
              <div
                className={`relative overflow-hidden bg-ctp-mantle ${layout.imageClass}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className={`object-cover transition-transform duration-500 ${
                    reducedMotion
                      ? ""
                      : "group-hover:scale-105 group-hover:-translate-y-0.5"
                  }`}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ctp-crust/75 via-ctp-crust/15 to-transparent" />
                {project.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ctp-red/90 px-2 py-0.5 text-xs font-medium text-ctp-crust">
                    <Star className="w-3 h-3 fill-current" />
                    {copy.projects.featuredBadge}
                  </span>
                )}
                {project.highlight && (
                  <span className="absolute bottom-3 left-3 rounded-full border border-ctp-surface1/60 bg-ctp-base/70 px-2.5 py-1 text-[11px] font-medium text-ctp-subtext1 backdrop-blur-sm">
                    {translateDynamicText(locale, project.highlight)}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-2.5 flex items-center justify-between gap-2">
                  <span className="text-xs text-ctp-overlay0 font-mono">
                    {translateDynamicText(locale, project.category)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${status.badge} ${status.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                    />
                    {status.label}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-display font-bold text-ctp-text transition-colors group-hover:text-ctp-red sm:text-[1.2rem]">
                  {project.title}
                  <span className="mt-1 block h-px origin-left scale-x-0 bg-linear-to-r from-ctp-red via-ctp-maroon to-ctp-pink transition-transform duration-300 group-hover:scale-x-100" />
                </h3>

                <p
                  className={`mb-4 flex-1 text-sm leading-relaxed text-ctp-subtext0 ${layout.descClampClass}`}
                >
                  {translateDynamicText(locale, project.description)}
                </p>

                {/* Stats */}
                {stats && (
                  <motion.div
                    variants={metaVariants}
                    className="mb-3 flex items-center gap-3 rounded-lg border border-ctp-surface1/50 bg-ctp-surface0/35 px-3 py-2 text-xs text-ctp-subtext0"
                  >
                    {stats.stars > 0 ? (
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-ctp-red" />
                        {formatNumber(stats.stars)}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <CircleDot className="h-3.5 w-3.5 text-ctp-overlay1" />
                        {copy.projects.liveRepo}
                      </span>
                    )}
                    {stats.forks > 0 && (
                      <span className="flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5 text-ctp-red" />
                        {formatNumber(stats.forks)}
                      </span>
                    )}
                    {stats.downloads != null && stats.downloads > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Download className="h-3.5 w-3.5 text-ctp-maroon" />
                        {formatNumber(stats.downloads)}
                      </span>
                    )}
                    {stats.language && (
                      <span className="ml-auto flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-ctp-maroon" />
                        {stats.language}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Tags */}
                <motion.div
                  variants={metaVariants}
                  className="mb-4 flex flex-wrap gap-1.5"
                >
                  {renderedTags
                    .slice(0, layout.prominent ? 4 : 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-ctp-surface1/30 bg-ctp-surface0/60 px-2 py-0.5 text-xs text-ctp-subtext0"
                      >
                        {tag}
                      </span>
                    ))}
                  {project.techStack.length > (layout.prominent ? 4 : 3) && (
                    <span className="text-xs text-ctp-overlay0">
                      +
                      {formatNumber(
                        project.techStack.length - (layout.prominent ? 4 : 3),
                      )}
                    </span>
                  )}
                </motion.div>

                {/* Links */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex flex-1 items-center justify-center gap-2 rounded-lg border border-ctp-surface1/50 bg-ctp-surface0/50 px-3 py-2 text-sm font-medium text-ctp-text transition-colors hover:bg-ctp-surface0 focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                  >
                    <Github className="h-4 w-4 transition-transform duration-200 group-hover/link:scale-110" />
                    {copy.projects.code}
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/live flex flex-1 items-center justify-center gap-2 rounded-lg bg-ctp-red px-3 py-2 text-sm font-medium text-ctp-crust transition-colors hover:bg-ctp-flamingo focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:scale-105" />
                      {copy.projects.live}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        className="mt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="https://github.com/2ManyFaces"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-ctp-surface0/60 bg-ctp-surface0/30 px-6 py-2.5 text-sm font-medium text-ctp-text transition-colors hover:border-ctp-surface1 focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
        >
          <Github className="h-4 w-4" />
          {copy.projects.viewAllRepos}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </Section>
  );
}



