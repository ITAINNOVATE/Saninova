"use client";

import React, { useState } from "react";
import { Megaphone, Calendar, Tag, ArrowRight, Search, Bell, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import PageHero from "../../../components/ui/PageHero";

export default function AcademyAnnouncements() {
  const router = useRouter();
  const { locale } = useLanguage();
  const [activeType, setActiveType] = useState("all");

  const announcements = [
    {
      id: "1",
      title: "Appel à candidatures : Bourses d'excellence SaniNova 2026",
      type: "Appel",
      date: "10 Mai 2026",
      deadline: "30 Mai 2026",
      content: "SaniNova Academy offre 5 bourses complètes pour les jeunes professionnels de santé souhaitant se spécialiser en Santé Digitale.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
      status: "Ouvert"
    },
    {
      id: "2",
      title: "Webinaire Gratuit : L'IA dans la régulation pharmaceutique",
      type: "Webinaire",
      date: "25 Mai 2026",
      deadline: "24 Mai 2026",
      content: "Rejoignez nos experts pour une session interactive sur les nouvelles frontières de l'intelligence artificielle appliquée au secteur pharma.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
      status: "Bientôt"
    },
    {
      id: "3",
      title: "Conférence Annuelle SaniNova : Horizon Santé 2030",
      type: "Conférence",
      date: "15 Mai 2026",
      deadline: "10 Juin 2026",
      content: "La conférence de référence sur la transformation des systèmes de santé se tiendra à Cotonou et en ligne.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      status: "Annonce"
    }
  ];

  const types = ["all", "Appel", "Webinaire", "Conférence", "Annonce"];

  const filtered = activeType === "all" ? announcements : announcements.filter(a => a.type === activeType);

  return (
    <>
      <PageHero 
        title={locale === "fr" ? "Actualités & Appels" : "News & Calls"}
        subtitle={locale === "fr" ? "Restez informé des opportunités de la SaniNova Academy." : "Stay informed about SaniNova Academy opportunities."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1454165833767-027ffea7025c?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <div className="mb-8">
            <Link 
              href="/academy"
              className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
            </Link>
          </div>
          {/* Header (Simplified since PageHero handles title) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs tracking-widest uppercase mb-4">
                <Megaphone className="w-4 h-4 mr-2" /> Academy Insights
              </span>
            </div>
            
            <button className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all">
              <Bell className="w-5 h-5 text-orange" /> S'abonner aux alertes
            </button>
          </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeType === type ? "bg-orange text-white shadow-lg shadow-orange/20" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}
            >
              {type === "all" ? "Toutes les annonces" : type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((announcement, i) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#0F1D33] rounded-[40px] overflow-hidden border border-white/5 flex flex-col h-full hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={announcement.image} 
                  alt={announcement.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {announcement.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-wider mb-4">
                  <Calendar className="w-4 h-4" /> {announcement.date}
                </div>
                <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                  {announcement.title}
                </h3>
                <p className="text-white/50 text-sm font-poppins mb-8 line-clamp-3 leading-relaxed">
                  {announcement.content}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Deadline</span>
                    <span className="text-orange font-black text-sm">{announcement.deadline}</span>
                  </div>
                  <Link 
                    href={`/academy/announcements/${announcement.id}`}
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white flex items-center justify-center hover:bg-orange transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
