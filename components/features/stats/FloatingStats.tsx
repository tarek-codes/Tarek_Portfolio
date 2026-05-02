"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Code2,
  TrendingUp,
  Award,
  Target,
  X,
  ExternalLink,
  Trophy,
} from "lucide-react";
import { getCodeforcesUser, type CodeforcesUser } from "@/lib/api/codeforces";
import { getLeetCodeStats, type LeetCodeStats } from "@/lib/api/leetcode";
import { PERSONAL_INFO } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy } from "@/lib/i18n/translations";

export default function FloatingStats() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [codeforcesData, setCodeforcesData] = useState<CodeforcesUser | null>(
    null,
  );
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const simplifyMotion = reducedMotion || isMobile;
  const { locale } = useLanguage();
  const copy = getCopy(locale);

  const ease = [0.22, 1, 0.36, 1] as const;
  const springTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 22,
  };

  const codeforcesStats = [
    {
      icon: TrendingUp,
      label: copy.stats.rating,
      value: codeforcesData?.rating || 0,
      color: "text-ctp-red",
    },
    {
      icon: Award,
      label: copy.stats.maxRating,
      value: codeforcesData?.maxRating || 0,
      color: "text-ctp-red",
    },
    {
      icon: Trophy,
      label: copy.stats.rank,
      value: codeforcesData?.rank || copy.stats.unrated,
      color: "text-ctp-maroon",
    },
    {
      icon: Target,
      label: copy.stats.maxRank,
      value: codeforcesData?.maxRank || copy.stats.unrated,
      color: "text-ctp-maroon",
    },
  ];

  const leetCodeStatsCards = [
    {
      icon: Code2,
      label: copy.stats.solved,
      value: leetcodeData?.totalSolved || 0,
      color: "text-ctp-red",
    },
    {
      icon: Trophy,
      label: copy.stats.ranking,
      value: leetcodeData?.ranking
        ? `#${leetcodeData.ranking.toLocaleString()}`
        : "N/A",
      color: "text-ctp-red",
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  useEffect(() => {
    if (!isExpanded || hasFetched) return;

    let isActive = true;
    async function fetchData() {
      setLoading(true);
      try {
        const [codeforces, leetcode] = await Promise.all([
          getCodeforcesUser(PERSONAL_INFO.codeforcesHandle),
          getLeetCodeStats(PERSONAL_INFO.leetcodeHandle),
        ]);
        if (!isActive) return;
        setCodeforcesData(codeforces);
        setLeetcodeData(leetcode);
      } catch (error) {
        console.error("Error fetching competitive programming data:", error);
      } finally {
        if (isActive) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    }

    void fetchData();

    return () => {
      isActive = false;
    };
  }, [hasFetched, isExpanded]);

  return (
    <>
      {/* Floating Button — clears mobile bottom nav */}
      <motion.div
        className="fixed bottom-24 right-4 z-40 -translate-y-16 lg:bottom-7 lg:right-6"
        initial={
          reducedMotion ? { opacity: 0 } : { scale: 0.88, opacity: 0, y: 10 }
        }
        animate={
          reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }
        }
        transition={
          reducedMotion
            ? { duration: 0.2, ease }
            : { ...springTransition, delay: 1.05 }
        }
      >
        <AnimatePresence>
          {!isExpanded && (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="group relative rounded-full border border-ctp-surface0/60 bg-ctp-base/60 p-3 text-ctp-red shadow-lg shadow-ctp-crust/25 backdrop-blur-xl transition-colors hover:border-ctp-surface1 hover:bg-ctp-base/75"
              exit={{ scale: 0, opacity: 0 }}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.05 }}
              whileTap={reducedMotion ? { scale: 1 } : { scale: 0.94 }}
              transition={springTransition}
              aria-label={copy.stats.openStatsAria}
            >
              <Code2 className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Stats Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ctp-crust/55 backdrop-blur-[1px] md:backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              onClick={() => setIsExpanded(false)}
            />

            <motion.div
              className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-md max-h-[70vh] overflow-y-auto overscroll-contain rounded-2xl border border-ctp-surface0/60 bg-ctp-base/88 p-4 shadow-2xl shadow-ctp-crust/35 backdrop-blur-md sm:p-5 md:bottom-24 md:right-4 md:left-auto md:max-h-[70vh] md:w-[calc(100vw-1rem)] md:max-w-2xl lg:bottom-7 lg:right-6 lg:backdrop-blur-xl"
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, y: 18 }
              }
              animate={
                reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: 14 }
              }
              transition={{ duration: 0.28, ease }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-ctp-red/10 rounded-lg">
                    <Code2 className="w-5 h-5 text-ctp-red" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-ctp-text">
                      {copy.stats.heading}
                    </h3>
                    <p className="text-xs text-ctp-overlay0">
                      {copy.stats.liveStats}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 hover:bg-ctp-surface0/60 rounded-lg transition-colors"
                  aria-label={copy.stats.closeStatsAria}
                >
                  <X className="w-4 h-4 text-ctp-overlay0" />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-6 text-ctp-overlay0 text-sm">
                  <div className="w-8 h-8 border-2 border-ctp-surface1 border-t-ctp-red rounded-full mx-auto mb-2 animate-spin" />
                  {copy.stats.loading}
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Codeforces */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-ctp-text">
                        Codeforces
                      </h4>
                      <a
                        href={PERSONAL_INFO.codeforcesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ctp-red hover:text-ctp-flamingo transition-colors flex items-center gap-1"
                      >
                        {copy.stats.profile}{" "}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {codeforcesStats.map((s, index) => (
                        <motion.div
                          key={s.label}
                          initial={
                            simplifyMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 8 }
                          }
                          animate={
                            simplifyMotion
                              ? { opacity: 1 }
                              : { opacity: 1, y: 0 }
                          }
                          transition={{
                            duration: 0.2,
                            ease,
                            delay: simplifyMotion ? 0 : index * 0.04,
                          }}
                          className="rounded-lg p-2.5 bg-ctp-surface0/30 border border-ctp-surface0/60"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                            <span className="text-[11px] text-ctp-overlay0">
                              {s.label}
                            </span>
                          </div>
                          <p className="text-sm font-display font-bold text-ctp-text capitalize">
                            {s.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* LeetCode */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-ctp-text">
                        LeetCode
                      </h4>
                      <a
                        href={PERSONAL_INFO.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-ctp-red hover:text-ctp-flamingo transition-colors flex items-center gap-1"
                      >
                        {copy.stats.profile}{" "}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {leetCodeStatsCards.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={
                            simplifyMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 8 }
                          }
                          animate={
                            simplifyMotion
                              ? { opacity: 1 }
                              : { opacity: 1, y: 0 }
                          }
                          transition={{
                            duration: 0.2,
                            ease,
                            delay: simplifyMotion ? 0 : 0.14 + index * 0.05,
                          }}
                          className="rounded-lg border border-ctp-surface0/60 bg-ctp-surface0/30 p-3"
                        >
                          <div className="mb-1 flex items-center gap-1.5">
                            <item.icon
                              className={`h-3.5 w-3.5 ${item.color}`}
                            />
                            <span className="text-xs text-ctp-overlay0">
                              {item.label}
                            </span>
                          </div>
                          <p className="text-lg font-display font-bold text-ctp-text">
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}



