"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import ExpertisesDetails from "../../components/home/ExpertisesDetails";

export default function ExpertisesPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.expertises}
        subtitle={t.expertises.title}
        backgroundImage="/images/bg_expertises.png"
      />
      
      <div className="bg-white">
        <ExpertisesDetails />
      </div>
    </>
  );
}
