"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowRight, GraduationCap, Users, Globe, Award } from "lucide-react";
import Link from "next/link";

const AcademyHero: React.FC = () => {
  const { t } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);
  
  const backgroundImages = [
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f2aa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent z-10" />
        {backgroundImages.map((bg, idx) => (
          <div 
            key={bg}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] ease-in-out transform ${
              idx === currentBgIndex ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
            }`}
            style={{ backgroundImage: `url('${bg}')` }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-orange font-bold text-xs tracking-widest uppercase mb-6">
              <GraduationCap className="w-4 h-4 mr-2" />
              SaniNova Academy
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-black text-white leading-[1.1] mb-6">
              {t.academy.title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 font-poppins leading-relaxed mb-10 max-w-xl">
              {t.academy.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/academy/trainings"
                className="px-8 py-4 bg-orange text-white rounded-full font-bold text-lg flex items-center group transition-all hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:scale-105 active:scale-95"
              >
                {t.academy.ctaTrainings}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/academy/register"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
              >
                {t.academy.ctaRegister}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Visual element for hero */}
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80" 
                 alt="Professional Training" 
                 className="w-full aspect-[4/5] object-cover"
               />
               <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>

            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-dark/40 tracking-widest">Certifié</p>
                <p className="text-dark font-black">Excellence</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 -left-10 bg-dark/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-20 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-dark overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">5000+</p>
                <p className="text-white/50 text-xs font-medium">Experts formés</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;
