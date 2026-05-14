"use client";

import React from "react";
import AcademyFAQ from "../../../components/academy/AcademyFAQ";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";

export default function AcademyFAQPage() {
  return (
    <>
      <PageHero 
        title="FAQ Academy"
        subtitle="Tout ce que vous devez savoir sur SaniNova Academy."
        backgroundImages={[
          "https://images.unsplash.com/photo-1454165833767-027ffea7025c?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <div className="mb-12">
            <Link href="/academy" className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'Académie
            </Link>
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
    </>
  );
}
