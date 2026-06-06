"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Megaphone, Calendar, Clock, ArrowLeft, Share2, Bell,
  UploadCloud, FileText, CheckCircle, AlertCircle, X,
  User, Mail, Phone, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "../../../../components/ui/PageHero";
import { useLanguage } from "../../../../context/LanguageContext";
import { supabase } from "../../../../lib/supabase";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const { locale, t } = useLanguage();
  const router = useRouter();

  const [announcement, setAnnouncement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states for Recruitment
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [motivationFile, setMotivationFile] = useState<File | null>(null);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try database first
        if (id && id.length > 5) {
          const { data, error: fetchErr } = await supabase
            .from("academy_announcements")
            .select("*")
            .eq("id", id)
            .single();

          if (data) {
            setAnnouncement(data);
            setLoading(false);
            return;
          }
        }

        // Fallback mock data matching static IDs
        const mockAnnouncements = [
          {
            id: "1",
            title: locale === "fr" ? "Appel à candidatures : Bourses d'excellence SaniNova 2026" : "Call for Applications: SaniNova Excellence Scholarships 2026",
            type: locale === "fr" ? "Appel" : "Call",
            date: "10 Mai 2026",
            deadline: "30 Mai 2026",
            content: locale === "fr" 
              ? "SaniNova Academy offre 5 bourses complètes pour les jeunes professionnels de santé souhaitant se spécialiser en Santé Digitale. Ce programme vise à soutenir l'émergence d'une nouvelle génération de leaders capables de piloter la transformation numérique des systèmes de santé africains."
              : "SaniNova Academy is offering 5 full scholarships for young health professionals wishing to specialize in Digital Health. This program aims to support the emergence of a new generation of leaders capable of steering the digital transformation of African health systems.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
            status: "Ouvert",
            fullContent: locale === "fr"
              ? "Le programme de bourses d'excellence SaniNova est conçu pour identifier et soutenir les talents les plus prometteurs du secteur de la santé en Afrique. \n\nLes candidats sélectionnés bénéficieront d'une prise en charge totale des frais de scolarité pour le programme de certification en Santé Digitale, ainsi que d'un mentorat personnalisé par des experts internationaux. \n\nCritères d'éligibilité : \n- Être ressortissant d'un pays africain. \n- Avoir au moins 2 ans d'expérience professionnelle dans le secteur de la santé. \n- Démontrer un engagement fort pour l'innovation technologique."
              : "The SaniNova Excellence Scholarship program is designed to identify and support the most promising healthcare talents in Africa. \n\nSelected candidates will benefit from full tuition coverage for the Digital Health certification program, as well as personalized mentoring from international experts. \n\nEligibility Criteria: \n- Be a citizen of an African country. \n- Have at least 2 years of professional experience in the healthcare sector. \n- Demonstrate a strong commitment to technological innovation."
          },
          {
            id: "2",
            title: locale === "fr" ? "Webinaire Gratuit : L'IA dans la régulation pharmaceutique" : "Free Webinar: AI in Pharmaceutical Regulation",
            type: locale === "fr" ? "Webinaire" : "Webinar",
            date: "25 Mai 2026",
            deadline: "24 Mai 2026",
            content: "Rejoignez nos experts pour une session interactive sur les nouvelles frontières de l'intelligence artificielle appliquée au secteur pharma.",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
            status: "Bientôt",
            fullContent: "Ce webinaire explorera comment l'intelligence artificielle transforme les processus de régulation pharmaceutique, de l'homologation des médicaments à la pharmacovigilance."
          },
          {
            id: "3",
            title: locale === "fr" ? "Conférence Annuelle SaniNova : Horizon Santé 2030" : "SaniNova Annual Conference: Horizon Health 2030",
            type: locale === "fr" ? "Conférence" : "Conference",
            date: "15 Mai 2026",
            deadline: "10 Juin 2026",
            content: "La conférence de référence sur la transformation des systèmes de santé se tiendra à Cotonou et en ligne.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
            status: "Annonce",
            fullContent: "La Conférence Horizon Santé 2030 est l'événement phare de l'année pour tous les acteurs de la santé en Afrique. Pendant trois jours, nous discuterons des stratégies pour atteindre la couverture santé universelle grâce à l'innovation."
          }
        ];

        const mock = mockAnnouncements.find(a => a.id === id);
        if (mock) {
          setAnnouncement(mock);
        } else {
          setError(locale === "fr" ? "Annonce introuvable." : "Announcement not found.");
        }
      } catch (err: any) {
        console.error("Error loading announcement:", err);
        setError(locale === "fr" ? "Annonce introuvable." : "Announcement not found.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAnnouncement();
  }, [id, locale]);

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to publication_submissions public bucket
    const { error: uploadError } = await supabase.storage
      .from('publication_submissions')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('publication_submissions')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !cvFile) {
      setError(locale === "fr" ? "Veuillez remplir tous les champs obligatoires et joindre votre CV." : "Please fill in all required fields and upload your CV.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload CV file
      let cvUrl = "";
      try {
        cvUrl = await uploadFile(cvFile, "cvs");
      } catch (err: any) {
        throw new Error(locale === "fr" ? `Impossible de téléverser le CV : ${err.message}` : `Failed to upload CV: ${err.message}`);
      }

      // 2. Upload motivation letter if exists
      let motivationUrl = "";
      if (motivationFile) {
        try {
          motivationUrl = await uploadFile(motivationFile, "motivations");
        } catch (err: any) {
          throw new Error(locale === "fr" ? `Impossible de téléverser la lettre de motivation : ${err.message}` : `Failed to upload cover letter: ${err.message}`);
        }
      }

      // 3. Save application details
      const { error: insertError } = await supabase
        .from("saninova_job_applications")
        .insert({
          announcement_id: announcement.id,
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          cv_url: cvUrl,
          motivation_letter_url: motivationUrl || null,
          message: message.trim() || null
        });

      if (insertError) throw insertError;

      // 4. Subscribe to newsletter if checkbox is checked
      if (subscribeNewsletter) {
        try {
          await fetch("/api/newsletter/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email.trim().toLowerCase(),
              locale: locale
            })
          });
        } catch (newsErr) {
          console.warn("Newsletter subscription failed after application submit:", newsErr);
        }
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Application submission error:", err);
      setError(err.message || (locale === "fr" ? "Une erreur est survenue lors de l'envoi de votre candidature." : "An error occurred while submitting your application."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-orange animate-spin mb-4" />
        <p className="text-sm opacity-60 font-poppins">{locale === "fr" ? "Chargement des détails..." : "Loading details..."}</p>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white p-6">
        <AlertCircle className="w-16 h-16 text-orange mb-6" />
        <h1 className="text-2xl font-montserrat font-black mb-4">{locale === "fr" ? "Annonce introuvable" : "Announcement not found"}</h1>
        <p className="text-sm opacity-60 mb-8 max-w-sm text-center font-poppins">
          {locale === "fr" ? "L'annonce que vous cherchez n'existe pas ou a été retirée." : "The announcement you are looking for does not exist or has been removed."}
        </p>
        <Link href="/academy/announcements" className="px-8 py-3 bg-orange text-white rounded-full font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-all text-sm uppercase tracking-wider font-poppins">
          {locale === "fr" ? "Retour aux annonces" : "Back to announcements"}
        </Link>
      </div>
    );
  }

  const deadlineFormatted = announcement.deadline 
    ? new Date(announcement.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : "---";

  const dateFormatted = announcement.created_at
    ? new Date(announcement.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : "---";

  return (
    <>
      <PageHero 
        title={announcement.type}
        subtitle={announcement.title}
        backgroundImages={[announcement.image]}
      />
      
      <div className="bg-dark pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F1D33] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
          >
            {/* Action Bar */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold text-sm"
              >
                <ArrowLeft className="w-5 h-5" /> {locale === "fr" ? "Retour" : "Back"}
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert(locale === "fr" ? "Lien copié dans le presse-papiers !" : "Link copied to clipboard!");
                  }}
                  className="p-3 bg-white/5 rounded-2xl text-white/50 hover:text-white transition-all border border-white/5"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-2xl font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-all">
                  <Bell className="w-4 h-4" /> {locale === "fr" ? "S'abonner" : "Subscribe"}
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-16">
              <div className="flex items-center gap-6 mb-8 text-white/40 text-sm font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" /> {dateFormatted}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange" /> Deadline: {deadlineFormatted}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-8 leading-tight">
                {announcement.title}
              </h1>

              <div className="prose prose-invert max-w-none prose-lg mb-12">
                <p className="text-white/60 leading-relaxed whitespace-pre-wrap font-poppins">
                  {announcement.fullContent || announcement.content}
                </p>
              </div>

              {/* Status Badge */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Statut actuel</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white font-black uppercase tracking-wider text-sm">{announcement.status || "Ouvert"}</span>
                  </div>
                </div>
                
                {announcement.type === "Appel" && (
                  <button className="px-8 py-4 bg-accent text-white rounded-2xl font-black shadow-xl shadow-accent/20 hover:scale-105 transition-all">
                    Postuler maintenant
                  </button>
                )}
              </div>

              {/* Online Job Application Form (Only for Recruitment) */}
              {announcement.type === "Recrutement" && (
                <div className="mt-12 pt-12 border-t border-white/10">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 bg-green-500/10 border border-green-500/20 rounded-3xl p-8"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mx-auto mb-6">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-montserrat font-bold text-white mb-3">
                        Candidature envoyée avec succès !
                      </h3>
                      <p className="text-white/60 text-sm max-w-md mx-auto mb-6 leading-relaxed font-poppins">
                        Merci pour votre intérêt. Votre dossier a été transmis avec succès à notre équipe de recrutement. Nous l'analyserons dans les plus brefs délais.
                      </p>
                      
                      {subscribeNewsletter ? (
                        <div className="p-4 bg-orange/10 border border-orange/20 text-orange text-xs font-bold font-poppins rounded-2xl max-w-md mx-auto">
                          ✓ Vous êtes également inscrit à la newsletter pour suivre les offres de recrutement de SaniNova !
                        </div>
                      ) : (
                        <div className="p-6 bg-white/5 border border-white/5 rounded-3xl max-w-md mx-auto">
                          <p className="text-white/70 text-xs mb-4 font-poppins">
                            Ne manquez pas nos prochaines opportunités de recrutement et actualités sanitaires en Afrique.
                          </p>
                          <button
                            onClick={async () => {
                              try {
                                await fetch("/api/newsletter/subscribe", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ email, locale })
                                });
                                setSubscribeNewsletter(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="w-full py-3 bg-orange hover:bg-orange/90 text-white rounded-xl font-bold text-xs transition-all uppercase tracking-wider"
                          >
                            S'inscrire à la newsletter d'offres
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-montserrat font-black text-white mb-2">Postuler en ligne</h2>
                        <p className="text-white/40 text-sm">Veuillez soumettre votre dossier complet pour cette offre d'emploi.</p>
                      </div>

                      {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-start gap-3 text-sm font-semibold font-poppins">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Nom complet *</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none font-poppins"
                              placeholder="Ex: Dr. John Doe"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Adresse email *</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none font-poppins"
                              placeholder="john.doe@exemple.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Numéro de téléphone *</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none font-poppins"
                              placeholder="+229 01 00 00 00 00"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* CV Upload */}
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Curriculum Vitae (CV) *</label>
                          <div className="relative">
                            {cvFile ? (
                              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-6 h-6 text-emerald-400" />
                                  <span className="text-white text-sm font-medium font-poppins truncate max-w-[200px]">{cvFile.name}</span>
                                </div>
                                <button type="button" onClick={() => setCvFile(null)} className="text-white/40 hover:text-white transition-colors">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <label className="w-full bg-white/5 border border-dashed border-white/20 hover:border-orange/50 hover:bg-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                                <UploadCloud className="w-8 h-8 text-white/40" />
                                <span className="text-xs text-white/60 font-semibold font-poppins">Cliquez pour téléverser votre CV (PDF/DOCX)</span>
                                <input
                                  type="file"
                                  accept=".pdf,.docx,.doc"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setCvFile(e.target.files[0]);
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Letter Upload */}
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Lettre de motivation (Optionnel)</label>
                          <div className="relative">
                            {motivationFile ? (
                              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-6 h-6 text-emerald-400" />
                                  <span className="text-white text-sm font-medium font-poppins truncate max-w-[200px]">{motivationFile.name}</span>
                                </div>
                                <button type="button" onClick={() => setMotivationFile(null)} className="text-white/40 hover:text-white transition-colors">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <label className="w-full bg-white/5 border border-dashed border-white/20 hover:border-orange/50 hover:bg-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                                <UploadCloud className="w-8 h-8 text-white/40" />
                                <span className="text-xs text-white/60 font-semibold font-poppins">Cliquez pour téléverser la lettre (PDF/DOCX)</span>
                                <input
                                  type="file"
                                  accept=".pdf,.docx,.doc"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setMotivationFile(e.target.files[0]);
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Message d'accompagnement (Optionnel)</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-orange/50 focus:bg-white/10 transition-all outline-none font-poppins resize-none"
                          placeholder="Décrivez brièvement votre parcours et votre motivation..."
                        />
                      </div>

                      {/* Newsletter Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group mt-4">
                        <input
                          type="checkbox"
                          checked={subscribeNewsletter}
                          onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                          className="mt-1 w-4.5 h-4.5 accent-orange rounded cursor-pointer"
                        />
                        <span className="text-xs text-white/60 group-hover:text-white transition-colors font-medium font-poppins leading-relaxed select-none">
                          Je souhaite m'inscrire à la newsletter de SaniNova pour recevoir les opportunités de recrutement et actualités sanitaires en Afrique.
                        </span>
                      </label>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4.5 bg-orange text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-orange/20 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...
                          </>
                        ) : (
                          "Soumettre ma candidature"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
