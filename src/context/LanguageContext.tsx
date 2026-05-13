"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale } from "../lib/translations";
import { supabase } from "../lib/supabase";

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.fr;
  refreshTranslations: () => Promise<void>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [activeTranslations, setActiveTranslations] = useState(translations);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDynamicTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from("saninova_site_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data) {
        // Merge with static fallback to avoid missing-key crashes
        setActiveTranslations({
          fr: { ...translations.fr, ...data.translations_fr },
          en: { ...translations.en, ...data.translations_en },
        });
      }
    } catch (err) {
      console.warn("Using static fallback translations due to fetch failure:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Load locale
    const savedLocale = localStorage.getItem("saninova-locale") as Locale;
    if (savedLocale === "fr" || savedLocale === "en") {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
      }
    }

    // 2. Load dynamic translations
    fetchDynamicTranslations();
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("saninova-locale", newLocale);
  };

  const t = activeTranslations[locale] || translations[locale];

  return (
    <LanguageContext.Provider 
      value={{ 
        locale, 
        setLocale, 
        t, 
        refreshTranslations: fetchDynamicTranslations,
        isLoading
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
