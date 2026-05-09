"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const bgImages = [
    "/images/hero_background.png",
    "/images/hero_background2.png",
    "/images/hero_background3.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [bgImages.length]);

  const handleScrollToNext = () => {
    const nextSection = document.querySelector("#about");
    if (nextSection) {
      const offset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden py-24">
      {/* Background Images with smooth fading loop */}
      {bgImages.map((bg, idx) => (
        <div 
          key={bg}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1500ms] ease-in-out transform ${
            idx === currentBgIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ))}
      
      {/* Sophisticated Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary/95" />

      {/* Cybernetic/Medical glow grids */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center pt-24 sm:pt-32 md:pt-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 flex flex-col items-center"
        >

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
          >
            <a
              href="#expertises"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#expertises");
                if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
              }}
              className="flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90 text-white font-poppins font-semibold px-8 py-4 rounded-full text-sm shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full sm:w-auto"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#contact");
                if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
              }}
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white font-poppins font-semibold px-8 py-4 rounded-full text-sm border border-white/15 backdrop-blur-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full sm:w-auto"
            >
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          onClick={handleScrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-white/50 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="font-poppins text-xs font-medium tracking-widest uppercase">
            {t.hero.scrollText}
          </span>
          <ChevronDown className="w-5 h-5 text-orange group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};
export default HeroSection;
