"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Target, Award, CheckCircle2 } from "lucide-react";

const AcademyVision = () => {
  const { t } = useLanguage();
  const academy = t.academy;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange font-bold tracking-widest text-sm uppercase mb-4 block">
              {academy.vision.tag}
            </span>
            <h2 className="text-3xl md:text-5xl font-montserrat font-black text-primary leading-tight mb-8">
              {academy.vision.title}
            </h2>
            <p className="text-dark/70 text-lg leading-relaxed font-inter mb-10 border-l-4 border-orange pl-6">
              {academy.vision.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-light/30 rounded-[40px] p-8 sm:p-12 border border-primary/5 shadow-2xl shadow-primary/5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-primary">Public Cible</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {academy.vision.targets.map((target: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-dark/80 font-medium font-inter text-sm leading-snug">
                    {target}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyVision;
