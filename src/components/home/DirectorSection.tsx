"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, Variants } from "framer-motion";
import { Quote, Award } from "lucide-react";
import Image from "next/image";

export const DirectorSection: React.FC = () => {
  const { t } = useLanguage();
  const dir = t.director;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const leftToRightVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="director" className="py-20 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full filter blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full filter blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Portrait */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden group shadow-2xl shadow-dark/10 border border-dark/5">
              {/* Image container */}
              <div className="absolute inset-0 bg-light transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/images/team/hope.jpg"
                  alt={dir.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              
              {/* Elegant inner border */}
              <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none z-10" />
              
              {/* Bottom gradient for text overlay readability if needed, or just premium aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60 z-0" />

              {/* Tag / Badge over image */}
              <div className="absolute bottom-6 left-6 z-10 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
                <Award className="w-5 h-5 text-orange" />
                <span className="font-poppins font-bold text-primary text-sm">Leadership</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
            {/* Header */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary font-poppins text-xs font-bold tracking-widest uppercase rounded-full border border-primary/10">
                {dir.tag}
              </span>
              <h2 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark tracking-tight">
                {dir.name}
              </h2>
              <p className="font-poppins text-lg sm:text-xl font-medium text-accent">
                {dir.role}
              </p>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-5 text-dark/70 font-inter text-base sm:text-lg leading-relaxed text-justify hyphens-auto break-words">
              {dir.description1 && <p>{dir.description1}</p>}
              {dir.description2 && <p>{dir.description2}</p>}
              {dir.description3 && <p>{dir.description3}</p>}
            </div>



            {/* Quote Section (Glassmorphism) */}
            <motion.div
              variants={leftToRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 relative bg-primary/5 backdrop-blur-sm border border-primary/10 p-8 rounded-3xl overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col space-y-4">
                <p className="font-montserrat text-lg sm:text-xl font-bold text-primary italic leading-relaxed text-center lg:text-left">
                  "{dir.quote}"
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-10 h-[2px] bg-orange rounded-full" />
                  <span className="font-poppins text-sm font-bold text-dark/80 tracking-wider">
                    {dir.name}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DirectorSection;
