"use client";

import React, { useState, useEffect, Suspense } from "react";
import { CheckCircle2, Calendar, FileText, Mail, ArrowRight, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { staticModules } from "../../../lib/academyHelpers";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const trainingSlug = searchParams.get("training") || "";
  const reference = "SN-AC-2026-" + Math.floor(1000 + Math.random() * 9000);

  const [studentName, setStudentName] = useState("Cher Apprenant");
  const [courseDetails, setCourseDetails] = useState({
    title: "Formation Générale SaniNova",
    price: "250.000",
    currency: "XOF"
  });

  useEffect(() => {
    // Load student name from localStorage
    const savedName = localStorage.getItem("registered_fullname");
    if (savedName) {
      // Get first name
      const firstName = savedName.trim().split(" ")[0];
      setStudentName(firstName);
    }

    // Resolve course details
    if (trainingSlug) {
      const staticMatch = staticModules.find(m => m.slug === trainingSlug);
      if (staticMatch) {
        setCourseDetails({
          title: staticMatch.title,
          price: parseInt(staticMatch.price).toLocaleString('fr-FR'),
          currency: staticMatch.currency
        });
      } else {
        // Fallbacks for legacy/Supabase courses
        const databaseCourses: Record<string, { title: string; price: string; currency: string }> = {
          "gouvernance-sanitaire-afrique": {
            title: "Gouvernance Sanitaire et Leadership en Afrique",
            price: "250.000",
            currency: "XOF"
          },
          "sante-digitale-interoperabilite": {
            title: "Santé Digitale et Interopérabilité en Afrique",
            price: "350.000",
            currency: "XOF"
          },
          "regulation-pharmaceutique-avancee": {
            title: "Régulation Pharmaceutique Avancée en Afrique",
            price: "300.000",
            currency: "XOF"
          }
        };

        const match = databaseCourses[trainingSlug];
        if (match) {
          setCourseDetails({
            title: match.title,
            price: match.price,
            currency: match.currency
          });
        }
      }
    }
  }, [trainingSlug]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark flex items-center">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0F1D33] rounded-[48px] border border-white/5 p-8 md:p-16 shadow-2xl text-center relative overflow-hidden"
        >
          {/* Confetti-like decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 flex justify-center gap-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i % 2 === 0 ? "bg-orange" : "bg-accent"} opacity-20`} />
            ))}
          </div>

          <div className="w-24 h-24 bg-accent/20 rounded-[32px] flex items-center justify-center text-accent mx-auto mb-10 shadow-xl shadow-accent/10">
            <CheckCircle2 className="w-14 h-14" />
          </div>

          <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-6">
            Inscription Confirmée !
          </h1>
          
          <p className="text-white/60 text-lg font-poppins mb-12 max-w-xl mx-auto leading-relaxed">
            Félicitations {studentName} ! Votre place est réservée. Vos identifiants de connexion ont été activés. Vous pouvez dès à présent accéder à votre cours dans votre portail apprenant.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5 text-left">
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1">Référence</p>
              <p className="text-white font-black text-lg">{reference}</p>
            </div>
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5 text-left">
              <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1">Montant Payé</p>
              <p className="text-accent font-black text-lg">{courseDetails.price} {courseDetails.currency}</p>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 text-white/70 text-sm font-medium justify-center">
              <Calendar className="w-5 h-5 text-orange" /> Accès immédiat et à vie sur la plateforme
            </div>
            <div className="flex items-center gap-4 text-white/70 text-sm font-medium justify-center">
              <Mail className="w-5 h-5 text-orange" /> Un reçu détaillé a été envoyé à votre adresse email
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/academy/portal/course/${trainingSlug}`} 
              className="px-10 py-5 bg-orange text-white rounded-2xl font-black shadow-xl shadow-orange/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Accéder à mon cours <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/academy/portal" 
              className="px-10 py-5 bg-white text-primary rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Mon Tableau de bord
            </Link>
          </div>

          <button className="mt-12 inline-flex items-center gap-2 text-white/30 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">
            <Share2 className="w-4 h-4" /> Partager mon inscription
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function AcademyConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white font-bold animate-pulse">Chargement de la confirmation...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
