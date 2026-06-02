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
import { motion } from "framer-motion";
import { Megaphone, ArrowRight, Laptop, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
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

      {/* eLearning Platform Showcase Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-dark to-[#081225]">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange/10 blur-[130px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-primary/5 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[48px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange/10 to-transparent rounded-full pointer-events-none -translate-y-1/3 translate-x-1/3" />

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left content column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/15 border border-orange/20 rounded-full text-orange font-bold text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" /> NOUVEAUTÉ • PLATEFORME E-LEARNING
                </div>

                <h2 className="text-3xl md:text-5xl font-montserrat font-black text-white leading-tight">
                  Apprenez à votre rythme avec l'espace SaniNova eLearning
                </h2>

                <p className="text-white/60 font-poppins text-base md:text-lg leading-relaxed">
                  Notre académie d'excellence franchit un nouveau cap. Accédez dès aujourd'hui à notre lecteur de cours interactif (LMS), évaluez vos acquis grâce à nos quiz dynamiques et téléchargez vos diplômes officiels certifiés SaniNova.
                </p>

                {/* Grid of features */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Lecteur LMS Haute Définition</h4>
                      <p className="text-white/40 text-xs leading-relaxed">Syllabus fluide, leçons riches en Markdown et ressources de cours téléchargeables.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Quiz Évaluatifs Interactifs</h4>
                      <p className="text-white/40 text-xs leading-relaxed">Questions à choix multiples avec explications détaillées immédiates.</p>
                    </div>
                  </div>
                </div>

                {/* Highlight benefits */}
                <div className="space-y-3 pt-2">
                  {[
                    "Formations professionnelles 100% asynchrones et flexibles",
                    "Générateur automatique de certificat de réussite certifié",
                    "Diplômes haut de gamme optimisés pour le partage sur LinkedIn",
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-white/80 font-bold text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right CTA column */}
              <div className="lg:col-span-5 bg-[#0F1D33]/60 border border-white/5 p-8 rounded-[36px] shadow-2xl relative flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange rounded-3xl flex items-center justify-center text-white shadow-xl mb-6">
                  <Laptop className="w-10 h-10" />
                </div>

                <h3 className="text-white font-montserrat font-extrabold text-xl mb-3">
                  Votre portail apprenant est ouvert !
                </h3>

                <p className="text-white/40 text-xs leading-relaxed mb-8">
                  Connectez-vous dès maintenant pour démarrer vos modules, suivre votre progression et valider vos compétences clés en santé publique et logistique médicale.
                </p>

                <Link
                  href="/academy/portal"
                  className="w-full py-4.5 bg-orange text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 group hover:shadow-[0_0_25px_rgba(255,122,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Accéder à mon Espace eLearning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
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
              className="px-10 py-4 bg-transparent border-2 border-orange text-orange rounded-full font-bold text-lg shadow-xl hover:bg-orange hover:text-white hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all"
            >
              {t.academy.ctaRegister}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
