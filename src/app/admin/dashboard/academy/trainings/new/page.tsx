"use client";

export const dynamic = "force-dynamic";

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
import ImageUpload from "../../../../../../components/admin/ImageUpload";

const trainingSchema = z.object({
  title: z.string().min(5, "Titre trop court"),
  slug: z.string().min(5, "Slug requis"),
  category: z.string().min(2, "Catégorie requise"),
  short_description: z.string().min(10, "Description courte requise"),
  full_description: z.string().min(50, "Description complète requise"),
  date: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  price: z.any().nullable().optional(),
  image_url: z.string().optional().or(z.literal("")).or(z.null()),
  format: z.string().default("Hybride"),
  status: z.string().default("draft"),
  duration: z.string().nullable().optional(),
  capacity: z.any().nullable().optional(),
  deadline: z.string().nullable().optional(),
  certificate: z.boolean().default(true),
  target_audience: z.any().nullable().optional(),
  objectives: z.any().nullable().optional(),
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
      format: "Hybride",
      status: "draft",
      certificate: true
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
      const formattedData = { ...data };
      if (typeof formattedData.objectives === "string") {
        formattedData.objectives = formattedData.objectives.split(",").map(s => s.trim()).filter(Boolean);
      }
      if (typeof formattedData.target_audience === "string") {
        formattedData.target_audience = formattedData.target_audience.split(",").map(s => s.trim()).filter(Boolean);
      }

      const { error: insertError } = await supabase
        .from("academy_trainings")
        .insert([formattedData]);

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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contenu Complet</label>
              <textarea {...register("full_description")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-[#00A878] outline-none transition-all min-h-[300px]" placeholder="Objectifs, programme, détails..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Objectifs (séparés par des virgules)</label>
                <textarea {...register("objectives")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-[#00A878] outline-none transition-all min-h-[120px]" placeholder="Améliorer la gestion, Comprendre les enjeux..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Public Cible (séparés par des virgules)</label>
                <textarea {...register("target_audience")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-[#00A878] outline-none transition-all min-h-[120px]" placeholder="Médecins, Directeurs d'hôpitaux, Pharmaciens..." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <h3 className="text-white font-bold text-lg mb-2">Paramètres</h3>
            
            <ImageUpload 
              value={watch("image_url") || ""} 
              onChange={(url) => setValue("image_url", url)} 
              label="Image de couverture"
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Statut</label>
              <select {...register("status")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none">
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="closed">Fermé</option>
              </select>
            </div>

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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Format</label>
              <select {...register("format")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none">
                <option value="Présentiel">Présentiel</option>
                <option value="En ligne">En ligne</option>
                <option value="Hybride">Hybride</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Date</label>
              <input type="date" {...register("date")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Deadline d'inscription</label>
              <input type="date" {...register("deadline")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Durée</label>
              <input {...register("duration")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" placeholder="Ex: 3 jours / 20 heures" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Lieu</label>
              <input {...register("location")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" placeholder="Ex: Cotonou" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Prix (XOF)</label>
                <input type="number" {...register("price")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Capacité</label>
                <input type="number" {...register("capacity")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-[#00A878] outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
              <input type="checkbox" {...register("certificate")} className="w-5 h-5 accent-emerald-500" />
              <label className="text-sm font-bold text-slate-300">Délivrer un certificat</label>
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
