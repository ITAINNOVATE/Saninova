"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Users } from "lucide-react";
import Image from "next/image";

export const TeamSection: React.FC = () => {
  const { t } = useLanguage();

  // Array mapping team photos to translated members by order
  const memberImages = [
    "/images/team/amadou.png",
    "/images/team/sophie.png",
    "/images/team/jean_marie.png"
  ];

  return (
    <section className="py-24 bg-light/30 border-t border-light/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
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

          {/* User requested layout style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {t.aboutPage.leadership.members.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-dark/5 shadow-md flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-light/50">
                  <Image
                    src={memberImages[index]}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Floating Identity Box - Overlapping */}
                <div className="relative z-10 w-[85%] mx-auto -mt-12 bg-orange text-white text-center py-5 px-4 shadow-lg group-hover:bg-orange/95 transition-colors flex flex-col items-center justify-center min-h-[90px]">
                  <h4 className="font-poppins text-base sm:text-lg font-bold uppercase tracking-wide mb-1">
                    {member.name}
                  </h4>
                  <p className="font-poppins text-[11px] sm:text-xs font-medium opacity-90 leading-tight uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                {/* Description Details */}
                <div className="p-8 pt-6 text-center flex-grow flex flex-col items-center justify-start">
                  <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
