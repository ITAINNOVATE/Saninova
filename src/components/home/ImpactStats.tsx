"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Target, Landmark, ShieldAlert, Award, Milestone, BarChart2 } from "lucide-react";

export const ImpactStats: React.FC = () => {
  const { t } = useLanguage();

  const statIcons = [
    <Target className="w-5 h-5 shrink-0 text-accent" />,
    <Landmark className="w-5 h-5 shrink-0 text-accent" />,
    <ShieldAlert className="w-5 h-5 shrink-0 text-accent" />,
    <Award className="w-5 h-5 shrink-0 text-accent" />,
    <Milestone className="w-5 h-5 shrink-0 text-accent" />,
    <BarChart2 className="w-5 h-5 shrink-0 text-accent" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative full size background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-stats" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-stats)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
            {t.impact.tag}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.impact.title}
          </h2>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
        >
          {t.impact.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-accent/30 hover:scale-105 transition-all duration-300 flex flex-col items-center group"
            >
              {/* Micro Icon */}
              <div className="p-2 bg-white/5 rounded-full mb-3 group-hover:scale-110 transition-transform">
                {statIcons[index]}
              </div>

              {/* Number and suffix */}
              <span className="font-montserrat text-3xl sm:text-4xl font-extrabold text-white">
                {stat.value}
                <span className="text-accent ml-0.5">{stat.suffix}</span>
              </span>

              {/* Label */}
              <p className="font-poppins text-xs text-white/60 font-semibold uppercase tracking-wider mt-2 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default ImpactStats;
