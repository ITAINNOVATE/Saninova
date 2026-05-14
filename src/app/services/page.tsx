"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import ServicesSection from "../../components/home/ServicesSection";
import Methodology from "../../components/home/Methodology";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.services}
        subtitle={t.servicesPage.subtitle}
        backgroundImages={["/images/bg_services.png", "/images/bg_services2.png"]}
      />
      
      <div className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-12 relative z-20 mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-dark/40 hover:text-primary font-bold text-sm uppercase tracking-widest transition-all gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
          </Link>
        </div>
        <ServicesSection />
        <Methodology />
      </div>
    </>
  );
}
