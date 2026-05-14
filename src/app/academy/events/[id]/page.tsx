"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Users, Video } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "../../../../components/ui/PageHero";
import { useLanguage } from "../../../../context/LanguageContext";

export default function EventDetail() {
  const { id } = useParams();
  const { locale } = useLanguage();
  const router = useRouter();

  // Mock data matching the list
  const events = [
    {
      id: "1",
      title: locale === "fr" ? "Symposium Africain sur la Santé Digitale" : "African Digital Health Symposium",
      date: "12 Juin 2026",
      time: "09:00 - 18:00",
      venue: "Palais des Congrès, Cotonou",
      type: "Présentiel",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80",
      description: locale === "fr" 
        ? "Le Symposium Africain sur la Santé Digitale est le plus grand rassemblement d'experts en e-santé du continent."
        : "The African Digital Health Symposium is the largest gathering of e-health experts on the continent."
    },
    {
      id: "2",
      title: "Masterclass : Financement Innovant de la Santé",
      date: "22 Juin 2026",
      time: "15:00 - 17:00",
      venue: "Plateforme Zoom Academy",
      type: "En ligne",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
      description: "Une session intensive pour comprendre les nouveaux mécanismes de financement de la santé."
    },
    {
      id: "3",
      title: "Dîner de Gala : Réseau des Leaders de Santé",
      date: "05 Juillet 2026",
      time: "19:00 - 22:00",
      venue: "Novotel, Cotonou",
      type: "Présentiel",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
      description: "Une soirée de networking exclusive pour les décideurs du secteur de la santé."
    }
  ];

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-xl opacity-60 mb-8">Événement non trouvé</p>
        <Link href="/academy/events" className="px-8 py-3 bg-orange rounded-full font-bold">
          Retour aux événements
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero 
        title={event.type}
        subtitle={event.title}
        backgroundImages={[event.image]}
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
                <button className="flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-2xl font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-all">
                  Participer
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-16">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Date</p>
                    <p className="font-bold">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-2xl bg-orange/20 flex items-center justify-center text-orange">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Heure</p>
                    <p className="font-bold">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    {event.type === "En ligne" ? <Video className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Lieu</p>
                    <p className="font-bold">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Type</p>
                    <p className="font-bold">{event.type}</p>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-8 leading-tight">
                {event.title}
              </h1>

              <div className="prose prose-invert max-w-none prose-lg">
                <p className="text-white/60 leading-relaxed font-poppins">
                  {event.description}
                </p>
                <p className="text-white/60 leading-relaxed font-poppins mt-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="mt-12">
                 <button className="w-full py-5 bg-white text-dark rounded-[20px] font-black text-lg shadow-2xl hover:bg-orange hover:text-white transition-all">
                   Réserver ma place
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
