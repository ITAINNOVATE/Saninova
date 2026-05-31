"use client";

import React, { useRef } from "react";
import { Award, Download } from "lucide-react";
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

  return (
    <div className="flex flex-col items-center justify-center space-y-8 my-8 w-full overflow-x-auto">
      {/* Visual representation of the certificate */}
      <div 
        ref={certificateRef}
        className="w-[1123px] h-[794px] bg-white text-black p-16 relative overflow-hidden shadow-2xl flex-shrink-0"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Border / Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full border-[16px] border-[#0F1D33] pointer-events-none" />
        <div className="absolute top-5 left-5 w-[calc(100%-40px)] h-[calc(100%-40px)] border-[3px] border-[#ff6b00] pointer-events-none" />
        
        {/* Background Decorative Graphic */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ff6b00]/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#0F1D33]/5 rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          
          <div className="mb-8">
            {/* Real Logo SaniNova */}
            <img src="/images/logo.png" alt="SaniNova Logo" className="h-24 object-contain mx-auto" crossOrigin="anonymous" />
          </div>
          
          <h1 className="text-5xl font-black text-[#0F1D33] uppercase tracking-widest mb-4">
            Attestation de Réussite
          </h1>
          <p className="text-[#ff6b00] font-bold uppercase tracking-widest text-lg mb-10">
            Académie Supply Chain Santé
          </p>
          
          <p className="text-xl text-gray-700 italic mb-4">
            Décernée à
          </p>
          <h2 className="text-5xl font-bold text-[#0F1D33] mb-10 capitalize">
            {studentName}
          </h2>
          
          <p className="text-xl text-gray-700 mb-6 max-w-4xl leading-relaxed">
            Pour avoir complété avec succès et obtenu le score de <strong className="text-[#ff6b00]">{score}%</strong> à l'évaluation finale de la formation :
          </p>
          
          <h3 className="text-3xl font-bold text-[#0F1D33] mb-16 uppercase tracking-wide px-12 border-b-2 border-gray-200 pb-6 inline-block">
            {courseName}
          </h3>
          
          <div className="flex justify-between items-end w-full px-16 mt-auto">
            {/* Date Section */}
            <div className="text-center w-72">
              <p className="font-bold text-[#0F1D33] text-xl mb-2">{date}</p>
              <div className="w-full border-b-2 border-gray-400 mb-2" />
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Date de délivrance</p>
            </div>
            
            {/* Center Badge */}
            <div className="flex flex-col items-center pb-4">
              <div className="w-24 h-24 bg-[#ff6b00]/10 rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-[#ff6b00]" />
              </div>
            </div>
            
            {/* Signatory Section */}
            <div className="text-center w-72">
              <div className="h-16 flex items-center justify-center">
                 <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "36px", color: "#0F1D33" }}>H. Amou</div>
              </div>
              <div className="w-full border-b-2 border-gray-400 mb-2" />
              <p className="font-bold text-[#0F1D33] text-lg">Dr Hope AKOHOUVI AMOU</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1">Président de SaniNova Global Consulting</p>
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
