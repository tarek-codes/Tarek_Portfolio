"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  resolveLocale,
  type Locale,
} from "@/lib/i18n/translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const persistLocaleCookie = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

const applyLocaleToDocument = (locale: Locale) => {
  const root = document.documentElement;
  root.lang = locale;

  if (locale === "bn") {
    root.classList.add("locale-bn");
  } else {
    root.classList.remove("locale-bn");
  }
};

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: string;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    resolveLocale(initialLocale ?? DEFAULT_LOCALE),
  );

  useEffect(() => {
    applyLocaleToDocument(locale);
    persistLocaleCookie(locale);
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
  };

  const toggleLocale = () => {
    setLocaleState((current) => (current === "en" ? "bn" : "en"));
  };

  const value = useMemo(() => ({ locale, setLocale, toggleLocale }), [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    return {
      locale: DEFAULT_LOCALE as Locale,
      setLocale: () => {},
      toggleLocale: () => {},
    };
  }

  return context;
}



