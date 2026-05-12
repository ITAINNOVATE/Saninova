"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Users } from "lucide-react";

export const TeamSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-light/30 border-t border-light/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary mb-2">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat text-3xl font-extrabold text-primary tracking-tight">
              {t.aboutPage.leadership.title}
            </h3>
            <p className="font-inter text-lg text-dark/60">
              {t.aboutPage.leadership.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.aboutPage.leadership.members.map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-dark/5 shadow-md flex flex-col items-center text-center space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-24 h-24 rounded-full bg-primary/5 text-primary flex items-center justify-center p-1 border-2 border-orange/20 group-hover:border-orange transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary/60" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <h4 className="font-poppins text-lg font-bold text-primary group-hover:text-orange transition-colors">
                    {member.name}
                  </h4>
                  <p className="font-poppins text-xs font-semibold text-accent uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                <div className="w-8 h-1 bg-orange/20 rounded-full group-hover:w-16 group-hover:bg-orange transition-all duration-300" />

                <p className="font-inter text-sm sm:text-base text-dark/60 leading-relaxed">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
