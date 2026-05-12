"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import ServicesSection from "../../components/home/ServicesSection";
import Methodology from "../../components/home/Methodology";

export default function ServicesPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.services}
        subtitle={t.servicesPage.subtitle}
        backgroundImages={["/images/bg_services.png", "/images/bg_services2.png"]}
      />
      
      <div className="bg-white">
        <ServicesSection />
        <Methodology />
      </div>
    </>
  );
}
