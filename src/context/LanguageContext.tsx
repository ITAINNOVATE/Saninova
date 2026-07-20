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

// Deep merge helper to merge database dynamic translations with static fallback
const deepMerge = (target: any, source: any): any => {
  if (!source) return target;
  const output = { ...target };
  
  for (const key of Object.keys(source)) {
    // Forcer le code source statique pour les sections de l'équipe et du directeur
    if (key === 'director' || key === 'leadership') {
      output[key] = target[key];
      continue;
    }

    // If the static (target) value is an array, always prefer the static version
    // This prevents Supabase from overwriting lists (e.g. servicesPage.list)
    if (Array.isArray(target[key])) {
      output[key] = target[key];
    } else if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    } else {
      output[key] = source[key];
    }
  }
  return output;
};

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
        // Deep merge with static fallback to avoid missing-key crashes or label disappearances
        setActiveTranslations({
          fr: deepMerge(translations.fr, data.translations_fr),
          en: deepMerge(translations.en, data.translations_en),
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

    // 3. Subscribe to Realtime changes on saninova_site_settings
    const channel = supabase
      .channel("saninova_site_settings_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "saninova_site_settings",
          filter: "id=eq.1",
        },
        (payload: any) => {
          if (payload.new) {
            setActiveTranslations({
              fr: deepMerge(translations.fr, payload.new.translations_fr),
              en: deepMerge(translations.en, payload.new.translations_en),
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
