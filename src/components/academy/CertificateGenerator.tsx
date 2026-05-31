"use client";

import React, { useRef } from "react";
import { Download, Calendar, BarChart, FileText, CheckCircle, QrCode } from "lucide-react";
import html2canvas from "html2canvas";
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
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Better quality
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
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

  // Generate a fake certificate reference
  const year = new Date().getFullYear();
  const certRef = `SNC-GAS-${year}-001`;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 my-8 w-full overflow-x-auto">
      {/* Visual representation of the certificate */}
      <div 
        ref={certificateRef}
        className="w-[1123px] h-[794px] bg-white relative overflow-hidden shadow-2xl flex-shrink-0"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* ================= CORNER DECORATIONS ================= */}
        {/* Top Left */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#ff6b00] rounded-full opacity-90" />
        <div className="absolute -top-24 -left-40 w-96 h-96 bg-green-600 rounded-full opacity-90" />
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-[#0F1D33] rounded-full opacity-100" />
        
        {/* Bottom Left */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#ff6b00] rounded-full opacity-90" />
        <div className="absolute -bottom-24 -left-40 w-96 h-96 bg-green-600 rounded-full opacity-90" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-[#0F1D33] rounded-full opacity-100" />
        
        {/* Bottom Right */}
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-[#ff6b00] rounded-full opacity-100" />
        <div className="absolute -bottom-24 -right-40 w-96 h-96 bg-[#0F1D33] rounded-full opacity-100" />

        {/* Thin Inner Border */}
        <div className="absolute top-4 left-4 w-[calc(100%-32px)] h-[calc(100%-32px)] border border-gray-300 pointer-events-none z-0" />

        {/* ================= CONTENT CONTAINER ================= */}
        <div className="relative z-10 flex flex-col h-full px-20 py-10">
          
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-48"></div> {/* Spacer to center the logo */}
            <div className="flex flex-col items-center">
              <img src="/images/logo.png" alt="SaniNova Logo" className="h-20 object-contain" crossOrigin="anonymous" />
            </div>
            <div className="w-48 text-right">
              <p className="text-[#0F1D33] font-bold text-xs uppercase tracking-wider mb-1">N° De Certificat</p>
              <p className="text-green-600 font-bold text-sm">{certRef}</p>
            </div>
          </div>

          {/* TITLE SECTION */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-[#0F1D33] uppercase tracking-wide mb-2">
              Attestation de Réussite
            </h1>
            <h2 className="text-green-600 font-bold uppercase tracking-widest text-lg mb-1">
              SANINOVA ACADEMY
            </h2>
            <p className="text-[#0F1D33] font-medium text-sm tracking-widest">
              Learning • Innovation • Excellence
            </p>
            
            {/* Small decorative leaf or icon */}
            <div className="mt-4 flex justify-center">
              <div className="w-32 border-t-2 border-[#ff6b00] relative">
                 <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-2">
                    <span className="text-[#ff6b00] text-xl">❦</span>
                 </div>
              </div>
            </div>
          </div>

          {/* RECIPIENT SECTION */}
          <div className="text-center mb-8">
            <p className="text-[#0F1D33] font-medium text-lg mb-2">Décernée à</p>
            <h3 className="text-5xl font-bold text-[#0F1D33] uppercase tracking-wide border-b border-gray-300 pb-4 inline-block px-12">
              {studentName}
            </h3>
          </div>

          {/* COURSE SECTION */}
          <div className="text-center mb-10 max-w-4xl mx-auto">
            <p className="text-gray-600 text-sm mb-4">
              Pour avoir suivi avec succès et validé l'ensemble des exigences pédagogiques du module de formation :
            </p>
            <h4 className="text-3xl font-black text-green-600 uppercase mb-4">
              {courseName}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed px-12">
              Cette attestation certifie que le participant a acquis les connaissances et compétences fondamentales 
              relatives à la planification des approvisionnements, à la gestion des stocks, au suivi logistique 
              et à l'optimisation de la chaîne d'approvisionnement.
            </p>
          </div>

          {/* STATS SECTION */}
          <div className="flex justify-center gap-12 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-xs font-bold uppercase">Date de délivrance</p>
                <p className="text-gray-800 font-bold">{date}</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-gray-300"></div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0F1D33] flex items-center justify-center text-white">
                <BarChart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-xs font-bold uppercase">Score Obtenu</p>
                <p className="text-gray-800 font-bold">{score} %</p>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-300"></div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#ff6b00] flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0F1D33] text-xs font-bold uppercase">Référence du certificat</p>
                <p className="text-gray-800 font-bold">{certRef}</p>
              </div>
            </div>
          </div>

          {/* FOOTER SIGNATURES & SEAL */}
          <div className="flex justify-between items-end px-12 mt-auto">
            {/* Signature 1 */}
            <div className="text-center w-64">
              <div className="h-16 flex items-center justify-center mb-2">
                 <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "40px", color: "#0F1D33" }}>H. Amou</div>
              </div>
              <div className="w-full border-t border-gray-400 pt-2">
                <p className="font-bold text-[#0F1D33] text-xs uppercase">Direction Générale</p>
                <p className="text-gray-500 text-xs">SaniNova Global Consulting</p>
              </div>
            </div>
            
            {/* Center Seal */}
            <div className="relative flex flex-col items-center">
              <div className="w-28 h-28 bg-white rounded-full border-4 border-[#0F1D33] flex items-center justify-center shadow-lg relative z-10">
                <div className="w-24 h-24 bg-[#0F1D33] rounded-full flex items-center justify-center border-4 border-yellow-400 border-dashed">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <img src="/images/logo.png" alt="Seal" className="h-10 object-contain" crossOrigin="anonymous" />
                   </div>
                </div>
              </div>
              {/* Seal Ribbons */}
              <div className="absolute -bottom-6 flex justify-center w-full z-0 gap-2">
                 <div className="w-8 h-12 bg-[#0F1D33]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
                 <div className="w-8 h-12 bg-green-600" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
              </div>
            </div>

            {/* Signature 2 */}
            <div className="text-center w-64">
              <div className="h-16 flex items-center justify-center mb-2">
                 <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "40px", color: "#0F1D33" }}>H. Amou</div>
              </div>
              <div className="w-full border-t border-gray-400 pt-2">
                <p className="font-bold text-[#0F1D33] text-xs uppercase">Responsable Académie</p>
                <p className="text-gray-500 text-xs">SaniNova Academy</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* ================= RIGHT SIDE BADGE ================= */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center py-6 px-4 z-20">
           <div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center mb-2 text-green-600">
             <CheckCircle className="w-6 h-6" />
           </div>
           <p className="text-[#0F1D33] font-bold text-[10px] uppercase text-center mb-1">Certificat</p>
           <p className="text-green-600 font-bold text-[10px] uppercase text-center mb-4">Vérifié</p>
           
           <div className="w-full aspect-square bg-white border border-gray-300 p-1 mb-3">
             {/* Fake QR Code */}
             <QrCode className="w-full h-full text-[#0F1D33]" />
           </div>
           
           <p className="text-gray-400 text-[8px] text-center leading-tight">
             Scannez pour vérifier l'authenticité de ce certificat en ligne.
           </p>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-[#0F1D33] flex items-center justify-center z-20">
           <div className="flex items-center gap-2 text-white">
              <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                 <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
              <span className="text-xs tracking-wider">www.saninovagc.com</span>
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
