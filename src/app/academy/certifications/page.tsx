"use client";

import React from "react";
import AcademyCertifications from "../../../components/academy/AcademyCertifications";
import PageHero from "../../../components/ui/PageHero";
import { useLanguage } from "../../../context/LanguageContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CertificationsPage() {
  const { t, locale } = useLanguage();

  return (
    <>
      <PageHero 
        title={locale === "fr" ? "Nos Certifications" : "Our Certifications"}
        subtitle={locale === "fr" 
          ? "Découvrez l'ensemble de nos programmes certifiants conçus pour booster votre carrière." 
          : "Discover all our certification programs designed to boost your career."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
        ]}
      />
      
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 -mt-12 relative z-20">
          <Link 
            href="/academy"
            className="inline-flex items-center text-dark/60 hover:text-primary font-bold text-sm uppercase tracking-widest transition-all gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-primary/5"
          >
            <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
          </Link>
        </div>
        
        <AcademyCertifications />
      </div>
    </>
  );
}
