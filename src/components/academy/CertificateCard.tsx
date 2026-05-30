"use client";

import React, { useState, useEffect } from "react";
import { Award, Printer, Share2, ShieldCheck, Check, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

interface CertificateCardProps {
  courseTitle: string;
  courseSlug: string;
  chapters?: string[];
}

export default function CertificateCard({ courseTitle, courseSlug, chapters }: CertificateCardProps) {
  const [studentName, setStudentName] = useState("Dr. Ambroise Gbaguidi");
  const [isEditing, setIsEditing] = useState(false);
  const [certId, setCertId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    // Generate static certificate date and unique ID
    const today = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    setCurrentDate(today);

    // Generate pseudo-random verification ID
    const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCertId(`SN-ACAD-${randomHash}`);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Editor & Instructions widget */}
      <div className="bg-[#0F1D33] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl max-w-5xl mx-auto">
        <div>
          <h4 className="text-white font-bold text-base mb-1">Félicitations pour votre réussite !</h4>
          <p className="text-white/40 text-xs font-medium">Vous pouvez personnaliser le nom imprimé sur votre attestation ci-dessous.</p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="bg-white/5 border border-orange/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange"
                placeholder="Votre nom complet"
              />
              <button
                onClick={() => setIsEditing(false)}
                className="p-2.5 bg-orange text-white rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
              <span className="text-white font-bold text-sm">{studentName}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-orange hover:text-orange/80 transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div className="print:bg-white print:p-0 p-4 max-w-5xl mx-auto relative group">
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { size: A4 landscape; margin: 0; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          .signature-font { font-family: "Brush Script MT", "Lucida Handwriting", cursive; }
        `}} />
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white to-primary/10 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000 pointer-events-none print:hidden" />

        <div 
          id="certificate-print-area" 
          className="relative bg-white border-[12px] border-double border-primary/20 rounded-[36px] p-8 md:p-12 text-center shadow-2xl overflow-hidden print:border-primary print:shadow-none print:w-[297mm] print:h-[210mm] print:rounded-none flex flex-col justify-center"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary/30 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary/30 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary/30 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary/30 rounded-br-2xl pointer-events-none" />

          {/* SaniNova Branding Header */}
          <div className="mb-6 relative z-10 flex flex-col items-center">
            <img src="/images/logo_sani_nova.png" alt="SaniNova Logo" className="h-16 object-contain mb-3 drop-shadow-md" />
            <span className="text-primary font-extrabold text-xs uppercase tracking-[0.25em] mb-1">SaniNova Global Consulting</span>
            <span className="text-dark/40 text-[9px] font-black uppercase tracking-[0.4em]">Academy of Health Excellence</span>
          </div>

          {/* Certificate Main Title */}
          <div className="mb-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-montserrat font-black text-orange uppercase tracking-wide leading-tight mb-4">
              Attestation de Réussite
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          {/* Recipient Details */}
          <div className="mb-6 relative z-10">
            <p className="text-dark/60 text-sm italic font-medium mb-3">Cette attestation officielle est fièrement décernée à</p>
            <h3 className="text-3xl md:text-4xl font-montserrat font-extrabold text-primary mb-4 underline decoration-orange/30 decoration-2 underline-offset-8">
              {studentName}
            </h3>
            <p className="text-dark/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Pour avoir suivi avec assiduité et validé avec succès le programme de formation eLearning de haut niveau intitulé :
            </p>
          </div>

          {/* Course Title Badge & Chapters */}
          <div className="mb-8 relative z-10">
            <div className="inline-block bg-primary/5 border border-primary/10 px-8 py-4 rounded-2xl max-w-3xl mb-4 shadow-sm">
              <h4 className="text-primary font-montserrat font-black text-xl md:text-2xl leading-snug">
                {courseTitle}
              </h4>
            </div>
            
            {chapters && chapters.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-2">Compétences et modules validés</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {chapters.map((chapter, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-dark/10 rounded-full text-[9px] font-semibold text-dark/70 shadow-sm">
                      {chapter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Verification Details & Signature Panel */}
          <div className="grid grid-cols-3 gap-4 items-end relative z-10 pt-4 border-t border-dark/5">
            {/* Left side: Date & Auth stamp */}
            <div className="text-center space-y-1">
              <p className="text-dark/40 text-[10px] font-bold uppercase tracking-wider">Délivré le</p>
              <p className="text-primary font-bold text-sm">{currentDate}</p>
              <div className="mt-3 flex flex-col items-center space-y-1.5">
                <div className="flex items-center gap-1.5 text-accent font-extrabold text-xs bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4" /> Authentique & Vérifié
                </div>
                <p className="text-dark/30 text-[8px] font-bold font-mono uppercase tracking-widest">ID: {certId}</p>
              </div>
            </div>

            {/* Center: Stamp/Cachet */}
            <div className="flex justify-center items-center">
              <div className="relative w-24 h-24 border-4 border-double border-red-600/70 rounded-full flex items-center justify-center rotate-[-15deg] opacity-80 mix-blend-multiply shadow-inner">
                <div className="absolute inset-1.5 border border-red-600/40 rounded-full" />
                <div className="text-center">
                  <p className="text-red-600/80 font-black text-[7px] uppercase tracking-widest">SaniNova Global</p>
                  <p className="text-red-600/60 text-[5px] uppercase tracking-widest leading-tight">Consulting</p>
                  <p className="text-red-600/90 font-bold text-[8px] uppercase mt-1 border-t border-red-600/30 pt-0.5">Officiel</p>
                </div>
              </div>
            </div>

            {/* Right side: Director signature */}
            <div className="text-center space-y-1">
              <div className="h-14 flex items-center justify-center text-primary font-bold text-3xl opacity-90 select-none signature-font -rotate-3 mb-1">
                Hope A. A.
              </div>
              <div className="w-32 h-px bg-dark/20 mx-auto mb-1.5" />
              <p className="text-primary font-black text-[11px] uppercase tracking-wider">Dr Hope AKOHOUVI AMOU</p>
              <p className="text-dark/40 text-[9px] font-bold uppercase tracking-widest">Le Président</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Actions Buttons */}
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto pb-12">
        <button
          onClick={handlePrint}
          className="px-8 py-4 bg-white text-dark font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
        >
          <Printer className="w-5 h-5 text-dark" /> Imprimer / Télécharger en PDF
        </button>

        <button
          onClick={handleShare}
          className="px-8 py-4 bg-orange text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-orange/20"
        >
          <Share2 className="w-5 h-5 text-white" /> {shareSuccess ? "Lien copié !" : "Partager sur LinkedIn"}
        </button>
      </div>
    </div>
  );
}
