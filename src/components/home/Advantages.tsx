"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, Variants } from "framer-motion";
import { Award, Compass, Milestone, Globe, Cpu, Route } from "lucide-react";

export const Advantages: React.FC = () => {
  const { t } = useLanguage();

  const advantageIcons = [
    <Award className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
    <Compass className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />,
    <Milestone className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />,
    <Globe className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />,
    <Cpu className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:scale-115" />,
    <Route className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />,
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, // ultra-smooth custom easeOut
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Luxurious Abstract Fluid Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/4 to-transparent rounded-full filter blur-[140px] pointer-events-none -translate-y-1/3" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-accent/4 to-transparent rounded-full filter blur-[120px] pointer-events-none translate-y-1/3" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/2 rounded-full filter blur-[100px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Premium Editorial Narrative Column */}
          <div className="lg:col-span-5 space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-6">
              <motion.span
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-flex px-4 py-1.5 bg-accent/6 text-accent font-poppins text-xs font-bold tracking-widest uppercase rounded-full border border-accent/15 shadow-sm"
              >
                {t.advantages.tag}
              </motion.span>
              
              <h2 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-black text-primary tracking-tight leading-[1.12]">
                {t.advantages.title}
              </h2>
              
              <p className="font-inter text-lg sm:text-xl text-dark/75 leading-relaxed max-w-lg font-light">
                {t.advantages.subtitle}
              </p>
            </div>

            {/* Elite Trust Emblem Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md bg-gradient-to-br from-light/80 to-light/30 backdrop-blur-md border border-dark/5 rounded-3xl p-8 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-all duration-700" />
              <div className="relative z-10 flex flex-col space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-montserrat font-black text-xl shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform duration-300">
                    SN
                  </div>
                  <div>
                    <h4 className="font-poppins font-extrabold text-primary text-lg">SaniNova Advisory</h4>
                    <p className="font-inter text-xs text-dark/50 uppercase tracking-widest font-semibold">Cabinet de Conseil Élite</p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-dark/5" />
                <p className="font-inter text-sm text-dark/70 leading-relaxed italic">
                  "Une ingénierie stratégique combinant rigueur internationale et expertises locales pour propulser l'excellence sanitaire africaine."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Ultra-Premium Interactive Grid of Comparative Advantages */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
            >
              {t.advantages.points.map((pt, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-b from-white/95 to-white/70 backdrop-blur-md p-8 rounded-[32px] border border-dark/5 hover:border-accent/25 hover:bg-white hover:scale-[1.04] hover:shadow-[0_20px_50px_rgba(11,60,93,0.06)] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between h-full"
                >
                  {/* Glowing hover accent lines */}
                  <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500 rounded-t-full" />
                  
                  {/* Subtle corner hover background light */}
                  <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-accent/3 rounded-full filter blur-xl group-hover:bg-accent/8 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                  
                  {/* Floating Giant Numbers with premium modern typography */}
                  <span className="absolute top-6 right-8 font-montserrat text-6xl font-black text-primary/3 select-none group-hover:text-accent/10 group-hover:scale-110 transition-all duration-500 tracking-tighter">
                    {`0${index + 1}`}
                  </span>

                  <div>
                    {/* Modern Hexagonal/Curved Icon container with soft accent gradient */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/15 text-accent flex items-center justify-center mb-8 group-hover:from-accent group-hover:to-primary group-hover:text-white group-hover:-translate-y-1.5 group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-500">
                      {advantageIcons[index]}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-poppins text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {pt.title}
                      </h3>
                      <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed max-w-[280px] text-justify">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Advantages;
