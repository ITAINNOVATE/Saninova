"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Award, Search, Filter, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const AcademyCertifications = () => {
  const { t } = useLanguage();
  const academy = t.academy;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

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
          {filteredCerts.map((cert: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white rounded-3xl p-8 border border-primary/5 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
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
                  
                  <Link 
                    href={`/academy/register?certification=${encodeURIComponent(cert.name)}`}
                    className="flex items-center gap-2 text-primary font-bold text-sm group/btn mt-2"
                  >
                    S'inscrire à cette certification
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
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
    </section>
  );
};

export default AcademyCertifications;
