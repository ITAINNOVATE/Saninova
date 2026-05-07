"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Rocket, Heart, ChevronDown, ChevronUp, UserCheck } from "lucide-react";

export const AboutDetails: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const valueIcons = [
    <Heart className="w-5 h-5 shrink-0" />,
    <UserCheck className="w-5 h-5 shrink-0" />,
    <Rocket className="w-5 h-5 shrink-0" />,
    <Eye className="w-5 h-5 shrink-0" />,
    <Heart className="w-5 h-5 shrink-0" />,
  ];

  return (
    <section id="about-details" className="py-12 bg-light/30 border-t border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Toggle Button for Details */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white font-poppins font-bold px-8 py-4 rounded-full text-sm shadow-lg transition-all duration-300"
        >
          <span>{isOpen ? "Réduire les détails institutionnels" : t.aboutSection.cta}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-16 text-left space-y-20"
            >
              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Vision */}
                <div className="bg-white p-8 rounded-3xl border border-dark/5 shadow-md space-y-4">
                  <div className="flex items-center space-x-3 text-accent">
                    <Eye className="w-6 h-6 shrink-0" />
                    <h3 className="font-poppins text-xl font-bold text-primary">
                      {t.aboutPage.vision.title}
                    </h3>
                  </div>
                  <p className="font-inter text-base sm:text-lg text-dark/70 leading-relaxed">
                    {t.aboutPage.vision.desc}
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-white p-8 rounded-3xl border border-dark/5 shadow-md space-y-4">
                  <div className="flex items-center space-x-3 text-accent">
                    <Rocket className="w-6 h-6 shrink-0" />
                    <h3 className="font-poppins text-xl font-bold text-primary">
                      {t.aboutPage.mission.title}
                    </h3>
                  </div>
                  <p className="font-inter text-base sm:text-lg text-dark/70 leading-relaxed">
                    {t.aboutPage.mission.desc}
                  </p>
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-8">
                <h3 className="font-montserrat text-2xl font-extrabold text-primary text-center">
                  {t.aboutPage.values.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {t.aboutPage.values.list.map((val, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-2xl border border-dark/5 shadow-sm space-y-3 hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        {valueIcons[index] || <Heart className="w-5 h-5" />}
                      </div>
                      <h4 className="font-poppins text-lg font-bold text-primary">
                        {val.title}
                      </h4>
                      <p className="font-inter text-sm sm:text-base text-dark/60 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Team */}
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h3 className="font-montserrat text-2xl font-extrabold text-primary">
                    {t.aboutPage.leadership.title}
                  </h3>
                  <p className="font-inter text-base sm:text-lg text-dark/60">
                    {t.aboutPage.leadership.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {t.aboutPage.leadership.members.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-3xl border border-dark/5 shadow-md flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all duration-300 group"
                    >
                      {/* Stylized circle portrait placeholder */}
                      <div className="w-24 h-24 rounded-full bg-primary/5 text-primary flex items-center justify-center p-1 border-2 border-accent/20 group-hover:scale-105 transition-transform duration-300">
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary/60" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-poppins text-lg font-bold text-primary">
                          {member.name}
                        </h4>
                        <p className="font-poppins text-xs font-semibold text-accent uppercase tracking-wider">
                          {member.role}
                        </p>
                      </div>

                      <p className="font-inter text-sm sm:text-base text-dark/60 leading-relaxed">
                        {member.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default AboutDetails;
