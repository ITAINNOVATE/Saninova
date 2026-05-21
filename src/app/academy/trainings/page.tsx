"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { Search, Filter, Calendar, MapPin, ArrowRight, X, ArrowLeft, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "../../../components/ui/PageHero";
import { supabase } from "../../../lib/supabase";
import { staticModules } from "../../../lib/academyHelpers";

export default function TrainingsCatalog() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
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

      const dbCourses = data || [];
      
      // Combine database courses and the 87 certification modules
      setTrainings([...dbCourses, ...staticModules]);
      setLoading(false);
    };
    
    fetchTrainings();

    const channel = supabase
      .channel("academy_trainings_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "academy_trainings",
        },
        () => {
          fetchTrainings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = [
    "all", 
    "Logistique / Supply Chain", 
    "Réglementation", 
    "Santé Digitale", 
    "Leadership / Gouvernance", 
    "Santé Publique", 
    "Business / Management"
  ];

  const filteredTrainings = trainings.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (t.short_description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (t.parentCertification || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHero 
        title="Espace eLearning"
        subtitle={locale === "fr" ? "Accédez à notre catalogue de 87 modules d'excellence à suivre à votre rythme." : "Access our catalog of 87 excellence modules to follow at your own pace."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
        ]}
      />
      
      <div className="bg-dark pb-24 min-h-screen relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="mb-8">
            <Link 
              href="/academy"
              className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="bg-[#0F1D33]/60 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 mb-12 shadow-2xl relative">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange transition-colors w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Rechercher un module, une certification ou une compétence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-transparent transition-all placeholder:text-white/20 font-medium"
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
              <div className="flex flex-col gap-3">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-orange" /> Filtrer par Académie :
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                        activeCategory === cat 
                          ? "bg-orange text-white shadow-lg shadow-orange/30 scale-[1.02]" 
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {cat === "all" ? "Toutes les Académies" : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-white/40 font-bold text-sm">
              {filteredTrainings.length} formation{filteredTrainings.length > 1 ? "s" : ""} trouvée{filteredTrainings.length > 1 ? "s" : ""}
            </p>
            {(activeCategory !== "all" || searchQuery !== "") && (
              <button 
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-orange text-sm font-bold hover:underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>

          {/* Catalog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTrainings.map((training) => (
                <motion.div
                  key={training.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-[#0F1D33]/40 rounded-[32px] overflow-hidden border border-white/5 hover:border-orange/20 hover:bg-[#0F1D33]/80 hover:shadow-[0_0_50px_rgba(255,122,0,0.05)] transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image Header */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={training.image_url} 
                      alt={training.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 bg-dark/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10 shadow-lg">
                        {training.category}
                      </span>
                    </div>
                    {training.isStaticModule && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3.5 py-1.5 bg-orange/90 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                          MODULE CERTIFIANT
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark via-dark/40 to-transparent flex justify-between items-end">
                      <div className="text-2xl font-black text-white font-montserrat flex items-baseline gap-1">
                        {training.price} <span className="text-xs font-semibold opacity-60 uppercase">{training.currency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Card Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    {training.parentCertification && (
                      <span className="text-[10px] font-bold text-orange uppercase tracking-wider mb-2 block line-clamp-1 bg-orange/10 px-3 py-1 rounded-lg border border-orange/15 w-fit">
                        {training.parentCertification}
                      </span>
                    )}
                    
                    <h3 className="text-xl font-montserrat font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-orange transition-colors">
                      {training.title}
                    </h3>
                    
                    <p className="text-white/50 text-sm font-poppins mb-6 line-clamp-3 leading-relaxed">
                      {training.short_description}
                    </p>

                    <div className="space-y-3.5 mb-8 mt-auto border-t border-white/5 pt-4">
                      <div className="flex items-center text-xs font-bold text-accent">
                        <BookOpen className="w-4 h-4 mr-3 text-orange" />
                        Durée : {training.duration}
                      </div>
                      <div className="flex items-center text-xs font-bold text-white/40">
                        <MapPin className="w-4 h-4 mr-3" />
                        {training.location}
                      </div>
                    </div>

                    <Link 
                      href={`/academy/trainings/${training.slug}`}
                      className="group/btn bg-white/5 hover:bg-orange text-white py-4.5 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-orange shadow-lg hover:shadow-orange/20"
                    >
                      Détails de la formation
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty Catalog State */}
          {filteredTrainings.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white mb-4">Aucun module trouvé</h3>
              <p className="text-white/40 mb-8">Essayez de modifier vos filtres de recherche ou sélectionnez une autre académie.</p>
              <button 
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="px-8 py-3 bg-white text-dark rounded-full font-bold hover:bg-orange hover:text-white transition-all shadow-xl"
              >
                Afficher tout le catalogue
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
