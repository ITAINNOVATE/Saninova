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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PageHero from "../../../components/ui/PageHero";
import { certificationsData } from "../../../data/certificationsData";
import { staticModules } from "../../../lib/academyHelpers";

const registrationSchema = z.object({
  fullname: z.string().min(3, "Nom complet requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  whatsapp: z.string().optional(),
  organization: z.string().min(2, "Organisation requise"),
  role: z.string().min(2, "Fonction requise"),
  country: z.string().min(2, "Pays requis"),
  city: z.string().min(2, "Ville requise"),
  training: z.string().optional(),
  referral_source: z.string().optional(),
  invoice_required: z.boolean().default(false),
  notes: z.string().optional()
});

type RegistrationData = z.infer<typeof registrationSchema>;

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainingSlug = searchParams.get("training");
  const certificationName = searchParams.get("certification");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState<{ email: string; pass: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: {
      invoice_required: false,
      training: certificationName || trainingSlug || ""
    }
  });

  useEffect(() => {
    if (certificationName) {
      setValue("training", certificationName);
    } else if (trainingSlug) {
      // Map slug to form value if necessary, but here the values in select match slug-like strings
      // Let's ensure the mapping is correct
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
    
    // Generate temporary credentials
    const firstName = data.fullname.trim().split(" ")[0] || "User";
    const sanitizedFirstName = firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "");
    const tempPassword = `${sanitizedFirstName}@SaniNova2026`;
    
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
    localStorage.setItem("registered_fullname", data.fullname);
    localStorage.setItem("registered_email", data.email);
    localStorage.setItem("registered_password", tempPassword);
    if (resolvedSlug) {
      localStorage.setItem("registered_training_slug", resolvedSlug);
      localStorage.setItem("enrolled_slugs", JSON.stringify([resolvedSlug]));
    } else {
      localStorage.removeItem("registered_training_slug");
    }
    localStorage.setItem("logged_in", "true");
    
    setIsSubmitting(false);
    setCredentials({ email: data.email, pass: tempPassword });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <>
      <PageHero 
        title="Inscription"
        subtitle="Rejoignez l'élite des professionnels de santé en Afrique."
        backgroundImages={[
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
          <div className="mb-12">
            <Link href="/academy" className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-widest mb-6 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'Académie
            </Link>
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
          
          {credentials ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-orange/10 rounded-[28px] border border-orange/20 flex items-center justify-center text-orange mx-auto mb-8 shadow-xl shadow-orange/5">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-montserrat font-black text-white mb-4">
                Inscription Enregistrée !
              </h2>
              {localStorage.getItem("registered_training_slug") ? (
                <p className="text-white/60 text-sm max-w-md mx-auto mb-8 leading-relaxed font-poppins">
                  Votre compte étudiant a été créé avec succès. Pour commencer à apprendre et déverrouiller l'accès complet au lecteur de cours, veuillez finaliser le règlement de vos frais de formation.
                </p>
              ) : (
                <p className="text-white/60 text-sm max-w-md mx-auto mb-8 leading-relaxed font-poppins">
                  Votre compte étudiant a été créé avec succès. Vous pouvez dès à présent accéder à votre portail d'apprentissage pour découvrir nos modules.
                </p>
              )}

              {/* Credentials Card */}
              <div className="max-w-md mx-auto bg-dark/50 border border-white/5 rounded-3xl p-6 mb-10 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                <span className="text-[10px] bg-orange/15 text-orange px-2.5 py-1 rounded-md uppercase font-black tracking-wider border border-orange/20 mb-4 inline-block font-mono">
                  VOS IDENTIFIANTS DE CONNEXION
                </span>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Identifiant (Email)</label>
                    <span className="text-white font-mono font-bold text-base select-all">{credentials.email}</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Mot de passe temporaire</label>
                    <span className="text-orange font-mono font-black text-base select-all">{credentials.pass}</span>
                  </div>
                </div>
              </div>

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
                        {certificationName ? (
                          <div className="w-full bg-white/5 border border-orange/40 rounded-2xl py-4 px-6 text-white font-bold flex items-center justify-between shadow-sm">
                            <span>
                              {certificationName}
                            </span>
                            <span className="text-[10px] bg-orange/20 text-orange px-2.5 py-1 rounded-md uppercase font-black tracking-wider border border-orange/20">Sélectionné</span>
                            <input type="hidden" value={certificationName} {...register("training")} />
                          </div>
                        ) : trainingSlug ? (
                          <div className="w-full bg-white/5 border border-orange/40 rounded-2xl py-4 px-6 text-white font-bold flex items-center justify-between">
                            <span>
                              {staticModules.find(m => m.slug === trainingSlug)?.title || trainingSlug}
                            </span>
                            <span className="text-[10px] bg-orange/20 text-orange px-2 py-1 rounded-md uppercase font-black tracking-wider border border-orange/20">Sélectionné</span>
                            <input type="hidden" value={staticModules.find(m => m.slug === trainingSlug)?.title || trainingSlug} {...register("training")} />
                          </div>
                        ) : (
                          <>
                            <select {...register("training")} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer">
                              <option value="" className="bg-dark text-white/30">Choisir une formation (Optionnel)...</option>
                              {certificationsData.map((ac) => (
                                <optgroup key={ac.id} label={ac.title} className="bg-dark text-orange font-bold uppercase tracking-widest text-[10px]">
                                  {ac.certifications.flatMap(c => c.modules).map((mod, idx) => (
                                    <option key={`${ac.id}-mod-${idx}`} value={mod.name} className="bg-dark text-white font-medium normal-case text-sm">
                                      {mod.name}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                            {errors.training && <p className="text-red-400 text-xs font-bold mt-1 ml-1">{errors.training.message}</p>}
                          </>
                        )}
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
                    <ArrowLeft className="w-4.5 h-4.5" /> Précédent
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
                    {isSubmitting ? "Traitement..." : "Confirmer l'inscription"} <Send className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>
            </form>
          )}
          {!credentials && (
            <p className="mt-8 text-center text-xs font-semibold text-white/30 font-poppins">
              Déjà inscrit ? <Link href="/academy/login" className="text-orange hover:underline font-bold">Se connecter</Link>
            </p>
          )}
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
    </>
  );
}

import { Suspense } from "react";

export default function AcademyRegister() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white font-bold animate-pulse">Chargement...</div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
