"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "../../../../../lib/supabase";
import LMSPlayer from "../../../../../components/academy/LMSPlayer";
import PageHero from "../../../../../components/ui/PageHero";
import { staticModules } from "../../../../../lib/academyHelpers";

export default function CourseLMSPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);

      // Check payment status from local storage
      const paid = localStorage.getItem(`paid_${slug}`) === "true";
      setIsPaid(paid);

      const staticMatch = staticModules.find(m => m.slug === slug);
      if (staticMatch) {
        setCourse(staticMatch);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("academy_trainings")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) {
        setCourse(data);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [slug]);

  const getCoursePriceDetails = (courseItem: any) => {
    if (!courseItem) return { price: "250.000", currency: "XOF" };
    if (courseItem.isStaticModule || courseItem.id?.startsWith("static-mod-")) {
      const p = parseInt(courseItem.price) || 150;
      return {
        price: p.toLocaleString('fr-FR'),
        currency: courseItem.currency || "USD"
      };
    }
    const databasePrices: Record<string, { price: string; currency: string }> = {
      "gouvernance-sanitaire-afrique": { price: "250.000", currency: "XOF" },
      "sante-digitale-interoperabilite": { price: "350.000", currency: "XOF" },
      "regulation-pharmaceutique-avancee": { price: "300.000", currency: "XOF" }
    };
    return databasePrices[courseItem.slug] || { price: "250.000", currency: "XOF" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white font-black animate-pulse text-lg uppercase tracking-widest">
          Chargement de votre cours...
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-montserrat font-black text-white">Cours non trouvé</h2>
        <button
          onClick={() => router.push("/academy/portal")}
          className="px-6 py-3 bg-orange text-white rounded-xl font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          Retour au Portail
        </button>
      </div>
    );
  }

  if (!isPaid) {
    const priceDetails = getCoursePriceDetails(course);
    return (
      <>
        <PageHero 
          title="Accès Restreint"
          subtitle="Cette formation eLearning nécessite une inscription validée."
          backgroundImages={[
            course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
          ]}
        />

        <div className="bg-dark pb-24 min-h-screen relative z-10 -mt-20 px-6">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => router.push("/academy/portal")}
              className="inline-flex items-center gap-2 text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all bg-white/5 border border-white/5 px-5 py-3 rounded-full hover:bg-white/10 cursor-pointer mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Espace Apprenant
            </button>

            <div className="bg-[#0F1D33] rounded-[36px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl">
              {/* Visual Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Locked Emblem */}
              <div className="mx-auto w-24 h-24 rounded-3xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-8 shadow-inner animate-pulse">
                <Lock className="w-10 h-10" />
              </div>

              <span className="text-orange font-black text-xs uppercase tracking-widest block mb-3">
                Accès Verrouillé • eLearning
              </span>

              <h2 className="text-2xl md:text-3xl font-montserrat font-black text-orange leading-tight mb-4">
                {course.title}
              </h2>

              <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto mb-8 font-medium">
                Pour accéder à ce module interactif, participer aux quiz et recevoir votre certification officielle SaniNova, veuillez finaliser le règlement de vos frais de formation.
              </p>

              {/* Price Display */}
              <div className="bg-[#0A1629] rounded-2xl p-6 border border-white/5 max-w-sm mx-auto mb-10">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1">
                  Tarif d'accès au module
                </span>
                <span className="text-orange font-black text-3xl">
                  {priceDetails.price} <span className="text-sm font-bold opacity-60">{priceDetails.currency}</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/academy/payment?training=${course.slug}`}
                  className="px-8 py-5 bg-orange text-white hover:bg-orange/90 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Procéder au Paiement <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => router.push("/academy/portal")}
                  className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  Retour au Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero 
        title={course.title}
        subtitle="Votre espace de formation interactif SaniNova."
        backgroundImages={[
          course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
        ]}
      />

      <div className="bg-dark pb-24 min-h-screen relative z-10 -mt-20">
        <LMSPlayer 
          courseTitle={course.title}
          courseSlug={course.slug}
          onBackToPortal={() => router.push("/academy/portal")}
          onCourseCompleted={() => router.push(`/academy/portal/certificate/${course.slug}`)}
        />
      </div>
    </>
  );
}
