"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Users, X, ChevronRight, Tag } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  details?: string;
  tags?: string[];
}

interface SelectedMember {
  member: TeamMember;
  imageIndex: number;
}

export const TeamSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
      setImageLoaded(false); // reset image state on each new member
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedMember]);

  const memberImages = [
    "/images/team/hope.jpg",
    "/images/team/ghislaine.jpg",   // Directrice Technique - Santé Publique
    "/images/team/mylene.png",     // Directrice Technique - Digitalisation
    "/images/team/lucresse.png",   // Directrice Technique chargée des Études
    "/images/team/mechak-new.jpeg", // Directrice Technique chargée des projets
    "/images/team/ambroise.png",  // Conseiller en Développement Institutionnel
    "/images/team/nicolas.png",   // Responsable Académique
    "/images/team/arafath.png",   // Responsable IA et Innovation
    "/images/team/afia.png",      // Comptable
  ];

  const viewMoreLabel = t.aboutPage?.leadership?.viewMore ?? "Voir +";

  // Shared card for the grid members
  const MemberCard = ({ member, imageIndex }: { member: TeamMember; imageIndex: number }) => (
    <div className="bg-white border border-dark/5 shadow-md flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-light/50">
        <Image
          src={memberImages[imageIndex]}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Identity Box */}
      <div className="relative z-10 w-[90%] mx-auto -mt-8 bg-orange text-white text-center py-4 px-3 shadow-lg group-hover:bg-orange/95 transition-colors flex flex-col items-center justify-center min-h-[80px]">
        <h4 className="font-poppins text-sm font-bold tracking-wide mb-1">
          {member.name}
        </h4>
        <p className="font-poppins text-[10px] font-medium opacity-90 leading-tight uppercase tracking-wider">
          {member.role}
        </p>
      </div>

      {/* Description */}
      <div className="p-5 pt-5 text-center flex-grow flex flex-col items-center justify-start">
        <p className="font-inter text-xs text-dark/70 leading-relaxed line-clamp-3">
          {member.desc}
        </p>
      </div>

      {/* Voir + Button */}
      <div className="px-5 pb-5 flex justify-center">
        <button
          onClick={() => setSelectedMember({ member, imageIndex })}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-accent text-accent text-xs font-semibold font-poppins uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-200 group/btn"
          aria-label={`Voir le profil de ${member.name}`}
        >
          <span>{viewMoreLabel}</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-24 bg-light/30 border-t border-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {/* Header */}
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
            <div className="flex justify-center mb-8">
              {t.aboutPage.leadership.members.length > 0 && (() => {
                const president = t.aboutPage.leadership.members[0];
                return (
                  <div className="w-full max-w-[400px] bg-white border border-dark/5 shadow-xl flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-light/50">
                      <Image
                        src={memberImages[0]}
                        alt={president.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Identity Box */}
                    <div className="relative z-10 w-[85%] mx-auto -mt-12 bg-orange text-white text-center py-5 px-4 shadow-lg group-hover:bg-orange/95 transition-colors flex flex-col items-center justify-center min-h-[90px]">
                      <h4 className="font-poppins text-lg sm:text-xl font-bold tracking-wide mb-1">
                        {president.name}
                      </h4>
                      <p className="font-poppins text-xs sm:text-sm font-medium opacity-90 leading-tight uppercase tracking-wider">
                        {president.role}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="p-8 pt-6 text-center flex-grow flex flex-col items-center justify-start">
                      <p className="font-inter text-base text-dark/70 leading-relaxed">
                        {president.desc}
                      </p>
                    </div>

                    {/* Voir + Button */}
                    <div className="px-8 pb-8 flex justify-center">
                      <button
                        onClick={() => setSelectedMember({ member: president, imageIndex: 0 })}
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-accent text-accent text-sm font-semibold font-poppins uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-200 group/btn"
                        aria-label={`Voir le profil de ${president.name}`}
                      >
                        <span>{viewMoreLabel}</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Rest of the team (8 Members in 4-col grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {t.aboutPage.leadership.members.slice(1).map((member, index) => (
                <MemberCard key={index + 1} member={member} imageIndex={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mini CV Modal ─── */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Profil de ${selectedMember.member.name}`}
        >
          <div
            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo Section */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto flex-shrink-0 bg-primary/10 overflow-hidden">
              {/* Skeleton shimmer shown while image is loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-shimmer" />
              )}
              <Image
                src={memberImages[selectedMember.imageIndex]}
                alt={selectedMember.member.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-cover object-top transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="eager"
                onLoad={() => setImageLoaded(true)}
              />
              {/* Gradient overlay on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent md:hidden" />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="bg-primary px-6 pt-6 pb-5 relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-montserrat text-xl font-extrabold text-white leading-tight pr-10">
                  {selectedMember.member.name}
                </h3>
                <span className="inline-block mt-2 px-3 py-1 bg-orange text-white text-xs font-poppins font-semibold uppercase tracking-wider">
                  {selectedMember.member.role}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 p-6 space-y-5">
                {/* Bio */}
                <div>
                  <p className="font-inter text-sm text-dark/80 leading-relaxed">
                    {selectedMember.member.details || selectedMember.member.desc}
                  </p>
                </div>

                {/* Expertise Tags */}
                {selectedMember.member.tags && selectedMember.member.tags.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-orange" />
                      <span className="font-poppins text-xs font-bold text-primary uppercase tracking-wider">
                        Domaines d&apos;expertise
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.member.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/5 border border-primary/10 text-primary text-xs font-inter font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-dark/5 bg-light/30">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-full py-2.5 bg-orange text-white font-poppins text-sm font-semibold uppercase tracking-wider hover:bg-orange/90 transition-colors duration-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }
        .animate-shimmer {
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite linear;
        }
      `}</style>
    </>
  );
};

export default TeamSection;
