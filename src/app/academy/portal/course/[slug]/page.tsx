"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";
import LMSPlayer from "../../../../../components/academy/LMSPlayer";
import PageHero from "../../../../../components/ui/PageHero";

export default function CourseLMSPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
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
