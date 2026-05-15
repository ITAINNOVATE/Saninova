"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import AcademyHero from "../../components/academy/AcademyHero";
import AcademyStats from "../../components/academy/AcademyStats";
import AcademyVision from "../../components/academy/AcademyVision";
import AcademyOffer from "../../components/academy/AcademyOffer";
import PedagogicalModel from "../../components/academy/PedagogicalModel";
import AcademyCertifications from "../../components/academy/AcademyCertifications";
import FeaturedTrainings from "../../components/academy/FeaturedTrainings";
import WhyAcademy from "../../components/academy/WhyAcademy";
import AcademyTestimonials from "../../components/academy/AcademyTestimonials";
import AcademyFAQ from "../../components/academy/AcademyFAQ";
import { motion } from "framer-motion";
import { Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AcademyLanding() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      <AcademyHero />
      <AcademyStats />
      
      {/* New Strategic Sections */}
      <AcademyVision />
      <AcademyOffer />
      <PedagogicalModel />
      
      <section className="py-20 bg-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-orange font-bold tracking-wider text-sm uppercase mb-3 block">
                {t.academy.nav.trainings}
              </span>
              <h2 className="text-3xl md:text-4xl font-montserrat font-extrabold text-white leading-tight">
                Nos formations à venir
              </h2>
            </div>
            <a 
              href="/academy/trainings" 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 font-semibold"
            >
              Voir tout le catalogue
            </a>
          </div>
          <FeaturedTrainings />
          
          <div className="mt-16 text-center">
            <Link 
              href="/academy/announcements"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange/10 border border-orange/20 text-orange rounded-full font-bold hover:bg-orange hover:text-white transition-all group"
            >
              <Megaphone className="w-5 h-5" />
              Voir toutes les annonces & appels
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <AcademyCertifications />

      <WhyAcademy />
      <AcademyTestimonials />
      <AcademyFAQ />

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-8">
            Prêt à transformer votre carrière et l'avenir de la santé ?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/academy/trainings" 
              className="px-10 py-4 bg-orange text-white rounded-full font-bold text-lg shadow-xl shadow-orange/20 hover:scale-105 active:scale-95 transition-all"
            >
              {t.academy.ctaTrainings}
            </a>
            <a 
              href="/academy/register" 
              className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              {t.academy.ctaRegister}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
