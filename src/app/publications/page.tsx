"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import Publications from "../../components/home/Publications";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PublicationSubmissionForm from "../../components/publications/PublicationSubmissionForm";

export default function PublicationsPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHero 
        title={t.nav.publications}
        subtitle={t.publications.subtitle}
        backgroundImages={["/images/bg_publications.png", "/images/bg_publications2.png"]}
      >
        <button 
          onClick={() => {
            document.getElementById('soumettre-publication')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 bg-orange text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center group transition-all hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          Soumettre une publication
        </button>
      </PageHero>
      
      <div className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-12 relative z-20 mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-dark/40 hover:text-primary font-bold text-sm uppercase tracking-widest transition-all gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
          </Link>
        </div>
        <Publications />
      </div>
      <PublicationSubmissionForm />
    </>
  );
}
