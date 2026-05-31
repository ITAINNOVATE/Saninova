"use client";

import React, { useRef } from "react";
import { Download, Calendar, BarChart, FileText, CheckCircle, QrCode, Globe, Leaf } from "lucide-react";
// @ts-ignore
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";

interface CertificateProps {
  studentName: string;
  courseName: string;
  score: number;
  date: string;
}

export default function CertificateGenerator({ studentName, courseName, score, date }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    try {
      const node = certificateRef.current;
      
      const imgData = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true, // Fix disappearing text bug!
        style: {
          fontFamily: 'Arial, Helvetica, sans-serif'
        }
      });
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Attestation_${courseName.replace(/\s+/g, "_")}.pdf`);
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      alert(`Une erreur s'est produite lors de la génération du certificat : ${error.message || String(error)}`);
    }
  };

  const year = new Date().getFullYear();
  const certRef = `SNC-GAS-${year}-001`;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 my-8 w-full overflow-x-auto">
      {/* Certificate Container */}
      <div 
        ref={certificateRef}
        className="w-[1123px] h-[794px] bg-white relative overflow-hidden flex-shrink-0 border border-gray-200"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {/* ================= SIMPLE CORNERS ================= */}
        {/* Top-Left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0F1D33] rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-600 rounded-full opacity-20 pointer-events-none"></div>
        
        {/* Bottom-Right */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ff6b00] rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#0F1D33] rounded-full opacity-10 pointer-events-none"></div>

        {/* Thin Border Frame */}
        <div className="absolute top-6 left-6 w-[calc(100%-48px)] h-[calc(100%-48px)] border-2 border-[#0F1D33]/20 pointer-events-none z-0 rounded-xl" />

        {/* ================= CONTENT CONTAINER ================= */}
        <div className="relative z-10 flex flex-col h-full px-24 py-14">
          
          {/* HEADER */}
          <div className="flex justify-between items-start mb-8">
            <div className="w-64"></div>
            <div className="flex flex-col items-center">
              <img src="/images/logo.png" alt="SaniNova Logo" className="h-20 object-contain" crossOrigin="anonymous" />
            </div>
            <div className="w-64 text-right pr-4">
              <p className="text-[#0F1D33] font-bold text-xs uppercase tracking-wider mb-1">N° De Certificat</p>
              <p className="text-green-700 font-bold text-sm tracking-wide">{certRef}</p>
            </div>
          </div>

          {/* TITLE SECTION */}
          <div className="text-center mb-8">
            <div className="text-4xl font-black text-[#0F1D33] uppercase tracking-wide mb-2">
              Attestation de Réussite
            </div>
            <div className="text-green-600 font-bold uppercase tracking-widest text-lg mb-2">
              SANINOVA ACADEMY
            </div>
            <p className="text-[#0F1D33] font-medium text-sm tracking-widest">
              Learning <span className="text-[#ff6b00] px-1">●</span> Innovation <span className="text-[#ff6b00] px-1">●</span> Excellence
            </p>
          </div>

          {/* RECIPIENT SECTION */}
          <div className="text-center mb-8">
            <p className="text-[#0F1D33] font-bold text-lg mb-2">Décernée à</p>
            <div className="text-5xl font-bold text-[#0F1D33] uppercase tracking-wider border-b-2 border-gray-300 pb-2 inline-block px-12">
              {studentName}
            </div>
          </div>

          {/* COURSE SECTION */}
          <div className="text-center mb-10 max-w-4xl mx-auto">
            <p className="text-[#0F1D33] font-medium text-base mb-4">
              Pour avoir suivi avec succès et validé l'ensemble des exigences pédagogiques du module de formation :
            </p>
            <div className="text-3xl font-black text-green-700 uppercase tracking-wide mb-4">
              {courseName}
            </div>
            <p className="text-gray-800 text-sm leading-relaxed px-12 font-medium">
              Cette attestation certifie que le participant a acquis les connaissances et compétences fondamentales 
              relatives à la planification des approvisionnements, à la gestion des stocks, au suivi logistique 
              et à l'optimisation de la chaîne d'approvisionnement.
            </p>
          </div>

          {/* STATS SECTION */}
          <div className="flex justify-center items-center gap-10 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-[11px] font-bold uppercase">Date de délivrance</p>
                <p className="text-[#0F1D33] font-bold text-base">{date}</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-gray-300"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0F1D33] flex items-center justify-center text-white">
                <BarChart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-[11px] font-bold uppercase">Score Obtenu</p>
                <p className="text-[#0F1D33] font-bold text-base">{score} %</p>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-300"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff6b00] flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-[11px] font-bold uppercase">Référence</p>
                <p className="text-[#0F1D33] font-bold text-base">{certRef}</p>
              </div>
            </div>
          </div>

          {/* FOOTER SIGNATURES & STAMP */}
          <div className="flex justify-start items-center gap-24 pl-24 mt-auto">
            {/* Signature */}
            <div className="text-center w-64 pt-2">
              <div className="h-16 flex items-center justify-center mb-1">
                 <div style={{ fontFamily: "Georgia, serif", fontSize: "36px", color: "#0F1D33", fontStyle: 'italic' }}>H. Amou</div>
              </div>
              <div className="w-full border-t border-gray-400 pt-2">
                <p className="font-bold text-[#0F1D33] text-sm">Dr Hope AKOHOUVI AMOU</p>
                <p className="text-gray-700 text-xs mt-1">Président de SaniNova Global Consulting</p>
              </div>
            </div>
            
            {/* Stamp */}
            <div className="relative">
               <div className="w-28 h-28 rounded-full border-2 border-[#0F1D33] flex items-center justify-center relative p-1">
                 <div className="w-full h-full rounded-full border border-dashed border-[#0F1D33] flex items-center justify-center relative bg-blue-50/30">
                    <div className="text-center">
                       <p className="text-[9px] font-black text-[#0F1D33] uppercase tracking-widest leading-tight">SaniNova<br/>Global<br/>Consulting</p>
                       <div className="w-full h-px bg-[#0F1D33] my-1 opacity-50"></div>
                       <p className="text-[7px] font-bold text-green-700 uppercase">Certifié</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="absolute bottom-0 left-0 w-full h-[50px] bg-[#0F1D33] flex items-center justify-between px-20 z-20">
           <div className="flex items-center gap-2 text-white/90">
             <CheckCircle className="w-4 h-4 text-green-500" />
             <span className="text-[11px] font-medium text-gray-300">Ce certificat est émis électroniquement et est valide sans signature manuscrite.</span>
           </div>
           <div className="flex items-center gap-2 text-white/90">
              <Globe className="w-4 h-4" />
              <span className="text-[13px] tracking-wider font-medium">www.saninovagc.com</span>
           </div>
        </div>
      </div>

      <button
        onClick={downloadCertificate}
        className="flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e66000] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 shadow-xl"
      >
        <Download className="w-6 h-6" />
        Télécharger mon attestation en PDF
      </button>
    </div>
  );
}
