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
    <div className="flex flex-col items-center justify-center space-y-8 my-8">
      {/* Visual representation of the certificate */}
      <div 
        ref={certificateRef}
        className="w-[800px] h-[565px] bg-white text-black p-12 relative overflow-hidden shadow-2xl rounded-lg"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Border / Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full border-[12px] border-[#0F1D33] pointer-events-none" />
        <div className="absolute top-4 left-4 w-[calc(100%-32px)] h-[calc(100%-32px)] border-2 border-orange pointer-events-none" />
        
        {/* Background Logo Watermark (optional, simple circle for now) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange/5 rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="mb-6 flex items-center justify-center">
             <div className="w-16 h-16 bg-[#0F1D33] rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-black text-2xl tracking-tighter">
                  Sani<span className="text-orange">Nova</span>
                </span>
             </div>
          </div>
          
          <h1 className="text-4xl font-black text-[#0F1D33] uppercase tracking-widest mb-2">
            Attestation de Réussite
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">
            Académie Supply Chain Santé
          </p>
          
          <p className="text-lg text-gray-700 italic mb-4">
            Décernée à
          </p>
          <h2 className="text-4xl font-bold text-orange mb-8 capitalize">
            {studentName}
          </h2>
          
          <p className="text-lg text-gray-700 mb-4">
            Pour avoir complété avec succès et obtenu le score de <strong className="text-[#0F1D33]">{score}%</strong> à l'évaluation finale de la formation :
          </p>
          <h3 className="text-2xl font-bold text-[#0F1D33] mb-12 uppercase tracking-wide px-12">
            {courseName}
          </h3>
          
          <div className="flex justify-between w-full px-16 mt-auto">
            <div className="text-center">
              <div className="w-40 border-b-2 border-gray-400 mb-2" />
              <p className="text-sm text-gray-500 uppercase">Date de délivrance</p>
              <p className="font-bold text-[#0F1D33]">{date}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Award className="w-16 h-16 text-orange mb-2" />
            </div>
            
            <div className="text-center">
              <div className="w-40 border-b-2 border-gray-400 mb-2 mx-auto">
                 <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "24px", color: "#0F1D33", marginTop: "-30px", marginBottom: "5px" }}>Direction</div>
              </div>
              <p className="text-sm text-gray-500 uppercase">Direction SaniNova</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadCertificate}
        className="flex items-center gap-2 bg-orange hover:bg-[#ff7a33] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1"
      >
        <Download className="w-5 h-5" />
        Télécharger mon attestation en PDF
      </button>
    </div>
  );
}
