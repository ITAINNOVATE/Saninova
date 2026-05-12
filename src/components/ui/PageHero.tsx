"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ChevronDown } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImages: string[];
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImages }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const handleScrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Dynamic Sliding Background Images */}
      {backgroundImages.map((bg, idx) => (
        <div 
          key={bg}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1500ms] ease-in-out transform ${
            idx === currentBgIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ))}

      {/* Professional Overlays for content isolation */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/70 to-primary/95 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent pointer-events-none" />

      {/* Floating Design Accents */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center pt-16"
        >
          <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Middle Design Accent Line (Moved below title) */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 bg-orange mb-6 rounded-full"
          />
          
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-inter text-lg md:text-xl opacity-90 max-w-2xl font-light tracking-wide leading-relaxed text-light/90"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Page Scrolling Indicator */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          onClick={handleScrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-white/50 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="font-poppins text-[10px] font-semibold tracking-widest uppercase">
            Découvrir
          </span>
          <ChevronDown className="w-5 h-5 text-orange group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};

export default PageHero;
