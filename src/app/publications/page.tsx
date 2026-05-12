"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import Publications from "../../components/home/Publications";

export default function PublicationsPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.publications}
        subtitle={t.publications.subtitle}
        backgroundImage="/images/bg_publications.png"
      />
      
      <div className="bg-white">
        <Publications />
      </div>
    </>
  );
}
