"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, Mail, Phone, Globe, Building2, Briefcase, 
  Send, CheckCircle2, ChevronRight, ArrowLeft,
  CreditCard, MessageSquare, MapPin, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registrationSchema = z.object({
  fullname: z.string().min(3, "Nom complet requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  whatsapp: z.string().optional(),
  organization: z.string().min(2, "Organisation requise"),
  role: z.string().min(2, "Fonction requise"),
  country: z.string().min(2, "Pays requis"),
  city: z.string().min(2, "Ville requise"),
  training: z.string().min(1, "Veuillez choisir une formation"),
  referral_source: z.string().optional(),
  invoice_required: z.boolean().default(false),
  notes: z.string().optional()
});

type RegistrationData = z.infer<typeof registrationSchema>;

export default function AcademyRegister() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: {
      invoice_required: false,
      training: ""
    }
  });

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    // Simulate API call to Supabase
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form Data:", data);
    setIsSubmitting(false);
    router.push("/academy/payment");
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/academy" className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'Académie
          </Link>
          <h1 className="text-4xl md:text-6xl font-montserrat font-black text-white mb-4">
            Inscription
          </h1>
          <p className="text-white/50 text-lg font-poppins">
            Rejoignez l'élite des professionnels de santé en Afrique.
          </p>
        </div>

        {/* Multi-step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= i ? "bg-orange text-white" : "bg-white/10 text-white/20"}`}>
                {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
              </div>
              {i < 3 && <div className={`w-12 h-1 bg-white/10 rounded-full overflow-hidden ${step > i ? "bg-orange" : ""}`} />}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-[#0F1D33] rounded-[40px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-montserrat font-black text-white mb-8">Informations Personnelles</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Nom Complet</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                        <input {...register("fullname")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Jean Dupont" />
                      </div>
                      {errors.fullname && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.fullname.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Email Professionnel</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                        <input {...register("email")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="jean@organisation.com" />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.email.message}</p>}
                    </div>
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
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-montserrat font-black text-white mb-8">Organisation & Localisation</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Organisation</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                        <input {...register("organization")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Ministère, Clinique, ONG..." />
                      </div>
                      {errors.organization && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.organization.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Fonction / Titre</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                        <input {...register("role")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Directeur, Médecin, Manager..." />
                      </div>
                      {errors.role && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.role.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Pays</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                        <input {...register("country")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Bénin, Sénégal, Togo..." />
                      </div>
                      {errors.country && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.country.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Ville</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                        <input {...register("city")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none" placeholder="Cotonou, Dakar..." />
                      </div>
                      {errors.city && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.city.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-montserrat font-black text-white mb-8">Détails de Formation</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Formation Choisie</label>
                      <select {...register("training")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none appearance-none">
                        <option value="" className="bg-dark text-white/30">Choisir une formation...</option>
                        <option value="gouvernance" className="bg-dark">Gouvernance Sanitaire et Leadership</option>
                        <option value="digital" className="bg-dark">Santé Digitale et Interopérabilité</option>
                        <option value="pharma" className="bg-dark">Régulation Pharmaceutique</option>
                      </select>
                      {errors.training && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.training.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Comment nous avez-vous connu ?</label>
                        <select {...register("referral_source")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none appearance-none">
                          <option value="linkedin" className="bg-dark">LinkedIn</option>
                          <option value="facebook" className="bg-dark">Facebook / Instagram</option>
                          <option value="whatsapp" className="bg-dark">WhatsApp</option>
                          <option value="recommandation" className="bg-dark">Recommandation</option>
                          <option value="email" className="bg-dark">Email / Newsletter</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-6">
                        <input type="checkbox" id="invoice" {...register("invoice_required")} className="w-5 h-5 rounded border-white/10 bg-white/5 accent-orange" />
                        <label htmlFor="invoice" className="text-white font-bold text-sm cursor-pointer">Besoin d'une facture officielle ?</label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Notes ou Besoins Spécifiques (Optionnel)</label>
                      <textarea {...register("notes")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none min-h-[120px]" placeholder="Précisez ici toute attente ou contrainte particulière..." />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-8 py-4 text-white/60 font-bold hover:text-white transition-all flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Précédent
                </button>
              ) : <div />}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="px-10 py-4 bg-white text-primary rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                  Continuer <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-10 py-4 bg-orange text-white rounded-2xl font-black shadow-xl shadow-orange/20 hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? "Traitement..." : "Confirmer & Payer"} <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Security Trust */}
        <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-white text-xs font-bold">
             <ShieldCheck className="w-4 h-4" /> SSL Sécurisé
           </div>
           <div className="flex items-center gap-2 text-white text-xs font-bold">
             <CreditCard className="w-4 h-4" /> Paiement Sécurisé
           </div>
        </div>
      </div>
    </div>
  );
}
