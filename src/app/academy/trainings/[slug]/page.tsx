"use client";

import React, { useState, use } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { 
  Calendar, Clock, MapPin, CheckCircle2, Users, 
  Award, Globe, BookOpen, User, PhoneCall, 
  ArrowRight, ShieldCheck, Share2, Heart, ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "../../../../lib/supabase";

export default function TrainingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { t } = useLanguage();
  const [training, setTraining] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchTraining = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("academy_trainings")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) setTraining(data);
      setLoading(false);
    };
    fetchTraining();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-white font-black animate-pulse">Chargement...</div>
    </div>
  );

  if (!training) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-white font-black">Formation non trouvée</div>
    </div>
  );

  return (
    <div className="bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent z-10" />
          <img src={training.image_url} alt={training.title} className="w-full h-full object-cover opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="mb-8">
            <button 
              onClick={() => router.back()}
              className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Info */}
            <div className="lg:w-2/3">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-1.5 bg-orange/20 border border-orange/30 text-orange rounded-full text-xs font-black uppercase tracking-widest">
                  {training.category}
                </span>
                <span className="px-4 py-1.5 bg-accent/20 border border-accent/30 text-accent rounded-full text-xs font-black uppercase tracking-widest">
                  {training.duration}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
                {training.title}
              </h1>
              <p className="text-xl text-white/70 font-poppins leading-relaxed mb-10">
                {training.short_description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Date</p>
                    <p className="text-white font-bold text-sm">
                      {training.date ? new Date(training.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "---"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Lieu</p>
                    <p className="text-white font-bold text-sm">{training.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Certificat</p>
                    <p className="text-white font-bold text-sm">{training.certificate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Langue</p>
                    <p className="text-white font-bold text-sm">{training.language}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Card Desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="sticky top-32 bg-white rounded-[40px] p-8 shadow-2xl overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="mb-8">
                  <p className="text-dark/40 font-bold text-xs uppercase tracking-widest mb-2">Coût de la formation</p>
                  <div className="flex items-end gap-2 text-dark font-montserrat font-black text-4xl">
                    {training.price} <span className="text-lg font-bold opacity-40">{training.currency}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-dark/5 text-sm">
                    <span className="text-dark/50 font-medium">Format</span>
                    <span className="text-dark font-bold">Hybride</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-dark/5 text-sm">
                    <span className="text-dark/50 font-medium">Durée</span>
                    <span className="text-dark font-bold">{training.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-dark/5 text-sm">
                    <span className="text-dark/50 font-medium">Date limite</span>
                    <span className="text-orange font-black">
                      {training.deadline ? new Date(training.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "---"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    href={`/academy/register?training=${training.slug}`} 
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black text-center block shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    S'inscrire maintenant
                  </Link>
                  <Link 
                    href="/academy/payment" 
                    className="w-full py-5 bg-orange text-white rounded-2xl font-black text-center block shadow-xl shadow-orange/20 hover:scale-[1.02] transition-all"
                  >
                    Payer maintenant
                  </Link>
                </div>

                <p className="mt-6 text-center text-xs font-medium text-dark/40">
                  Besoin d'aide ? <Link href="/contact" className="text-primary hover:underline">Contactez-nous</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3">
              {/* Description */}
              <div className="mb-16">
                <h2 className="text-3xl font-montserrat font-black text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange rounded-full" />
                  Description
                </h2>
                <div className="text-lg text-white/70 font-poppins leading-relaxed whitespace-pre-wrap">
                  {training.full_description}
                </div>
              </div>

              {/* Objectives */}
              <div className="mb-16">
                <h2 className="text-3xl font-montserrat font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Objectifs
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {(training.objectives || []).map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-white/5 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-white/80 font-medium text-sm leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="mb-16">
                <h2 className="text-3xl font-montserrat font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  Public Cible
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(training.target_audience || []).map((audience: string, i: number) => (
                    <span key={i} className="px-6 py-3 rounded-2xl bg-white/5 text-white/70 font-bold border border-white/10">
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              {/* Program Timeline */}
              <div className="mb-16">
                <h2 className="text-3xl font-montserrat font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange rounded-full" />
                  Programme détaillé
                </h2>
                <div className="space-y-4">
                  {(training.program || []).map((item: any, i: number) => (
                    <div key={i} className="relative pl-12 pb-8 last:pb-0 group">
                      {/* Vertical line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10 group-last:bottom-[90%]" />
                      {/* Circle indicator */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-orange bg-dark flex items-center justify-center z-10 text-orange font-black text-xs">
                        {i + 1}
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group-hover:border-orange/30 transition-all">
                        <span className="text-orange font-black text-xs uppercase tracking-widest mb-1 block">{item.day}</span>
                        <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
                        <p className="text-white/50 text-sm leading-relaxed">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainers */}
              <div>
                <h2 className="text-3xl font-montserrat font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  Intervenants
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {(training.trainers || []).map((trainer: any, i: number) => (
                    <div key={i} className="flex gap-6 p-6 rounded-[32px] bg-white/5 border border-white/5 items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden flex-shrink-0">
                        <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-white font-black text-lg mb-1">{trainer.name}</h4>
                        <p className="text-accent font-bold text-xs uppercase tracking-wider mb-2">{trainer.role}</p>
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{trainer.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Card Mobile Spacer */}
            <div className="lg:hidden">
               <div className="bg-white rounded-[40px] p-8 shadow-2xl">
                 <div className="flex items-end gap-2 text-dark font-montserrat font-black text-4xl mb-8">
                    {training.price} <span className="text-lg font-bold opacity-40">{training.currency}</span>
                  </div>
                  <Link 
                    href={`/academy/register?training=${training.slug}`} 
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black text-center block shadow-xl"
                  >
                    S'inscrire maintenant
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
