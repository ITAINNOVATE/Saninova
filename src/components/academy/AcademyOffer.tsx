"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, ShieldCheck, Cpu, Star, 
  Users, BarChart, ChevronRight, X, 
  CheckCircle2, GraduationCap, Briefcase, Award
} from "lucide-react";

const iconsMap: { [key: string]: any } = {
  "supply-chain": Truck,
  "regulation": ShieldCheck,
  "digital": Cpu,
  "leadership": Star,
  "public-health": Users,
  "business": Briefcase
};

const AcademyOffer = () => {
  const { t } = useLanguage();
  const academy = t.academy;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedAcademy = academy.subAcademies.find((a: any) => a.id === selectedId);

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-orange font-bold tracking-widest text-sm uppercase mb-4 block">
            NOS DOMAINES D'EXCELLENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-6">
            Une expertise sectorielle de pointe
          </h2>
          <p className="text-slate-400 font-inter text-lg">
            Découvrez nos 6 académies spécialisées conçues pour répondre aux défis stratégiques de la santé en Afrique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academy.subAcademies.map((item: any, idx: number) => {
            const Icon = iconsMap[item.id] || GraduationCap;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedId(item.id)}
                className="group relative bg-slate-900/50 border border-white/5 rounded-[32px] p-8 hover:bg-slate-800/80 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {item.mission}
                  </p>
                  
                  <div className="flex items-center text-orange font-bold text-xs uppercase tracking-widest gap-2">
                    En savoir plus <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedAcademy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-dark/95 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Left: Info */}
                <div className="p-8 sm:p-12 overflow-y-auto max-h-[80vh]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      {React.createElement(iconsMap[selectedAcademy.id] || GraduationCap, { className: "w-7 h-7" })}
                    </div>
                    <h3 className="text-2xl font-montserrat font-bold text-white leading-tight">
                      {selectedAcademy.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-base leading-relaxed mb-10 italic">
                    "{selectedAcademy.mission}"
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold text-orange uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BarChart className="w-4 h-4" /> Filières Stratégiques
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedAcademy.disciplines.map((d: string, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm font-medium">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Certifications */}
                <div className="bg-slate-800/30 p-8 sm:p-12 overflow-y-auto max-h-[80vh] border-l border-white/5">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5" /> Certifications Proposées
                  </h4>
                  
                  <div className="space-y-4">
                    {selectedAcademy.certifications.map((c: string, i: number) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <Star className="w-5 h-5" />
                          </div>
                          <span className="text-white text-sm font-bold leading-snug">{c}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <a 
                      href="/academy/register"
                      className="w-full py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      Demander des informations
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AcademyOffer;
