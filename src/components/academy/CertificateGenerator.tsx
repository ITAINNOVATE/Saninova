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
        pixelRatio: 2, // High resolution
        backgroundColor: '#ffffff' // Ensure background is strictly white
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
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* ================= CORNER SVGs ================= */}
        {/* Top-Left Corner */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L400,0 C350,150 150,350 0,400 Z" fill="#ff6b00" opacity="0.9" />
            <path d="M0,0 L350,0 C300,120 120,300 0,350 Z" fill="#16a34a" />
            <path d="M0,0 L250,0 C200,90 90,200 0,250 Z" fill="#0F1D33" />
          </svg>
        </div>

        {/* Bottom-Left Corner */}
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none z-0">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-90deg)' }}>
            <path d="M0,0 L300,0 C250,120 120,250 0,300 Z" fill="#16a34a" opacity="0.9" />
            <path d="M0,0 L200,0 C150,80 80,150 0,200 Z" fill="#0F1D33" />
          </svg>
        </div>

        {/* Bottom-Right Corner */}
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] pointer-events-none z-0">
          <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
             <path d="M0,0 L350,0 C300,120 120,300 0,350 Z" fill="#ff6b00" />
             <path d="M0,0 L250,0 C200,90 90,200 0,250 Z" fill="#0F1D33" />
          </svg>
        </div>

        {/* Thin Border Frame */}
        <div className="absolute top-4 left-4 w-[calc(100%-32px)] h-[calc(100%-32px)] border-[1.5px] border-[#0F1D33]/20 pointer-events-none z-0 rounded-sm" />

        {/* ================= CONTENT CONTAINER ================= */}
        <div className="relative z-10 flex flex-col h-full px-24 py-12">
          
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
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
          <div className="text-center mb-6">
            <h1 className="text-4xl font-black text-[#0F1D33] uppercase tracking-wide mb-1">
              Attestation de Réussite
            </h1>
            <h2 className="text-green-600 font-bold uppercase tracking-widest text-lg mb-1">
              SANINOVA ACADEMY
            </h2>
            <p className="text-[#0F1D33] font-medium text-sm tracking-widest">
              Learning <span className="text-[#ff6b00]">●</span> Innovation <span className="text-[#ff6b00]">●</span> Excellence
            </p>
            
            {/* Divider */}
            <div className="mt-4 flex justify-center items-center gap-2 max-w-sm mx-auto">
              <div className="h-px bg-[#ff6b00] flex-1"></div>
              <Leaf className="w-4 h-4 text-[#ff6b00]" />
              <div className="h-px bg-[#ff6b00] flex-1"></div>
            </div>
          </div>

          {/* RECIPIENT SECTION */}
          <div className="text-center mb-6">
            <p className="text-[#0F1D33] font-bold text-base mb-2">Décernée à</p>
            <h3 className="text-5xl font-bold text-[#0F1D33] uppercase tracking-wider border-b-2 border-gray-300 pb-2 inline-block px-12">
              {studentName}
            </h3>
          </div>

          {/* COURSE SECTION */}
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <p className="text-[#0F1D33] font-medium text-[15px] mb-3">
              Pour avoir suivi avec succès et validé l'ensemble des exigences pédagogiques du module de formation :
            </p>
            <h4 className="text-3xl font-black text-green-700 uppercase tracking-wide mb-3">
              {courseName}
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed px-12 font-medium">
              Cette attestation certifie que le participant a acquis les connaissances et compétences fondamentales 
              relatives à la planification des approvisionnements, à la gestion des stocks, au suivi logistique 
              et à l'optimisation de la chaîne d'approvisionnement.
            </p>
          </div>

          {/* STATS SECTION */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-[10px] font-bold uppercase">Date de délivrance</p>
                <p className="text-[#0F1D33] font-bold text-sm">{date}</p>
              </div>
            </div>
            
            <div className="w-px h-8 bg-gray-300"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0F1D33] flex items-center justify-center text-white">
                <BarChart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-[10px] font-bold uppercase">Score Obtenu</p>
                <p className="text-[#0F1D33] font-bold text-sm">{score} %</p>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-300"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff6b00] flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-[10px] font-bold uppercase">Référence du certificat</p>
                <p className="text-[#0F1D33] font-bold text-sm">{certRef}</p>
              </div>
            </div>
          </div>

          {/* FOOTER SIGNATURES & STAMP */}
          <div className="flex justify-start items-center gap-20 pl-24 mt-auto">
            
            {/* Signature */}
            <div className="text-center w-64 pt-2">
              <div className="h-16 flex items-center justify-center mb-1">
                 <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "40px", color: "#0F1D33", transform: 'rotate(-5deg)' }}>H. Amou</div>
              </div>
              <div className="w-full border-t border-gray-400 pt-1">
                <p className="font-bold text-[#0F1D33] text-sm">Dr Hope AKOHOUVI AMOU</p>
                <p className="text-gray-600 text-xs">Président de SaniNova Global Consulting</p>
              </div>
            </div>
            
            {/* Stamp */}
            <div className="relative">
               <div className="w-28 h-28 rounded-full border-2 border-[#0F1D33] flex items-center justify-center relative p-1">
                 <div className="w-full h-full rounded-full border border-dashed border-[#0F1D33] flex items-center justify-center relative">
                    {/* Circular Text (simulated with CSS for now) */}
                    <div className="absolute text-[8px] font-bold text-[#0F1D33] uppercase tracking-[2px] text-center w-full h-full animate-[spin_20s_linear_infinite]" style={{ borderRadius: '50%' }}>
                       <svg viewBox="0 0 100 100" className="w-full h-full">
                          <path id="curve" d="M 50 10 a 40 40 0 1 1 -0.1 0" fill="transparent" />
                          <text width="100%">
                             <textPath href="#curve" startOffset="10%" className="fill-[#0F1D33]">SANINOVA GLOBAL CONSULTING</textPath>
                          </text>
                       </svg>
                    </div>
                    {/* Inner Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#0F1D33] text-white flex items-center justify-center z-10 shadow-inner">
                       <span className="font-bold text-xs">Sani<span className="text-[#ff6b00]">Nova</span></span>
                    </div>
                 </div>
               </div>
            </div>

          </div>

          {/* Validation text */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-2">
             <CheckCircle className="w-4 h-4 text-green-600" />
             <p className="text-gray-500 text-[10px] font-medium">Ce certificat est émis électroniquement et est valide sans signature manuscrite.</p>
          </div>
          
        </div>

        {/* ================= RIGHT SIDE BADGE ================= */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[120px] bg-[#f8fafc] rounded-[20px] border border-gray-200 shadow-sm flex flex-col items-center py-6 px-3 z-20">
           <div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center mb-2 bg-white text-green-600">
             <CheckCircle className="w-6 h-6" />
           </div>
           <p className="text-[#0F1D33] font-bold text-[10px] uppercase text-center mb-1">Certificat</p>
           <p className="text-green-600 font-bold text-[10px] uppercase text-center mb-4">Vérifié</p>
           
           <div className="w-full aspect-square bg-white border border-gray-300 p-1.5 mb-3 rounded-md">
             {/* Fake QR Code */}
             <QrCode className="w-full h-full text-[#0F1D33]" strokeWidth={1.5} />
           </div>
           
           <p className="text-gray-500 text-[8px] text-center leading-snug px-1">
             Scannez pour vérifier l'authenticité de ce certificat en ligne.
           </p>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-[#0F1D33] flex items-center justify-between px-20 z-20">
           <div></div>
           <div className="flex items-center gap-2 text-white/90">
              <Globe className="w-4 h-4" />
              <span className="text-[13px] tracking-wider font-medium">www.saninovagc.com</span>
           </div>
           <div className="flex items-center gap-4 text-[#0F1D33]">
             <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
               <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </div>
             <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
               <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
             </div>
             <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
               <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </div>
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
