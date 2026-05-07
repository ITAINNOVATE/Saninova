"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export const Partners: React.FC = () => {
  const { t } = useLanguage();

  const partnerLogos = [
    {
      name: "OMS Afrique",
      svg: (
        <svg viewBox="0 0 200 60" fill="none" className="w-full h-full max-h-12 text-current opacity-60 hover:opacity-100 transition-opacity duration-300">
          <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" className="font-montserrat text-lg font-extrabold tracking-widest">OMS AFRIQUE</text>
          <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" className="font-poppins text-[8px] tracking-widest uppercase opacity-60">SANTÉ PUBLIQUE</text>
        </svg>
      )
    },
    {
      name: "MINISTÈRE DE LA SANTÉ",
      svg: (
        <svg viewBox="0 0 200 60" fill="none" className="w-full h-full max-h-12 text-current opacity-60 hover:opacity-100 transition-opacity duration-300">
          <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" className="font-montserrat text-base font-extrabold tracking-wide">MINISTÈRE DE LA SANTÉ</text>
          <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" className="font-poppins text-[8px] tracking-widest uppercase opacity-60">RÉPUBLIQUE DU BÉNIN</text>
        </svg>
      )
    },
    {
      name: "BANQUE MONDIALE",
      svg: (
        <svg viewBox="0 0 200 60" fill="none" className="w-full h-full max-h-12 text-current opacity-60 hover:opacity-100 transition-opacity duration-300">
          <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" className="font-montserrat text-base font-extrabold tracking-wide">BANQUE MONDIALE</text>
          <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" className="font-poppins text-[8px] tracking-widest uppercase opacity-60">SOCIÉTÉ FINANCIÈRE</text>
        </svg>
      )
    },
    {
      name: "USAID HEALTH",
      svg: (
        <svg viewBox="0 0 200 60" fill="none" className="w-full h-full max-h-12 text-current opacity-60 hover:opacity-100 transition-opacity duration-300">
          <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" className="font-montserrat text-lg font-extrabold tracking-wider">USAID | HEALTH</text>
        </svg>
      )
    },
    {
      name: "UNICEF AFRIQUE",
      svg: (
        <svg viewBox="0 0 200 60" fill="none" className="w-full h-full max-h-12 text-current opacity-60 hover:opacity-100 transition-opacity duration-300">
          <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" className="font-montserrat text-lg font-extrabold tracking-wide">unicef</text>
          <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" className="font-poppins text-[8px] tracking-widest uppercase opacity-60">POUR CHAQUE ENFANT</text>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-light">
      <div className="max-w-7xl mx-auto px-6">
        <h4 className="font-poppins text-xs font-bold text-dark/40 uppercase tracking-widest text-center mb-10">
          {t.partners.title}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-primary/70">
          {partnerLogos.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 rounded-xl hover:bg-light/50 transition-colors duration-300"
              title={partner.name}
            >
              {partner.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Partners;
