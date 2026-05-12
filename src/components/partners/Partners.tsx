"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export const Partners: React.FC = () => {
  const { t } = useLanguage();

  const partnerLogos = [
    { name: "Techno Stat Group", src: "/images/partners/tsg.png" },
    { name: "ITA Innovate", src: "/images/partners/ita.jpg" },
    { name: "BHIC - Barika Health Impact Consulting", src: "/images/partners/bhic.jpg" },
  ];

  // Duplicate array once to support exact 50% offset looping
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="py-16 bg-white border-y border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h4 className="font-poppins text-xs font-bold text-dark/40 uppercase tracking-widest text-center mb-12">
          {t.partners.title}
        </h4>
      </div>

      {/* Infinite Loop Container */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Gradient Shades for Smooth Fade Edges */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center"
          animate={{
            x: ["0%", "-50%"], 
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 12, // Smooth speed for smaller array
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedLogos.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-20 w-64 px-12 relative flex items-center justify-center group"
              title={partner.name}
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={64}
                className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Partners;
