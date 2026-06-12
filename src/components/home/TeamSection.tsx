"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Users } from "lucide-react";
import Image from "next/image";

export const TeamSection: React.FC = () => {
  const { t } = useLanguage();

  // Array mapping team photos to translated members by order
  const memberImages = [
    "/images/photo_hope.png",
    "/images/team/sophie.png", // Directrice Technique - Santé Publique (Placeholder)
    "/images/team/sophie.png", // Sophie (Directrice Technique - Digitalisation)
    "/images/team/sophie.png", // Directrice des Études (Placeholder)
    "/images/team/sophie.png"  // Directrice Exécutive (Placeholder)
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

          {/* President (First Member) */}
          <div className="flex justify-center mb-16">
            {t.aboutPage.leadership.members.length > 0 && (
              <div className="w-full max-w-[400px] bg-white border border-dark/5 shadow-xl flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Image Section */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-light/50">
                  <Image
                    src={memberImages[0]}
                    alt={t.aboutPage.leadership.members[0].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Floating Identity Box - Overlapping */}
                <div className="relative z-10 w-[85%] mx-auto -mt-12 bg-orange text-white text-center py-5 px-4 shadow-lg group-hover:bg-orange/95 transition-colors flex flex-col items-center justify-center min-h-[90px]">
                  <h4 className="font-poppins text-lg sm:text-xl font-bold tracking-wide mb-1">
                    {t.aboutPage.leadership.members[0].name}
                  </h4>
                  <p className="font-poppins text-xs sm:text-sm font-medium opacity-90 leading-tight uppercase tracking-wider">
                    {t.aboutPage.leadership.members[0].role}
                  </p>
                </div>

                {/* Description Details */}
                <div className="p-8 pt-6 text-center flex-grow flex flex-col items-center justify-start">
                  <p className="font-inter text-base text-dark/70 leading-relaxed">
                    {t.aboutPage.leadership.members[0].desc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Rest of the team (4 Members) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {t.aboutPage.leadership.members.slice(1).map((member, index) => {
              const originalIndex = index + 1;
              return (
                <div
                  key={originalIndex}
                  className="bg-white border border-dark/5 shadow-md flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Image Section */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-light/50">
                    <Image
                      src={memberImages[originalIndex]}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Floating Identity Box - Smaller for the 4 items */}
                  <div className="relative z-10 w-[90%] mx-auto -mt-8 bg-orange text-white text-center py-4 px-3 shadow-lg group-hover:bg-orange/95 transition-colors flex flex-col items-center justify-center min-h-[80px]">
                    <h4 className="font-poppins text-sm font-bold tracking-wide mb-1">
                      {member.name}
                    </h4>
                    <p className="font-poppins text-[10px] font-medium opacity-90 leading-tight uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>

                  {/* Description Details */}
                  <div className="p-5 pt-5 text-center flex-grow flex flex-col items-center justify-start">
                    <p className="font-inter text-xs text-dark/70 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
