"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import AboutDetails from "../../components/home/AboutDetails";
import DirectorSection from "../../components/home/DirectorSection";
import TeamSection from "../../components/home/TeamSection";
import Advantages from "../../components/home/Advantages";

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.about}
        subtitle={t.aboutSection.title}
        backgroundImages={["/images/bg_about.png", "/images/bg_about2.png"]}
      />
      
      <div className="bg-white">
        <AboutDetails />
        <DirectorSection />
        <TeamSection />
        <Advantages />
      </div>
    </>
  );
}
