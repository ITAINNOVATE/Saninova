"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Award, Compass, Milestone, Globe, Cpu, Route } from "lucide-react";

export const Advantages: React.FC = () => {
  const { t } = useLanguage();

  const advantageIcons = [
    <Award className="w-5 h-5" />,
    <Compass className="w-5 h-5" />,
    <Milestone className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
    <Cpu className="w-5 h-5" />,
    <Route className="w-5 h-5" />,
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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Editorial introduction (asymmetrical span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
              {t.advantages.tag}
            </span>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
              {t.advantages.title}
            </h2>
            <p className="font-inter text-lg text-dark/70 leading-relaxed">
              {t.advantages.subtitle}
            </p>

            {/* Decorative minimalist graphic element */}
            <div className="pt-6 hidden lg:block">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                <path d="M10 80 C 40 10, 60 10, 100 80 S 150 50, 190 20" stroke="#00A878" strokeWidth="3" strokeLinecap="round" />
                <circle cx="10" cy="80" r="4" fill="#0B3C5D" />
                <circle cx="100" cy="80" r="4" fill="#0B3C5D" />
                <circle cx="190" cy="20" r="4" fill="#00A878" />
              </svg>
            </div>
          </div>

          {/* Right Side: Comparative Points Grid (asymmetrical span 7) */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {t.advantages.points.map((pt, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-light/60 p-6 rounded-2xl border border-dark/2 hover:border-primary/10 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
                >
                  {/* Small round icon with background flash */}
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {advantageIcons[index]}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-poppins text-lg font-bold text-primary group-hover:text-primary transition-colors">
                      {pt.title}
                    </h3>
                    <p className="font-inter text-base sm:text-lg text-dark/70 leading-relaxed">
                      {pt.desc}
                    </p>
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
