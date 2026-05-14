"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "../../../../../../lib/supabase";
import { 
  ArrowLeft, Save, Loader2, Image as ImageIcon, 
  Layout, Calendar, MapPin, Tag, DollarSign,
  AlignLeft, CheckCircle2, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const trainingSchema = z.object({
  title: z.string().min(5, "Titre trop court"),
  slug: z.string().min(5, "Slug requis"),
  category: z.string().min(2, "Catégorie requise"),
  short_description: z.string().min(10, "Description courte requise"),
  full_description: z.string().min(50, "Description complète requise"),
  date: z.string().optional(),
  location: z.string().optional(),
  price: z.string().optional(),
  image_url: z.string().url("URL d'image invalide").optional().or(z.literal("")),
  format: z.string().default("Hybride")
});

type TrainingFormValues = z.infer<typeof trainingSchema>;

export default function NewTrainingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TrainingFormValues>({
    resolver: zodResolver(trainingSchema) as any,
    defaultValues: {
      format: "Hybride"
    }
  });

  const title = watch("title");
  React.useEffect(() => {
    if (title) {
      const slug = title.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const onSubmit = async (data: TrainingFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: insertError } = await supabase
        .from("academy_trainings")
        .insert([data]);

      if (insertError) throw insertError;
      
      router.push("/admin/dashboard/academy/trainings");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/academy/trainings" className="inline-flex items-center text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Annuler
        </Link>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-3xl font-montserrat font-black text-white mb-2">Ajouter une Formation</h1>
        <p className="text-slate-500 font-inter">Créez un nouveau programme pour le catalogue Academy.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Titre de la formation</label>
              <input {...register("title")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-[#00A878] outline-none transition-all" placeholder="Ex: Gouvernance Sanitaire 2026" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Slug (URL)</label>
              <input {...register("slug")} className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 text-slate-400 focus:border-[#00A878] outline-none transition-all" placeholder="gouvernance-sanitaire-2026" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Description Courte</label>
              <textarea {...register("short_description")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-[#00A878] outline-none transition-all min-h-[100px]" placeholder="Résumé accrocheur pour la carte du catalogue..." />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contenu Complet (Markdown possible)</label>
              <textarea {...register("full_description")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-[#00A878] outline-none transition-all min-h-[300px]" placeholder="Objectifs, programme, détails..." />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <h3 className="text-white font-bold text-lg mb-2">Paramètres</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Catégorie</label>
              <select {...register("category")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none">
                <option value="Gouvernance">Gouvernance</option>
                <option value="Digital">Santé Digitale</option>
                <option value="Pharma">Régulation Pharma</option>
                <option value="Logistique">Logistique</option>
                <option value="Economie">Économie de la Santé</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Date</label>
              <input {...register("date")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" placeholder="Ex: 15 Juin 2026" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Lieu</label>
              <input {...register("location")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" placeholder="Ex: Cotonou / En ligne" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Prix (XOF)</label>
              <input {...register("price")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" placeholder="Ex: 250.000" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">URL Image</label>
              <input {...register("image_url")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" placeholder="https://..." />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-[#00A878] text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            {isSubmitting ? "Création..." : "Enregistrer la formation"}
          </button>
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
