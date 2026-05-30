"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import ExpertisesDetails from "../../components/home/ExpertisesDetails";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ExpertForm from "../../components/expertises/ExpertForm";

export default function ExpertisesPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.expertises}
        subtitle={t.expertises.title}
        backgroundImages={["/images/bg_expertises.png", "/images/bg_expertises2.png"]}
      />
      
      <div className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-12 relative z-20 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link 
            href="/"
            className="inline-flex items-center text-dark/40 hover:text-primary font-bold text-sm uppercase tracking-widest transition-all gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
          </Link>
          
          <button 
            onClick={() => {
              document.getElementById('expert-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-orange hover:bg-[#d95c00] text-white font-poppins font-bold rounded-full shadow-lg shadow-orange/30 transition-all text-sm uppercase tracking-wider"
          >
            Rejoignez nos Experts
          </button>
        </div>
        <ExpertisesDetails />
        <ExpertForm />
      </div>
    </>
  );
}
