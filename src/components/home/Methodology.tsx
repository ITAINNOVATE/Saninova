"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Search, PenTool, LayoutTemplate, PlayCircle, ClipboardCheck } from "lucide-react";

export const Methodology: React.FC = () => {
  const { t } = useLanguage();

  const stepIcons = [
    <Search className="w-6 h-6" />,
    <PenTool className="w-6 h-6" />,
    <LayoutTemplate className="w-6 h-6" />,
    <PlayCircle className="w-6 h-6" />,
    <ClipboardCheck className="w-6 h-6" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="methodology" className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full filter blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full filter blur-3xl opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
            {t.methodology.tag}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.methodology.title}
          </h2>
          <p className="font-inter text-base text-white/60">
            {t.methodology.subtitle}
          </p>
        </div>

        {/* Timeline Desktop representation (horizontal) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-5 gap-8 pt-6"
        >
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />

          {t.methodology.steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Node with icon */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary/40 border-2 border-accent/20 text-accent flex items-center justify-center p-4 mb-6 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 shadow-lg shadow-accent/5">
                {stepIcons[index]}
                {/* Micro numbering circle */}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-dark">
                  {step.num}
                </span>
              </div>

              {/* Step Info */}
              <div className="space-y-3">
                <h3 className="font-poppins text-lg font-bold text-white group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Methodology;
