"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, Map, Smartphone, Table as TableIcon, Clock, Calendar, CheckCircle2 } from "lucide-react";

const PedagogicalModel = () => {
  const { t } = useLanguage();
  const academy = t.academy;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Pedagogical Approach */}
          <div className="space-y-12">
            <div>
              <span className="text-orange font-bold tracking-widest text-sm uppercase mb-4 block">
                {academy.pedagogy.tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-montserrat font-black text-primary leading-tight">
                {academy.pedagogy.title}
              </h2>
            </div>

            <div className="space-y-8">
              {academy.pedagogy.approaches.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-light/30 rounded-3xl p-8 border border-primary/5 hover:border-primary/20 transition-all group"
                >
                  <h3 className="text-xl font-montserrat font-bold text-primary mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {item.points.map((point: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                        <span className="text-dark/70 font-inter text-sm font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Training Formats */}
          <div className="lg:pt-20">
            <div className="bg-primary rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-primary/20 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
              
              <div className="relative z-10">
                <span className="text-orange font-bold tracking-widest text-xs uppercase mb-4 block">
                  {academy.formats.tag}
                </span>
                <h2 className="text-3xl font-montserrat font-black text-white mb-8">
                  {academy.formats.title}
                </h2>

                <div className="space-y-4">
                  {academy.formats.list.map((format: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange">
                          <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-white font-bold text-sm">{format.name}</span>
                      </div>
                      <span className="text-white/60 font-poppins text-xs font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg">
                        {format.duration}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <p className="text-white/80 text-sm leading-relaxed font-inter italic">
                    "Notre modèle est conçu pour s'adapter à l'agenda exigeant des décideurs tout en garantissant une acquisition de compétences concrètes et certifiées."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PedagogicalModel;
