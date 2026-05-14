"use client";

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, MapPin, 
  Clock, LayoutGrid, List, Search,
  ChevronLeft, ChevronRight, Video
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import PageHero from "../../../components/ui/PageHero";

export default function AcademyEvents() {
  const { locale } = useLanguage();
  const [viewMode, setViewMode] = useState("grid");

  const events = [
    {
      id: "1",
      title: "Symposium Africain sur la Santé Digitale",
      date: "12 Juin 2026",
      time: "09:00 - 18:00",
      venue: "Palais des Congrès, Cotonou",
      type: "Présentiel",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80"
    },
    {
      id: "2",
      title: "Masterclass : Financement Innovant de la Santé",
      date: "22 Juin 2026",
      time: "15:00 - 17:00",
      venue: "Plateforme Zoom Academy",
      type: "En ligne",
      image: "https://images.unsplash.com/photo-1591115765373-520b7a0271d7?auto=format&fit=crop&q=80"
    },
    {
      id: "3",
      title: "Dîner de Gala : Réseau des Leaders de Santé",
      date: "05 Juillet 2026",
      time: "19:00 - 22:00",
      venue: "Novotel, Cotonou",
      type: "Présentiel",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <>
      <PageHero 
        title={locale === "fr" ? "Événements" : "Events"}
        subtitle={locale === "fr" ? "Rejoignez nos symposiums et ateliers pour échanger avec les leaders." : "Join our symposiums and workshops to connect with leaders."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1475721027187-4024733923f9?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="text-center md:text-left">
              <span className="text-orange font-bold uppercase tracking-widest text-sm mb-2 block">SaniNova Academy Events</span>
            </div>
            
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-orange text-white shadow-lg" : "text-white/40 hover:text-white"}`}
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-orange text-white shadow-lg" : "text-white/40 hover:text-white"}`}
              >
                <List className="w-6 h-6" />
              </button>
            </div>
          </div>

        {/* View Content */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#0F1D33] rounded-[40px] overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${event.type === "En ligne" ? "bg-indigo-600 text-white" : "bg-accent text-white"}`}>
                      {event.type === "En ligne" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <span className="text-orange font-black text-xl leading-none">{event.date.split(' ')[0]}</span>
                      <span className="text-white/40 text-[10px] font-bold uppercase">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {event.time}
                      </p>
                      <h3 className="text-white font-bold text-xl line-clamp-1 group-hover:text-orange transition-colors">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-white/50 text-sm font-medium mb-8">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                  <button className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-dark rounded-2xl font-black transition-all border border-white/10">
                    S'inscrire
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#0F1D33] rounded-[32px] p-6 border border-white/5 flex flex-col md:flex-row items-center gap-8 hover:bg-white/10 transition-all"
              >
                <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-orange font-black text-sm uppercase tracking-widest">{event.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{event.time}</span>
                  </div>
                  <h3 className="text-white font-montserrat font-black text-2xl mb-2">{event.title}</h3>
                  <p className="text-white/50 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" /> {event.venue}
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                  <button className="w-full md:w-auto px-8 py-4 bg-orange text-white rounded-2xl font-black shadow-lg shadow-orange/20 hover:scale-105 transition-all">
                    S'inscrire
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  </>
);
}
