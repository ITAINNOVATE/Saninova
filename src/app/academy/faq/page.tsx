"use client";

import React from "react";
import AcademyFAQ from "../../../components/academy/AcademyFAQ";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AcademyFAQPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/academy" className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'Académie
          </Link>
          <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 shadow-xl">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-montserrat font-black text-white mb-6">
            Centre d'Aide Academy
          </h1>
          <p className="text-white/50 text-lg font-poppins max-w-2xl mx-auto">
            Retrouvez ici toutes les réponses à vos questions concernant nos formations, les modalités de paiement et les certifications.
          </p>
        </div>

        <AcademyFAQ />

        {/* Support CTA */}
        <div className="mt-24 max-w-4xl mx-auto bg-white/5 rounded-[40px] border border-white/5 p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-4">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Notre équipe de support est disponible pour vous accompagner dans votre parcours de formation.
          </p>
          <Link 
            href="/contact" 
            className="px-10 py-5 bg-orange text-white rounded-2xl font-black shadow-xl shadow-orange/20 hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            Nous contacter <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
