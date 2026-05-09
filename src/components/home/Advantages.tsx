"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, Variants } from "framer-motion";
import { Award, Compass, Milestone, Globe, Cpu, Route } from "lucide-react";

export const Advantages: React.FC = () => {
  const { t } = useLanguage();

  const advantageIcons = [
    <Award className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Compass className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Milestone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Cpu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Route className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Premium Ambient Background Blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full filter blur-[120px] pointer-events-none -translate-x-1/3" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full filter blur-[100px] pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Side: Editorial introduction with glass trust badge */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.span
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-accent/5 text-accent font-poppins text-xs font-bold tracking-widest uppercase rounded-full border border-accent/10 shadow-sm"
            >
              {t.advantages.tag}
            </motion.span>
            
            <h2 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] max-w-md">
              {t.advantages.title}
            </h2>
            
            <p className="font-inter text-lg text-dark/75 leading-relaxed max-w-lg">
              {t.advantages.subtitle}
            </p>

            {/* Custom Interactive Trust Card overlay instead of basic SVG */}
            <div className="relative w-full max-w-sm bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 hidden sm:block">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full filter blur-xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500" />
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-poppins font-bold text-lg shadow-md shadow-primary/20">
                  SN
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-primary text-base">SaniNova Global</h4>
                  <p className="font-inter text-xs text-dark/50">L'excellence en santé publique</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Comparative Points Grid with Glassmorphic Luxury Cards */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            >
              {t.advantages.points.map((pt, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-dark/5 hover:border-accent/20 hover:bg-white hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-full"
                >
                  {/* Luxury Background Glow per card on hover */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-accent/3 rounded-full filter blur-xl group-hover:bg-accent/8 group-hover:scale-150 transition-all duration-500" />
                  
                  {/* Large semi-transparent numbers for rich structure */}
                  <span className="absolute top-6 right-8 font-montserrat text-5xl font-extrabold text-primary/4 select-none group-hover:text-accent/8 group-hover:scale-105 transition-all duration-500">
                    {`0${index + 1}`}
                  </span>

                  <div>
                    {/* Rounded Icon container with soft accent gradient */}
                    <div className="w-12 h-12 rounded-2xl bg-accent/5 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
                      {advantageIcons[index]}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-poppins text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {pt.title}
                      </h3>
                      <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed max-w-[280px]">
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
