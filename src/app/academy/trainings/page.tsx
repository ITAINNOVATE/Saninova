"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { Search, Filter, Calendar, MapPin, ArrowRight, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "../../../components/ui/PageHero";
import { supabase } from "../../../lib/supabase";

export default function TrainingsCatalog() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFormat, setActiveFormat] = useState("all");
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchTrainings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("academy_trainings")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data) setTrainings(data);
      setLoading(false);
    };
    fetchTrainings();
  }, []);

  const categories = ["all", "Gouvernance", "Digital", "Pharma", "Logistique", "Economie"];
  const formats = ["all", "Présentiel", "En ligne", "Hybride"];

  const filteredTrainings = trainings.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (t.short_description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    const matchesFormat = activeFormat === "all" || t.format === activeFormat;
    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <>
      <PageHero 
        title={locale === "fr" ? "Catalogue des Formations" : "Training Catalog"}
        subtitle={locale === "fr" ? "Développez vos compétences avec nos programmes d'excellence." : "Develop your skills with our excellence programs."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
          <div className="mb-8">
            <Link 
              href="/academy"
              className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
            </Link>
          </div>
          {/* Filters and Search */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 mb-12 relative z-20 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input 
                type="text"
                placeholder="Rechercher une formation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all placeholder:text-white/20 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/40 text-sm font-bold uppercase tracking-widest mr-2 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Catégorie:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? "bg-orange text-white shadow-lg shadow-orange/30" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
                >
                  {cat === "all" ? "Tout" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-white/40 font-bold text-sm">
            {filteredTrainings.length} formation{filteredTrainings.length > 1 ? "s" : ""} trouvée{filteredTrainings.length > 1 ? "s" : ""}
          </p>
          {(activeCategory !== "all" || activeFormat !== "all" || searchQuery !== "") && (
            <button 
              onClick={() => {
                setActiveCategory("all");
                setActiveFormat("all");
                setSearchQuery("");
              }}
              className="text-orange text-sm font-bold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTrainings.map((training) => (
              <motion.div
                key={training.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#0F1D33] rounded-[32px] overflow-hidden border border-white/5 flex flex-col h-full hover:border-orange/30 hover:shadow-2xl hover:shadow-orange/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={training.image_url} 
                    alt={training.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-dark/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                      {training.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent flex justify-between items-end">
                    <div className="text-xl font-black text-white">
                      {training.price} <span className="text-xs font-medium opacity-60">{training.currency}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4 line-clamp-2 leading-tight">
                    {training.title}
                  </h3>
                  <p className="text-white/50 text-sm font-poppins mb-8 line-clamp-3">
                    {training.short_description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-xs font-bold text-accent">
                      <Calendar className="w-4 h-4 mr-3" />
                      {training.date}
                    </div>
                    <div className="flex items-center text-xs font-bold text-white/40">
                      <MapPin className="w-4 h-4 mr-3" />
                      {training.location}
                    </div>
                  </div>

                  <Link 
                    href={`/academy/trainings/${training.slug}`}
                    className="mt-auto group/btn bg-white/5 hover:bg-orange text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-orange shadow-lg"
                  >
                    Voir détails
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTrainings.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-2xl font-montserrat font-bold text-white mb-4">Aucune formation trouvée</h3>
            <p className="text-white/40 mb-8">Essayez de modifier vos filtres ou votre recherche.</p>
            <button 
              onClick={() => {
                setActiveCategory("all");
                setActiveFormat("all");
                setSearchQuery("");
              }}
              className="px-8 py-3 bg-white text-dark rounded-full font-bold hover:bg-orange hover:text-white transition-all"
            >
              Tout afficher
            </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
