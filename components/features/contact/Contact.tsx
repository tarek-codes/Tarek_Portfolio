"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Code2,
  Twitter,
  Facebook,
  Instagram,
  Phone,
  CheckCircle2,
  X,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { PERSONAL_INFO } from "@/lib/constants";
import DiscordIcon from "@/components/ui/DiscordIcon";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy, translateDynamicText } from "@/lib/i18n/translations";

const ease = [0.22, 1, 0.36, 1] as const;

const getColumnVariants = (reducedMotion: boolean) => ({
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
      duration: reducedMotion ? 0.28 : 0.48,
      ease,
    },
  },
});

const getGroupVariants = (reducedMotion: boolean) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: reducedMotion ? 0 : 0.06,
      staggerChildren: reducedMotion ? 0.04 : 0.07,
    },
  },
});

const getItemVariants = (reducedMotion: boolean) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 12,
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

const statusVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.18, ease },
  },
};

const socialLinks = [
  { icon: Github, href: PERSONAL_INFO.githubUrl, label: "GitHub" },
  { icon: Linkedin, href: PERSONAL_INFO.linkedinUrl, label: "LinkedIn" },
  { icon: Twitter, href: PERSONAL_INFO.twitterUrl, label: "Twitter" },
  { icon: Facebook, href: PERSONAL_INFO.facebookUrl, label: "Facebook" },
  { icon: Instagram, href: PERSONAL_INFO.instagramUrl, label: "Instagram" },
  { icon: DiscordIcon, href: PERSONAL_INFO.discordUrl, label: "Discord" },
  { icon: Code2, href: PERSONAL_INFO.leetcodeUrl, label: "LeetCode" },
];

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      label: copy.contact.email,
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      id: "phone",
      icon: Phone,
      label: locale === "bn" ? "ফোন" : "Phone",
      value: translateDynamicText(locale, PERSONAL_INFO.phone),
      href: `tel:${PERSONAL_INFO.phone}`,
    },
    {
      id: "location",
      icon: MapPin,
      label: locale === "bn" ? "অবস্থান" : "Location",
      value: translateDynamicText(locale, PERSONAL_INFO.location),
      href: `https://maps.google.com/?q=${encodeURIComponent(PERSONAL_INFO.location)}`,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        if (data.mailtoLink) window.open(data.mailtoLink, "_blank");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="contact" className="relative">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display select-none text-[5rem] font-black uppercase leading-none text-ctp-red/8 opacity-12 sm:text-[8rem] lg:text-[11rem] xl:text-[14rem] mix-blend-overlay">
          CONTACT
        </span>
      </div>

      <SectionTitle
        badge={copy.contact.badge}
        title={copy.contact.title}
        highlightWord={locale === "bn" ? "একসাথে" : "Together"}
        subtitle={copy.contact.subtitle}
      />

      <motion.div
        className="mx-auto mb-8 max-w-5xl"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reducedMotion ? 0.2 : 0.4, ease }}
      >
        <div className="flex items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-medium text-emerald-400">
            Currently available for freelance projects &amp; open-source
            collaboration
          </p>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-12 left-0 h-56 w-56 rounded-full bg-ctp-red/10 opacity-12" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-ctp-maroon/10 opacity-10" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Left: Info & Socials */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={getColumnVariants(reducedMotion)}
        >
          {/* Contact methods */}
          <motion.div
            className="space-y-3"
            variants={getGroupVariants(reducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {contactInfo.map((c) => (
              <motion.a
                key={c.id}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                variants={getItemVariants(reducedMotion)}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.005,
                      }
                }
                transition={{ duration: 0.22, ease }}
                className="group flex items-center gap-4 p-4 rounded-xl border border-ctp-surface0/60 bg-ctp-surface0/30 hover:border-ctp-surface1 hover:bg-ctp-surface0/45 hover:shadow-md hover:shadow-ctp-red/10 transition-[transform,border-color,background-color,box-shadow]"
              >
                <div className="p-2 rounded-lg bg-ctp-red/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <c.icon className="w-5 h-5 text-ctp-red" />
                </div>
                <div>
                  <p className="text-xs text-ctp-overlay0">{c.label}</p>
                  <p className="text-sm font-medium text-ctp-text">{c.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Social links */}
          <div>
            <h4 className="text-sm font-semibold text-ctp-text mb-3">
              {copy.contact.socialProfiles}
            </h4>
            <motion.div
              className="flex flex-wrap gap-2 md:gap-2.5"
              variants={getGroupVariants(reducedMotion)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={getItemVariants(reducedMotion)}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -2,
                          scale: 1.04,
                        }
                  }
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.2, ease }}
                  className="group p-2.5 rounded-lg bg-ctp-surface0/30 border border-ctp-surface0/60 hover:border-ctp-surface1 hover:bg-ctp-surface0/45 hover:shadow-sm hover:shadow-ctp-red/10 transition-[transform,border-color,background-color,box-shadow]"
                  aria-label={s.label}
                  title={s.label}
                >
                  <s.icon className="w-5 h-5 text-ctp-overlay0 group-hover:text-ctp-red transition-colors duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={getColumnVariants(reducedMotion)}
          transition={{ delay: reducedMotion ? 0 : 0.08 }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/30 backdrop-blur-sm p-6 transition-[border-color,box-shadow] hover:border-ctp-surface1 hover:shadow-md hover:shadow-ctp-red/10"
            aria-busy={status === "loading"}
          >
            <h3 className="text-lg font-display font-semibold text-ctp-text flex items-center gap-2 mb-2">
              <Send className="w-4 h-4 text-ctp-red" />
              {copy.contact.sendMessageTitle}
            </h3>

            <div>
              <label
                htmlFor="name"
                className="block text-sm text-ctp-subtext0 mb-1.5"
              >
                {copy.contact.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-overlay1 focus:outline-none focus:ring-2 focus:ring-ctp-red/40 focus:border-ctp-red focus:shadow-[0_0_0_3px_rgba(220,38,38,0.12)] transition-[border-color,box-shadow] text-sm"
                placeholder={copy.contact.namePlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-ctp-subtext0 mb-1.5"
              >
                {copy.contact.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-overlay1 focus:outline-none focus:ring-2 focus:ring-ctp-red/40 focus:border-ctp-red focus:shadow-[0_0_0_3px_rgba(220,38,38,0.12)] transition-[border-color,box-shadow] text-sm"
                placeholder={copy.contact.emailPlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-ctp-subtext0 mb-1.5"
              >
                {copy.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-ctp-base border border-ctp-surface1 rounded-lg text-ctp-text placeholder-ctp-overlay1 focus:outline-none focus:ring-2 focus:ring-ctp-red/40 focus:border-ctp-red focus:shadow-[0_0_0_3px_rgba(220,38,38,0.12)] transition-[border-color,box-shadow] resize-none text-sm"
                placeholder={copy.contact.messagePlaceholder}
              />
            </div>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-2 p-3 bg-ctp-maroon/10 text-ctp-maroon rounded-lg text-sm"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {copy.contact.sent}
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-2 p-3 bg-ctp-red/10 text-ctp-red rounded-lg text-sm"
                  role="status"
                  aria-live="polite"
                >
                  <X className="w-4 h-4" />
                  {copy.contact.sendFailed}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              transition={{ duration: 0.15, ease }}
              className="w-full px-6 py-2.5 bg-ctp-red hover:bg-ctp-flamingo text-ctp-crust font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-ctp-crust border-t-transparent rounded-full animate-spin" />
                  {copy.contact.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {copy.contact.sendMessageButton}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-16 max-w-2xl text-center"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reducedMotion ? 0.25 : 0.5, ease }}
      >
        <div className="relative px-6 py-5 rounded-2xl border border-ctp-surface0/60 bg-ctp-surface0/20 backdrop-blur-sm">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-ctp-surface0/80 bg-ctp-base px-3 py-0.5 text-xs font-display text-ctp-red">
            &ldquo;&rdquo;
          </div>
          <p className="text-sm italic text-ctp-subtext0 leading-relaxed">
            &ldquo;The only way to do great work is to love what you do. If you
            haven&apos;t found it yet, keep looking.&rdquo;
          </p>
          <p className="mt-2 text-xs text-ctp-overlay0">— Steve Jobs</p>
        </div>
      </motion.div>
    </Section>
  );
}
