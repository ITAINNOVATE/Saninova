"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../../../../lib/supabase";
import CertificateCard from "../../../../../components/academy/CertificateCard";
import PageHero from "../../../../../components/ui/PageHero";
import { staticModules } from "../../../../../lib/academyHelpers";

export default function CertificatePage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      
      const staticMatch = staticModules.find(m => m.slug === slug);
      if (staticMatch) {
        setCourse(staticMatch);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
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

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white font-black animate-pulse text-lg uppercase tracking-widest">
          Génération de votre certificat...
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

  return (
    <>
      <PageHero 
        title="Votre Certificat Officiel"
        subtitle={`Félicitations pour la validation de la formation : ${course.title}`}
        backgroundImages={[
          course.image_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
        ]}
      />

      <div className="bg-dark pb-24 min-h-screen relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <button
              onClick={() => router.push("/academy/portal")}
              className="inline-flex items-center gap-2 text-white/60 hover:text-orange font-bold text-xs uppercase tracking-widest transition-all bg-white/5 border border-white/5 px-5 py-3 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au Tableau de bord
            </button>
          </div>

          <CertificateCard 
            courseTitle={course.title}
            courseSlug={course.slug}
            chapters={course.program?.map((p: any) => p.title) || []}
          />
        </div>
      </div>
    </>
  );
}
