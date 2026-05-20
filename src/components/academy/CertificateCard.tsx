"use client";

import React, { useState, useEffect } from "react";
import { Award, Printer, Share2, ShieldCheck, Check, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

interface CertificateCardProps {
  courseTitle: string;
  courseSlug: string;
}

export default function CertificateCard({ courseTitle, courseSlug }: CertificateCardProps) {
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
          <p className="text-white/40 text-xs font-medium">Vous pouvez personnaliser le nom imprimé sur votre certificat ci-dessous.</p>
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
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange/10 to-amber-500/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000 pointer-events-none" />

        <div 
          id="certificate-print-area" 
          className="relative bg-[#070F1E] border-[12px] border-double border-amber-600/40 rounded-[36px] p-8 md:p-16 text-center shadow-2xl overflow-hidden print:border-amber-600 print:text-black print:bg-white print:shadow-none"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-amber-500/30 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-amber-500/30 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-amber-500/30 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-amber-500/30 rounded-br-2xl pointer-events-none" />

          {/* Background Watermark Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02)_0%,transparent_70%)] pointer-events-none" />

          {/* SaniNova Branding Header */}
          <div className="mb-8 relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange rounded-2xl flex items-center justify-center text-dark shadow-xl mb-4">
              <Award className="w-9 h-9" />
            </div>
            <span className="text-amber-500 font-extrabold text-sm uppercase tracking-[0.25em] mb-1">SaniNova Global Consulting</span>
            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] print:text-black/50">Academy of Health Excellence</span>
          </div>

          {/* Certificate Main Title */}
          <div className="mb-10 relative z-10">
            <h2 className="text-3xl md:text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 uppercase tracking-wide leading-tight mb-4 print:text-amber-600 print:bg-none">
              Certificat de Réussite
            </h2>
            <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </div>

          {/* Recipient Details */}
          <div className="mb-10 relative z-10">
            <p className="text-white/50 text-sm italic font-medium mb-4 print:text-black/60">Ce certificat officiel est fièrement décerné à</p>
            <h3 className="text-3xl md:text-4xl font-montserrat font-extrabold text-white underline decoration-amber-500/50 decoration-2 underline-offset-8 mb-6 print:text-black">
              {studentName}
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto print:text-black/80">
              Pour avoir suivi avec assiduité et complété avec succès l'ensemble du parcours de formation eLearning théorique et pratique de haut niveau intitulé :
            </p>
          </div>

          {/* Course Title Badge */}
          <div className="mb-12 relative z-10">
            <div className="inline-block bg-white/5 border border-amber-500/20 px-8 py-5 rounded-2xl shadow-xl max-w-3xl print:border-amber-600 print:bg-black/5">
              <h4 className="text-white font-montserrat font-black text-xl md:text-2xl leading-snug print:text-black">
                {courseTitle}
              </h4>
            </div>
          </div>

          {/* Verification Details & Signature Panel */}
          <div className="grid md:grid-cols-3 gap-8 items-end relative z-10 border-t border-white/5 pt-8 print:border-black/5">
            {/* Left side: Date & Auth stamp */}
            <div className="text-left md:text-center space-y-1">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider print:text-black/40">Délivré le</p>
              <p className="text-white font-bold text-sm print:text-black">{currentDate}</p>
            </div>

            {/* Center: Certification ID & Security Seal */}
            <div className="flex flex-col items-center space-y-2 order-first md:order-none">
              <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full print:border-emerald-600 print:text-emerald-700">
                <ShieldCheck className="w-4 h-4" /> Authentique & Vérifié
              </div>
              <p className="text-white/30 text-[9px] font-bold font-mono uppercase tracking-widest print:text-black/40">ID : {certId}</p>
            </div>

            {/* Right side: Director signature mockup */}
            <div className="text-right md:text-center space-y-1">
              <div className="h-10 flex items-center justify-center font-cursive text-amber-500 font-bold italic text-lg opacity-85 select-none print:text-black">
                SaniNova Committee
              </div>
              <div className="w-24 h-px bg-white/10 mx-auto mb-2 print:bg-black/20" />
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider print:text-black/40">Direction Générale</p>
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
