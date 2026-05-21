"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, Mail, Phone, Building2, Briefcase, 
  Send, ChevronRight, ArrowLeft,
  CreditCard, MessageSquare, ShieldCheck, Lock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PageHero from "../../../components/ui/PageHero";
import { staticModules } from "../../../lib/academyHelpers";

const registrationSchema = z.object({
  lastname: z.string().min(2, "Nom requis"),
  firstname: z.string().min(2, "Prénom requis"),
  role: z.string().min(2, "Titre/Occupation requis"),
  org_type: z.string().min(2, "Type d'organisation requis"),
  organization: z.string().optional(),
  phone: z.string().min(8, "Téléphone requis"),
  whatsapp: z.string().optional(),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caractères"),
  confirm_password: z.string(),
  training: z.string().optional()
}).refine((data) => data.password === data.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});

type RegistrationData = z.infer<typeof registrationSchema>;

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainingSlug = searchParams.get("training");
  const certificationName = searchParams.get("certification");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      training: certificationName || trainingSlug || ""
    }
  });

  useEffect(() => {
    if (certificationName) {
      setValue("training", certificationName);
    } else if (trainingSlug) {
      const mapping: Record<string, string> = {
        "gouvernance-sanitaire-afrique": "gouvernance",
        "sante-digitale-interoperabilite": "digital",
        "regulation-pharmaceutique-avancee": "pharma"
      };
      const formValue = mapping[trainingSlug] || trainingSlug;
      setValue("training", formValue);
    }
  }, [trainingSlug, certificationName, setValue]);

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    // Simulate API call to Supabase
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form Data:", data);
    
    // Find dynamic slug mapping
    let resolvedSlug = "";
    if (data.training) {
      const staticMatch = staticModules.find(m => m.title === data.training || m.slug === data.training);
      if (staticMatch) {
        resolvedSlug = staticMatch.slug;
      } else {
        const mapping: Record<string, string> = {
          "gouvernance": "gouvernance-sanitaire-afrique",
          "digital": "sante-digitale-interoperabilite",
          "pharma": "regulation-pharmaceutique-avancee"
        };
        resolvedSlug = mapping[data.training] || data.training;
      }
    }

    // Save in localStorage
    localStorage.setItem("registered_fullname", `${data.firstname} ${data.lastname}`);
    localStorage.setItem("registered_email", data.email);
    localStorage.setItem("registered_password", data.password);
    if (resolvedSlug) {
      localStorage.setItem("registered_training_slug", resolvedSlug);
      localStorage.setItem("enrolled_slugs", JSON.stringify([resolvedSlug]));
    } else {
      localStorage.removeItem("registered_training_slug");
    }
    localStorage.setItem("logged_in", "true");
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
      <PageHero 
        title="Créer un compte"
        subtitle="Rejoignez la plateforme eLearning de l'Académie SaniNova."
        backgroundImages={[
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
          <div className="mb-8">
            <Link href="/academy" className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'Académie
            </Link>
          </div>

        {/* Form Container */}
        <div className="bg-[#0F1D33] rounded-[40px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-orange/10 rounded-[28px] border border-orange/20 flex items-center justify-center text-orange mx-auto mb-8 shadow-xl shadow-orange/5">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-montserrat font-black text-white mb-4">
                Compte Créé !
              </h2>
              {localStorage.getItem("registered_training_slug") ? (
                <p className="text-white/60 text-sm max-w-md mx-auto mb-10 leading-relaxed font-poppins">
                  Votre compte étudiant a été créé avec succès. Pour commencer à apprendre et déverrouiller l'accès complet au lecteur de cours, veuillez finaliser le règlement de la formation sélectionnée.
                </p>
              ) : (
                <p className="text-white/60 text-sm max-w-md mx-auto mb-10 leading-relaxed font-poppins">
                  Votre compte a été créé avec succès. Vous pouvez dès à présent accéder à votre portail d'apprentissage pour découvrir nos modules.
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                {localStorage.getItem("registered_training_slug") && (
                  <button
                    onClick={() => {
                      const slug = localStorage.getItem("registered_training_slug") || "";
                      router.push(`/academy/payment?training=${slug}`);
                    }}
                    className="px-8 py-4.5 bg-orange text-white rounded-2xl font-black text-sm shadow-xl shadow-orange/25 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Procéder au paiement <CreditCard className="w-4.5 h-4.5" />
                  </button>
                )}
                <button
                  onClick={() => router.push("/academy/portal")}
                  className="px-8 py-4.5 bg-white/5 text-white hover:bg-white/10 rounded-2xl font-black text-sm border border-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Accéder à mon espace <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-8">
                <h2 className="text-2xl font-montserrat font-black text-white mb-2">Informations du compte</h2>
                <p className="text-white/40 text-sm">Créez votre profil apprenant en quelques instants.</p>
              </div>

              {/* Identité */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Nom</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("lastname")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Doe" />
                  </div>
                  {errors.lastname && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.lastname.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Prénom</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("firstname")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="John" />
                  </div>
                  {errors.firstname && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.firstname.message}</p>}
                </div>
              </div>

              {/* Professionnel */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Titre / Occupation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("role")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Ex: Pharmacien..." />
                  </div>
                  {errors.role && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.role.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Type d'organisation</label>
                  <select {...register("org_type")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer">
                    <option value="" className="bg-dark text-white/30">Sélectionner...</option>
                    <option value="publique" className="bg-dark">Institution Publique / État</option>
                    <option value="privee" className="bg-dark">Entreprise Privée</option>
                    <option value="ong" className="bg-dark">ONG / Association</option>
                    <option value="etudiant" className="bg-dark">Étudiant / Indépendant</option>
                  </select>
                  {errors.org_type && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.org_type.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Organisation (Optionnel)</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("organization")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Ministère, Clinique..." />
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("phone")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="+229 ..." />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">WhatsApp (Optionnel)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("whatsapp")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="+229 ..." />
                  </div>
                </div>
              </div>

              {/* Identifiants de connexion */}
              <div className="pt-6 border-t border-white/10 space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-montserrat font-bold text-white mb-1">Identifiants de connexion</h3>
                  <p className="text-white/40 text-xs">Ces informations vous permettront d'accéder à votre portail.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Email (Votre Identifiant)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                    <input {...register("email")} type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="jean.doe@exemple.com" />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.email.message}</p>}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                      <input {...register("password")} type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="••••••••" />
                    </div>
                    {errors.password && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Confirmer mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                      <input {...register("confirm_password")} type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="••••••••" />
                    </div>
                    {errors.confirm_password && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.confirm_password.message}</p>}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-8 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-orange text-white rounded-2xl font-black shadow-xl shadow-orange/20 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? "Création du compte..." : "S'inscrire à la plateforme"} <Send className="w-4.5 h-4.5" />
                </button>
              </div>
            </form>
          )}
          {!isSuccess && (
            <p className="mt-8 text-center text-xs font-semibold text-white/30 font-poppins">
              Déjà inscrit ? <Link href="/academy/login" className="text-orange hover:underline font-bold">Se connecter à mon compte</Link>
            </p>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default function Register() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterContent />
    </React.Suspense>
  );
}
