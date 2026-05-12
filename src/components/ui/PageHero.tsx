"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Image with Professional Overlay */}
      <div className="absolute inset-0 bg-primary/40 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Multi-layered gradient for content isolation */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent" />
      </div>

      {/* Floating Design Accents */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Top Design Accent */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 bg-orange mb-8 rounded-full"
          />

          <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
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
      </div>
    </section>
  );
};

export default PageHero;
