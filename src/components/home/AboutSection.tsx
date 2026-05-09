"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Trophy, Users, Globe2, ArrowUpRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Brand presentation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="space-y-8"
          >
            <div className="space-y-5">
              <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
                {t.aboutSection.tag}
              </span>
              <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                {t.aboutSection.title}
              </h2>
            </div>

            <div className="space-y-4 font-inter text-base sm:text-lg text-dark/70 leading-relaxed">
              <p>
                {t.aboutSection.desc1}
              </p>
              <p>
                {t.aboutSection.desc2}
              </p>
            </div>

            {/* Quick figures */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-accent">
                  <Globe2 className="w-5 h-5 shrink-0" />
                  <span className="font-montserrat text-2xl sm:text-3xl font-extrabold">{t.aboutSection.stat1}</span>
                </div>
                <p className="font-poppins text-xs font-medium text-dark/60 uppercase tracking-wide">
                  {t.aboutSection.stat1Label}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-primary">
                  <Trophy className="w-5 h-5 shrink-0" />
                  <span className="font-montserrat text-2xl sm:text-3xl font-extrabold">{t.aboutSection.stat2}</span>
                </div>
                <p className="font-poppins text-xs font-medium text-dark/60 uppercase tracking-wide">
                  {t.aboutSection.stat2Label}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-accent">
                  <Users className="w-5 h-5 shrink-0" />
                  <span className="font-montserrat text-2xl sm:text-3xl font-extrabold">{t.aboutSection.stat3}</span>
                </div>
                <p className="font-poppins text-xs font-medium text-dark/60 uppercase tracking-wide">
                  {t.aboutSection.stat3Label}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#about-details"
                onClick={(e) => handleNavClick(e, "#about-details")}
                className="inline-flex items-center space-x-2 text-primary font-poppins font-bold text-sm hover:text-accent group transition-colors"
              >
                <span>{t.aboutSection.cta}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Side: Image with floating glow */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
            className="relative lg:pl-10"
          >
            {/* Custom glowing background behind image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-dark/5 group">
              <img
                src="/images/about_section.png"
                alt="SaniNova Board Meeting"
                className="w-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Micro floating info card */}
            <div className="absolute bottom-6 left-6 sm:-left-4 bg-white p-4 rounded-2xl shadow-xl border border-dark/5 flex items-center space-x-4 max-w-xs animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-poppins text-lg font-bold text-primary">Cabinet de Conseil Elite</h5>
                <p className="font-inter text-sm sm:text-base text-dark/60">Standard d'excellence internationale.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
