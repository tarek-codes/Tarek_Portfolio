"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { navigation } from "@/components/shared/Header";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PERSONAL_INFO } from "@/lib/constants";
import { getCopy } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

const getContainerVariants = (reducedMotion: boolean) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.25 : 0.45,
      ease,
      staggerChildren: reducedMotion ? 0.03 : 0.06,
      delayChildren: reducedMotion ? 0 : 0.04,
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease,
    },
  },
};

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);
  const currentYear = new Date().getFullYear();
  const quickLinks = navigation;

  return (
    <footer className="pb-20 md:pb-0">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={getContainerVariants(reducedMotion)}
      >
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-6"
        >
          <div className="flex flex-col gap-4">
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
            >
              <p className="text-center text-base text-ctp-subtext0 lg:text-left">
                &copy; {currentYear} Tarek Alam Bhuiyan
              </p>

              <nav
                aria-label="Footer quick links"
                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
              >
                {quickLinks.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    variants={itemVariants}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            y: -1,
                          }
                    }
                    transition={{ duration: 0.2, ease }}
                    className="group text-base text-ctp-subtext0 transition-colors hover:text-ctp-text font-medium"
                  >
                    {copy.nav[item.key]}
                    <span className="mt-1 block h-px origin-left scale-x-0 bg-ctp-red transition-transform duration-300 group-hover:scale-x-100" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="h-px w-full bg-ctp-surface0/60"
            />

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <motion.a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -2,
                          scale: 1.04,
                        }
                  }
                  whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.2, ease }}
                  className="rounded-lg border border-ctp-surface0/60 bg-ctp-surface0/30 p-2.5 text-ctp-subtext0 transition-colors hover:border-ctp-surface1 hover:text-ctp-text"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -2,
                          scale: 1.04,
                        }
                  }
                  whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.2, ease }}
                  className="rounded-lg border border-ctp-surface0/60 bg-ctp-surface0/30 p-2.5 text-ctp-subtext0 transition-colors hover:border-ctp-surface1 hover:text-ctp-text"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -2,
                          scale: 1.04,
                        }
                  }
                  whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.2, ease }}
                  className="rounded-lg border border-ctp-surface0/60 bg-ctp-surface0/30 p-2.5 text-ctp-subtext0 transition-colors hover:border-ctp-surface1 hover:text-ctp-text"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>

              <p className="text-center text-sm text-ctp-overlay0 sm:text-right">
                {copy.footer.builtWith}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
