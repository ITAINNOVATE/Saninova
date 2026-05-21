"use client";

import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User, Mail, Phone, Building2, Briefcase,
  Send, ChevronRight, ArrowLeft, ShieldCheck, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PageHero from "../../../components/ui/PageHero";

const certifSchema = z.object({
  lastname: z.string().min(2, "Nom requis"),
  firstname: z.string().min(2, "Prénom requis"),
  role: z.string().min(2, "Titre/Occupation requis"),
  org_type: z.string().min(2, "Type d'organisation requis"),
  organization: z.string().optional(),
  phone: z.string().min(8, "Téléphone requis"),
  whatsapp: z.string().optional(),
  email: z.string().email("Email invalide"),
});

type CertifData = z.infer<typeof certifSchema>;

function CertifRegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certificationName = searchParams.get("certification") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CertifData>({ resolver: zodResolver(certifSchema) });

  const onSubmit = async (data: CertifData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.setItem("registered_fullname", `${data.firstname} ${data.lastname}`);
    localStorage.setItem("registered_email", data.email);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-orange/60 focus:bg-white/8 transition-all";
  const labelClass = "block text-white/60 text-xs font-bold uppercase tracking-widest mb-2";
  const errorClass = "text-red-400 text-xs mt-1.5 font-medium";

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center bg-white/5 border border-white/10 rounded-[40px] p-12 shadow-2xl"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-montserrat font-black text-white mb-4">
            Inscription confirmée !
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-10 leading-relaxed font-poppins">
            Votre demande d'inscription{certificationName ? ` à la certification "${certificationName}"` : ""} a bien été enregistrée. Notre équipe vous contactera sous peu pour finaliser votre dossier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academy/certifications"
              className="px-8 py-4 bg-orange text-white hover:scale-105 rounded-2xl font-black text-sm shadow-xl shadow-orange/20 transition-all flex items-center justify-center gap-2"
            >
              Voir les certifications <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/5 text-white hover:bg-white/10 rounded-2xl font-black text-sm border border-white/5 transition-all flex items-center justify-center gap-2"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title="Inscription à la certification"
        subtitle={certificationName ? `Certification : ${certificationName}` : "Remplissez le formulaire pour rejoindre nos programmes certifiants."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
        ]}
      />

      <div className="bg-dark pb-24">
        <div className="max-w-3xl mx-auto px-6 pt-8 relative z-20">
          <Link
            href="/academy/certifications"
            className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2 mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Retour aux certifications
          </Link>

          {certificationName && (
            <div className="mb-8 px-6 py-4 bg-orange/10 border border-orange/20 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0" />
              <p className="text-orange font-bold text-sm">
                Certification sélectionnée : <span className="font-black">{certificationName}</span>
              </p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-montserrat font-black text-white mb-8">
              Vos informations
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nom & Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    <User className="inline w-3 h-3 mr-1" /> Nom *
                  </label>
                  <input {...register("lastname")} placeholder="DUPONT" className={inputClass} />
                  {errors.lastname && <p className={errorClass}>{errors.lastname.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Prénom *</label>
                  <input {...register("firstname")} placeholder="Jean" className={inputClass} />
                  {errors.firstname && <p className={errorClass}>{errors.firstname.message}</p>}
                </div>
              </div>

              {/* Titre / Occupation */}
              <div>
                <label className={labelClass}>
                  <Briefcase className="inline w-3 h-3 mr-1" /> Titre / Occupation *
                </label>
                <input {...register("role")} placeholder="Pharmacien, Directeur, Consultant..." className={inputClass} />
                {errors.role && <p className={errorClass}>{errors.role.message}</p>}
              </div>

              {/* Type d'organisation */}
              <div>
                <label className={labelClass}>
                  <Building2 className="inline w-3 h-3 mr-1" /> Type d'organisation *
                </label>
                <select {...register("org_type")} className={inputClass + " cursor-pointer"}>
                  <option value="" className="bg-dark">Sélectionner...</option>
                  <option value="Ministère / Institution gouvernementale" className="bg-dark">Ministère / Institution gouvernementale</option>
                  <option value="Organisation internationale / ONG" className="bg-dark">Organisation internationale / ONG</option>
                  <option value="Secteur privé" className="bg-dark">Secteur privé</option>
                  <option value="Établissement de santé" className="bg-dark">Établissement de santé</option>
                  <option value="Institution académique / Recherche" className="bg-dark">Institution académique / Recherche</option>
                  <option value="Indépendant / Consultant" className="bg-dark">Indépendant / Consultant</option>
                  <option value="Autre" className="bg-dark">Autre</option>
                </select>
                {errors.org_type && <p className={errorClass}>{errors.org_type.message}</p>}
              </div>

              {/* Organisation */}
              <div>
                <label className={labelClass}>Organisation / Structure</label>
                <input {...register("organization")} placeholder="Nom de votre organisation" className={inputClass} />
              </div>

              {/* Téléphone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    <Phone className="inline w-3 h-3 mr-1" /> Téléphone *
                  </label>
                  <input {...register("phone")} placeholder="+229 00 00 00 00" className={inputClass} />
                  {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>WhatsApp</label>
                  <input {...register("whatsapp")} placeholder="+229 00 00 00 00" className={inputClass} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  <Mail className="inline w-3 h-3 mr-1" /> Email *
                </label>
                <input {...register("email")} type="email" placeholder="vous@exemple.com" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-orange text-white rounded-2xl font-black text-base shadow-xl shadow-orange/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Soumettre ma demande <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function CertifRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-white font-black animate-pulse">Chargement...</div>}>
      <CertifRegisterContent />
    </Suspense>
  );
}
