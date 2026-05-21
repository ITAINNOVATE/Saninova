"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, Search, ArrowRight, CheckCircle2, X, 
  Clock, DollarSign, BookOpen, ChevronDown, ChevronUp, AlertCircle 
} from "lucide-react";
import Link from "next/link";
import { certificationsData } from "../../data/certificationsData";

const AcademyCertifications = () => {
  const { t, locale } = useLanguage();
  const academy = t.academy;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCertName, setSelectedCertName] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({});

  // Flatten all certifications with their academy context
  const allCertifications = academy.subAcademies.flatMap((sub: any) => 
    sub.certifications.map((cert: string) => ({
      name: cert,
      academyName: sub.title,
      academyId: sub.id
    }))
  );

  const filteredCerts = allCertifications.filter((cert: any) => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cert.academyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || cert.academyId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCertDetails = (certName: string) => {
    for (const ac of certificationsData) {
      const found = ac.certifications.find(
        c => c.name.toLowerCase().trim() === certName.toLowerCase().trim()
      );
      if (found) {
        return {
          ...found,
          academyTitle: ac.title,
          academyId: ac.id
        };
      }
    }
    return null;
  };

  const toggleModule = (moduleName: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const details = selectedCertName ? getCertDetails(selectedCertName) : null;

  return (
    <section id="certifications" className="py-24 bg-light/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-orange font-bold tracking-widest text-sm uppercase mb-4 block">
              PROGRAMMES CERTIFIANTS
            </span>
            <h2 className="text-3xl md:text-5xl font-montserrat font-black text-primary leading-tight">
              Validez votre expertise avec SaniNova
            </h2>
            <p className="mt-6 text-dark/60 text-lg leading-relaxed">
              Nos certifications professionnelles sont reconnues pour leur rigueur et leur alignement avec les standards internationaux de la santé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Rechercher une certification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white rounded-2xl border border-primary/10 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
              activeCategory === "all" 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-white text-dark/60 hover:bg-white hover:text-primary border border-primary/5"
            }`}
          >
            Toutes les catégories
          </button>
          {academy.subAcademies.map((sub: any) => (
            <button
              key={sub.id}
              onClick={() => setActiveCategory(sub.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeCategory === sub.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white text-dark/60 hover:bg-white hover:text-primary border border-primary/5"
              }`}
            >
              {sub.title.replace("Académie ", "")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert: any, idx: number) => {
            const hasDetails = !!getCertDetails(cert.name);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => hasDetails && setSelectedCertName(cert.name)}
                className={`bg-white rounded-3xl p-8 border border-primary/5 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden flex flex-col ${
                  hasDetails ? "cursor-pointer" : ""
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10 flex flex-col h-full flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <Award className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-montserrat font-bold text-primary mb-3 leading-tight group-hover:text-orange transition-colors">
                    {cert.name}
                  </h3>
                  
                  <div className="mt-auto pt-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-dark/40 uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 text-orange" />
                      {cert.academyName}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-t border-light pt-4 mt-2">
                      {hasDetails && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCertName(cert.name);
                          }}
                          className="flex items-center gap-1.5 text-orange font-bold text-xs uppercase tracking-wider hover:text-orange-dark transition-all"
                        >
                          <BookOpen className="w-4 h-4" /> Voir le syllabus
                        </button>
                      )}
                      <Link 
                        href={`/academy/certif-register?certification=${encodeURIComponent(cert.name)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider hover:text-primary-dark transition-all ml-auto group/btn"
                      >
                        S'inscrire
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-primary/20">
            <p className="text-dark/40 font-medium">Aucune certification ne correspond à votre recherche.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Slide-over Syllabus Explorer Drawer */}
      <AnimatePresence>
        {selectedCertName && details && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertName(null)}
              className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm"
            />
            
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-slate-950 shadow-2xl z-50 overflow-y-auto flex flex-col border-l border-white/5"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-start justify-between bg-slate-900/60 sticky top-0 backdrop-blur-md z-10">
                <div className="max-w-[85%]">
                  <span className="text-orange font-bold tracking-widest text-xs uppercase mb-2 block">
                    {details.academyTitle?.replace("ACADÉMIE ", "") || "Certification"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-montserrat font-black text-white leading-tight">
                    {selectedCertName}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedCertName(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-slate-950">
                {/* Stats Badges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 shadow-sm">
                    <Clock className="w-6 h-6 text-blue-400 mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Durée</span>
                    <span className="text-sm font-black text-white mt-1">{details.duration || "N/A"}</span>
                  </div>
                  <div className="bg-slate-900/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 shadow-sm">
                    <DollarSign className="w-6 h-6 text-orange mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Investissement</span>
                    <span className="text-sm font-black text-orange mt-1">{details.cost || "N/A"}</span>
                  </div>
                  <div className="bg-slate-900/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 shadow-sm">
                    <BookOpen className="w-6 h-6 text-emerald-400 mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Structure</span>
                    <span className="text-sm font-black text-emerald-400 mt-1">{details.modules?.length || 0} Modules</span>
                  </div>
                </div>

                {/* Bilingual Notice */}
                {locale === "en" && (
                  <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex gap-3 text-slate-300 text-sm shadow-sm">
                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Notice:</strong> The detailed curriculum is presented in French, matching the certified regional frameworks and training reference documents.
                    </p>
                  </div>
                )}

                {/* Syllabus Curriculum */}
                <div>
                  <h4 className="text-base font-montserrat font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                    <Award className="w-5 h-5 text-orange" /> PROGRAMME PÉDAGOGIQUE
                  </h4>
                  
                  {details.modules && details.modules.length > 0 ? (
                    <div className="space-y-4">
                      {details.modules.map((mod: any, mIdx: number) => {
                        const isExpanded = !!expandedModules[mod.name];
                        return (
                          <div 
                            key={mIdx} 
                            className="border border-white/5 rounded-3xl overflow-hidden transition-all bg-slate-900/20 shadow-sm"
                          >
                            {/* Accordion Trigger */}
                            <button
                              onClick={() => toggleModule(mod.name)}
                              className="w-full text-left p-6 flex items-center justify-between gap-4 bg-slate-900/30 hover:bg-slate-900/60 transition-all cursor-pointer"
                            >
                              <div className="flex-1">
                                <span className="text-xs font-bold text-orange uppercase tracking-widest block mb-1">
                                  Module {mIdx + 1}
                                </span>
                                <h5 className="text-base font-bold text-white leading-snug">
                                  {mod.name}
                                </h5>
                                <div className="flex gap-4 mt-2">
                                  {mod.duration && (
                                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5 text-blue-400" /> {mod.duration}
                                    </span>
                                  )}
                                  {mod.cost && (
                                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                      <DollarSign className="w-3.5 h-3.5 text-orange" /> {mod.cost}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </button>

                            {/* Syllabus Details */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="p-6 bg-slate-950/40 border-t border-white/5 space-y-6">
                                    {mod.subModules && mod.subModules.length > 0 ? (
                                      mod.subModules.map((sub: any, sIdx: number) => (
                                        <div key={sIdx} className="relative pl-6 border-l-2 border-white/10">
                                          <div className="absolute w-3 h-3 bg-orange rounded-full -left-[7px] top-1 border-2 border-slate-950" />
                                          <h6 className="text-sm font-bold text-white leading-tight mb-2">
                                            {sub.title} {sub.duration && <span className="text-[10px] font-bold text-orange ml-2 bg-orange/15 px-2.5 py-0.5 rounded-full border border-orange/10">{sub.duration}</span>}
                                          </h6>
                                          {sub.chapters && sub.chapters.length > 0 && (
                                            <ul className="space-y-1.5 mt-2 pl-2">
                                              {sub.chapters.map((chap: string, cIdx: number) => (
                                                <li key={cIdx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                                                  <span className="text-orange shrink-0 mt-0.5">▸</span>
                                                  <span>{chap}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-xs text-slate-400 italic">Aucun sous-module détaillé.</p>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 italic">Aucun module disponible pour cette certification.</p>
                  )}
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-8 border-t border-white/5 bg-slate-950 sticky bottom-0 z-10 flex flex-col gap-4 shadow-lg">
                <Link 
                  href={`/academy/certif-register?certification=${encodeURIComponent(selectedCertName)}`}
                  className="w-full py-4 bg-orange hover:bg-orange/85 text-white rounded-2xl font-bold transition-all text-center shadow-lg shadow-orange/20 text-sm flex items-center justify-center gap-2"
                >
                  S'inscrire à la certification complète <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AcademyCertifications;

