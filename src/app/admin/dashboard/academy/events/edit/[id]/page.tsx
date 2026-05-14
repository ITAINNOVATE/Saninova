"use client";

import React, { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "../../../../../../../lib/supabase";
import { 
  ArrowLeft, Save, Loader2, Calendar, MapPin, 
  Tag, Video, Info, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageUpload from "../../../../../../../components/admin/ImageUpload";

const eventSchema = z.object({
  title: z.string().min(5, "Titre trop court"),
  description: z.string().min(10, "Description requise"),
  date: z.string().min(1, "Date requise"),
  venue: z.string().min(2, "Lieu requis"),
  type: z.string().min(2, "Type requis"),
  status: z.string().default("upcoming"),
  image: z.string().optional().or(z.null()).or(z.literal(""))
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as any
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from("academy_events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        Object.keys(data).forEach(key => {
          if (key in eventSchema.shape) {
            setValue(key as any, data[key]);
          }
        });
      }
    } catch (err: any) {
      setError("Erreur lors du chargement: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from("academy_events")
        .update(data)
        .eq("id", id);

      if (updateError) throw updateError;
      
      router.push("/admin/dashboard/academy/events");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-orange-400" />
        <p className="font-poppins">Chargement de l'événement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/academy/events" className="inline-flex items-center text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Annuler
        </Link>
      </div>

      <div className="max-w-4xl">
        <h1 className="text-3xl font-montserrat font-black text-white mb-2">Modifier l'Événement</h1>
        <p className="text-slate-500 font-inter">Mettez à jour les informations de l'événement.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Titre de l'événement</label>
              <input {...register("title")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-orange-500 outline-none transition-all" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
              <textarea {...register("description")} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:border-orange-500 outline-none transition-all min-h-[200px]" />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <h3 className="text-white font-bold text-lg mb-2">Paramètres</h3>
            
            <ImageUpload 
              value={watch("image") || ""} 
              onChange={(url) => setValue("image", url)} 
              label="Image de l'événement"
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Type d'événement</label>
              <select {...register("type")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-orange-500 outline-none">
                <option value="Conférence">Conférence</option>
                <option value="Webinaire">Webinaire</option>
                <option value="Atelier">Atelier</option>
                <option value="Séminaire">Séminaire</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Date</label>
              <input type="date" {...register("date")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-orange-500 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Lieu / Lien</label>
              <input {...register("venue")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-orange-500 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Statut</label>
              <select {...register("status")} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-orange-500 outline-none">
                <option value="upcoming">À venir</option>
                <option value="ongoing">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
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
