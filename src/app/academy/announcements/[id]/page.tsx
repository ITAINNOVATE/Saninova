"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Megaphone, Calendar, Clock, ArrowLeft, Share2, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "../../../../components/ui/PageHero";
import { useLanguage } from "../../../../context/LanguageContext";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const { locale } = useLanguage();
  const router = useRouter();

  // Mock data matching the list
  const announcements = [
    {
      id: "1",
      title: locale === "fr" ? "Appel à candidatures : Bourses d'excellence SaniNova 2026" : "Call for Applications: SaniNova Excellence Scholarships 2026",
      type: locale === "fr" ? "Appel" : "Call",
      date: "10 Mai 2026",
      deadline: "30 Mai 2026",
      content: locale === "fr" 
        ? "SaniNova Academy offre 5 bourses complètes pour les jeunes professionnels de santé souhaitant se spécialiser en Santé Digitale. Ce programme vise à soutenir l'émergence d'une nouvelle génération de leaders capables de piloter la transformation numérique des systèmes de santé africains."
        : "SaniNova Academy is offering 5 full scholarships for young health professionals wishing to specialize in Digital Health. This program aims to support the emergence of a new generation of leaders capable of steering the digital transformation of African health systems.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
      status: "Ouvert",
      fullContent: locale === "fr"
        ? "Le programme de bourses d'excellence SaniNova est conçu pour identifier et soutenir les talents les plus prometteurs du secteur de la santé en Afrique. \n\nLes candidats sélectionnés bénéficieront d'une prise en charge totale des frais de scolarité pour le programme de certification en Santé Digitale, ainsi que d'un mentorat personnalisé par des experts internationaux. \n\nCritères d'éligibilité : \n- Être ressortissant d'un pays africain. \n- Avoir au moins 2 ans d'expérience professionnelle dans le secteur de la santé. \n- Démontrer un engagement fort pour l'innovation technologique."
        : "The SaniNova Excellence Scholarship program is designed to identify and support the most promising healthcare talents in Africa. \n\nSelected candidates will benefit from full tuition coverage for the Digital Health certification program, as well as personalized mentoring from international experts. \n\nEligibility Criteria: \n- Be a citizen of an African country. \n- Have at least 2 years of professional experience in the healthcare sector. \n- Demonstrate a strong commitment to technological innovation."
    },
    {
      id: "2",
      title: locale === "fr" ? "Webinaire Gratuit : L'IA dans la régulation pharmaceutique" : "Free Webinar: AI in Pharmaceutical Regulation",
      type: locale === "fr" ? "Webinaire" : "Webinar",
      date: "25 Mai 2026",
      deadline: "24 Mai 2026",
      content: "Rejoignez nos experts pour une session interactive sur les nouvelles frontières de l'intelligence artificielle appliquée au secteur pharma.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
      status: "Bientôt",
      fullContent: "Ce webinaire explorera comment l'intelligence artificielle transforme les processus de régulation pharmaceutique, de l'homologation des médicaments à la pharmacovigilance."
    },
    {
      id: "3",
      title: locale === "fr" ? "Conférence Annuelle SaniNova : Horizon Santé 2030" : "SaniNova Annual Conference: Horizon Health 2030",
      type: locale === "fr" ? "Conférence" : "Conference",
      date: "15 Mai 2026",
      deadline: "10 Juin 2026",
      content: "La conférence de référence sur la transformation des systèmes de santé se tiendra à Cotonou et en ligne.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      status: "Annonce",
      fullContent: "La Conférence Horizon Santé 2030 est l'événement phare de l'année pour tous les acteurs de la santé en Afrique. Pendant trois jours, nous discuterons des stratégies pour atteindre la couverture santé universelle grâce à l'innovation."
    }
  ];

  const announcement = announcements.find(a => a.id === id);

  if (!announcement) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-xl opacity-60 mb-8">Annonce non trouvée</p>
        <Link href="/academy/announcements" className="px-8 py-3 bg-orange rounded-full font-bold">
          Retour aux annonces
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero 
        title={announcement.type}
        subtitle={announcement.title}
        backgroundImages={[announcement.image]}
      />
      
      <div className="bg-dark pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F1D33] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
          >
            {/* Action Bar */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold text-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Retour
              </button>
              
              <div className="flex items-center gap-3">
                <button className="p-3 bg-white/5 rounded-2xl text-white/50 hover:text-white transition-all border border-white/5">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-2xl font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-all">
                  <Bell className="w-4 h-4" /> S'abonner
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-16">
              <div className="flex items-center gap-6 mb-8 text-white/40 text-sm font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" /> {announcement.date}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange" /> Deadline: {announcement.deadline}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-8 leading-tight">
                {announcement.title}
              </h1>

              <div className="prose prose-invert max-w-none prose-lg">
                <p className="text-white/60 leading-relaxed whitespace-pre-wrap font-poppins">
                  {announcement.fullContent}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Statut actuel</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white font-black uppercase tracking-wider text-sm">{announcement.status}</span>
                  </div>
                </div>
                
                {announcement.type === "Appel" && (
                  <button className="px-8 py-4 bg-accent text-white rounded-2xl font-black shadow-xl shadow-accent/20 hover:scale-105 transition-all">
                    Postuler maintenant
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
