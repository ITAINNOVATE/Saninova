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
import PageHero from "../../../components/ui/PageHero";
import { useLanguage } from "../../../context/LanguageContext";
import { supabase } from "../../../lib/supabase";

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
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isClosed = announcement?.deadline 
    ? new Date() > new Date(announcement.deadline)
    : false;

  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

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
        
        setError(locale === "fr" ? "Annonce introuvable." : "Announcement not found.");
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

  const triggerError = (msg: string) => {
    setError(msg);
    setTimeout(() => {
      const errorElem = document.getElementById("application-error-alert");
      if (errorElem) {
        errorElem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isClosed) {
      triggerError(locale === "fr" 
        ? "Cette offre est déjà clôturée. Les candidatures ne sont plus acceptées." 
        : "This offer is already closed. Applications are no longer accepted.");
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim() || !cvFile) {
      triggerError(locale === "fr" 
        ? "Veuillez remplir tous les champs obligatoires et joindre votre dossier de candidature PDF." 
        : "Please fill in all required fields and upload your candidate PDF dossier.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload Combined Dossier PDF
      let cvUrl = "";
      try {
        cvUrl = await uploadFile(cvFile, "cvs");
      } catch (err: any) {
        throw new Error(locale === "fr" 
          ? `Impossible de téléverser le dossier de candidature : ${err.message}` 
          : `Failed to upload candidate dossier: ${err.message}`);
      }

      // 2. Save application details
      const { error: insertError } = await supabase
        .from("saninova_job_applications")
        .insert({
          announcement_id: announcement.id,
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          cv_url: cvUrl,
          motivation_letter_url: null,
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
      triggerError(err.message || (locale === "fr" ? "Une erreur est survenue lors de l'envoi de votre candidature." : "An error occurred while submitting your application."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail.trim()) return;

    setSubscribeStatus("loading");
    setSubscribeMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: subscribeEmail.trim(), locale }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribeStatus("success");
        setSubscribeMessage(data.message);
        setTimeout(() => {
          setShowSubscribeModal(false);
          setSubscribeEmail("");
          setSubscribeStatus("idle");
          setSubscribeMessage("");
        }, 3000);
      } else {
        setSubscribeStatus("error");
        setSubscribeMessage(data.error || (locale === "fr" ? "Une erreur est survenue." : "An error occurred."));
      }
    } catch (err) {
      setSubscribeStatus("error");
      setSubscribeMessage(locale === "fr" ? "Impossible de contacter le serveur." : "Failed to connect to the server.");
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
        <Link href="/announcements" className="px-8 py-3 bg-orange text-white rounded-full font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-all text-sm uppercase tracking-wider font-poppins">
          {locale === "fr" ? "Retour aux annonces" : "Back to announcements"}
        </Link>
      </div>
    );
  }

  const deadlineFormatted = announcement.deadline 
    ? new Date(announcement.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : "---";

  // isClosed is defined at the component level

  const dateFormatted = announcement.created_at
    ? new Date(announcement.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : "---";

  const renderAnnouncementContent = (content: string) => {
    if (!content) return null;

    const lines = content.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const elements: React.ReactNode[] = [];

    const metadataKeys = [
      "employeur", "intitulé du poste", "type de contrat", "lieu d’affectation", 
      "nombre de poste(s)", "date limite de dépôt", "mode de dépôt"
    ];

    const metadata: { key: string; val: string }[] = [];
    const mainTitleBlock: string[] = [];
    const remainingLines: string[] = [];

    let isParsingMetadata = false;
    let currentKey = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();

      // Detect header lines before metadata
      if (i < 4 && (
        lowerLine.includes("termes de référence") || 
        lowerLine.includes("recrutement") || 
        lowerLine.includes("avis de recrutement")
      )) {
        mainTitleBlock.push(line);
        continue;
      }

      // Check if it matches a metadata key
      const matchingKey = metadataKeys.find(k => 
        lowerLine === k || 
        lowerLine.startsWith(k + " :") || 
        lowerLine.startsWith(k + ":")
      );
      
      if (matchingKey) {
        currentKey = line;
        isParsingMetadata = true;
        continue;
      }

      if (isParsingMetadata && currentKey) {
        metadata.push({ key: currentKey, val: line });
        currentKey = "";
        isParsingMetadata = false;
        continue;
      }

      // Otherwise, save to remaining lines
      remainingLines.push(line);
    }

    // Centered title header block
    if (mainTitleBlock.length > 0) {
      elements.push(
        <div key="title-block" className="text-center mb-12 pb-8 border-b border-white/10 space-y-3">
          {mainTitleBlock.map((t, idx) => {
            if (t.toLowerCase().includes("termes de référence")) {
              return <h4 key={idx} className="text-[#00A878] text-xs md:text-sm font-black uppercase tracking-widest">{t}</h4>;
            } else if (t.toLowerCase().includes("avis de") || t.toLowerCase().includes("réf")) {
              return <h4 key={idx} className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-wider">{t}</h4>;
            } else if (t.toLowerCase().includes("recrutement")) {
              return <h2 key={idx} className="text-2xl md:text-4xl font-montserrat font-black text-white leading-tight">{t}</h2>;
            } else {
              return <p key={idx} className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-wider">{t}</p>;
            }
          })}
        </div>
      );
    }

    // Premium metadata card
    if (metadata.length > 0) {
      elements.push(
        <div key="metadata-card" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/5 border border-white/10 rounded-[32px] mb-12 font-poppins">
          {metadata.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#00A878]">{item.key}</span>
              <p className="text-sm md:text-base font-bold text-white/90 leading-snug">{item.val}</p>
            </div>
          ))}
        </div>
      );
    }

    // Now parse the remaining lines (body content)
    let currentList: string[] = [];

    const flushList = (key: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key} className="list-disc pl-6 space-y-2.5 mb-6 text-white/70 text-justify text-sm md:text-base font-poppins">
            {currentList.map((li, liIdx) => (
              <li key={liIdx} className="leading-relaxed">{li}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    for (let i = 0; i < remainingLines.length; i++) {
      const line = remainingLines[i];
      const lowerLine = line.toLowerCase();

      // Signature block detection
      if (lowerLine.startsWith("fait à") || lowerLine.startsWith("fait a")) {
        flushList(`list-sig-${i}`);
        const sigLines = remainingLines.slice(i);
        elements.push(
          <div key={`sig-block-${i}`} className="mt-12 text-right space-y-1.5 font-poppins">
            {sigLines.map((sigLine, sigIdx) => (
              <p key={sigIdx} className="text-white/80 text-sm md:text-base font-bold leading-normal">
                {sigLine}
              </p>
            ))}
          </div>
        );
        break;
      }

      // Check if Heading 1: e.g. "1. CONTEXTE ET JUSTIFICATION"
      const h1Match = line.match(/^(\d+)\.\s+(.+)$/);
      // Check if Heading 2: e.g. "2.1. Comptabilité et gestion financière"
      const h2Match = line.match(/^(\d+\.\d+)\.\s+(.+)$/);

      if (h2Match) {
        flushList(`list-h2-${i}`);
        elements.push(
          <h3 key={`h2-${i}`} className="text-sm md:text-base font-extrabold text-white/90 mt-8 mb-3 leading-snug font-poppins">
            {line}
          </h3>
        );
      } else if (h1Match) {
        flushList(`list-h1-${i}`);
        elements.push(
          <h2 key={`h1-${i}`} className="text-base md:text-lg font-black text-orange uppercase tracking-wide mt-10 mb-4 border-l-4 border-orange pl-3 leading-snug font-montserrat">
            {line}
          </h2>
        );
      } else {
        // Check if list item: ends with semicolon `;` or starts with bullet points, or matches composition items
        const isBullet = line.startsWith("-") || line.startsWith("•") || line.startsWith("*") || line.endsWith(";") || (currentList.length > 0 && line.endsWith("."));
        if (isBullet) {
          const cleanLine = line.replace(/^[-•*]\s*/, "");
          currentList.push(cleanLine);
          if (line.endsWith(".")) {
            flushList(`list-auto-end-${i}`);
          }
        } else {
          flushList(`list-p-${i}`);
          elements.push(
            <p key={`p-${i}`} className="text-white/60 text-justify text-sm md:text-base leading-relaxed mb-4 font-poppins">
              {line}
            </p>
          );
        }
      }
    }

    // Flush any remaining list items
    flushList("list-final");

    return elements;
  };

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
                <button 
                  onClick={() => setShowSubscribeModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-2xl font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-all"
                >
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
 
              <div className="mb-12 font-poppins">
                {renderAnnouncementContent(announcement.content || announcement.fullContent)}
              </div>

              {/* Status Badge */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Statut actuel</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isClosed ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
                    <span className="text-white font-black uppercase tracking-wider text-sm">
                      {isClosed 
                        ? (locale === "fr" ? "Clôturé" : "Closed") 
                        : (announcement.status || (locale === "fr" ? "Ouvert" : "Open"))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply Button at the bottom of announcement description */}
              {announcement.type === "Recrutement" && !showApplyForm && !submitSuccess && (
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                  <button
                    onClick={() => {
                      if (isClosed) return;
                      setShowApplyForm(true);
                      setTimeout(() => {
                        const formElem = document.getElementById("application-form-section");
                        if (formElem) {
                          formElem.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 100);
                    }}
                    disabled={isClosed}
                    className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2 ${
                      isClosed
                        ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                        : "bg-orange text-white shadow-xl shadow-orange/20 hover:scale-105 hover:bg-orange/90 cursor-pointer"
                    }`}
                  >
                    {isClosed
                      ? (locale === "fr" ? "Offre clôturée" : "Offer closed")
                      : (locale === "fr" ? "Postuler à cette offre" : "Apply to this offer")}
                  </button>
                </div>
              )}

              {/* Online Job Application Form (Only for Recruitment - Shown on click) */}
              {announcement.type === "Recrutement" && ((!isClosed && showApplyForm) || submitSuccess) && (
                <div id="application-form-section" className="mt-12 pt-12 border-t border-white/10">
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
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-montserrat font-black text-white mb-2">Postuler en ligne</h2>
                            <p className="text-white/40 text-sm">Veuillez soumettre votre dossier complet pour cette offre d'emploi.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowApplyForm(false)}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-xl text-xs font-bold transition-all"
                          >
                            Fermer
                          </button>
                        </div>

                        {error && (
                          <div id="application-error-alert" className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-start gap-3 text-sm font-semibold font-poppins">
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

                        {/* Combined PDF Upload */}
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider ml-1">Dossier de candidature (PDF unique) *</label>
                          <div className="relative">
                            {cvFile ? (
                              <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="w-8 h-8 text-emerald-400" />
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-white text-sm font-bold font-poppins truncate max-w-[280px]">{cvFile.name}</span>
                                    <span className="text-[10px] text-white/40 font-poppins font-semibold mt-0.5">{(cvFile.size / (1024 * 1024)).toFixed(2)} Mo</span>
                                  </div>
                                </div>
                                <button type="button" onClick={() => setCvFile(null)} className="text-white/40 hover:text-white transition-colors p-1">
                                  <X className="w-6 h-6" />
                                </button>
                              </div>
                            ) : (
                              <label className="w-full bg-white/5 border border-dashed border-white/20 hover:border-orange/50 hover:bg-white/10 rounded-[32px] p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
                                <UploadCloud className="w-12 h-12 text-white/40" />
                                <span className="text-sm text-white/80 font-bold font-poppins text-center">Téléverser votre dossier de candidature</span>
                                <span className="text-xs text-white/40 font-medium font-poppins text-center max-w-lg leading-relaxed">
                                  Veuillez joindre toutes les pièces demandées (Lettre de motivation, CV, copies des diplômes et attestations, pièce d'identité) compilées en un **seul fichier PDF unique**.
                                </span>
                                <input
                                  type="file"
                                  accept=".pdf"
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

        {/* Subscribe Modal */}
        {showSubscribeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSubscribeModal(false)}
            />
            
            {/* Modal Card */}
            <div className="relative bg-[#0F1D33] border border-white/10 rounded-[32px] p-8 max-w-md w-full shadow-2xl z-10 overflow-hidden font-poppins">
              <button 
                onClick={() => setShowSubscribeModal(false)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mx-auto mb-4">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                  {locale === "fr" ? "S'abonner aux alertes" : "Subscribe to Alerts"}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  {locale === "fr" 
                    ? "Recevez en exclusivité nos opportunités de recrutement et actualités sanitaires en Afrique." 
                    : "Receive our exclusive recruitment opportunities and healthcare news in Africa."}
                </p>
              </div>

              <form onSubmit={handleNewsletterSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    placeholder={locale === "fr" ? "Votre adresse e-mail" : "Your email address"}
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    disabled={subscribeStatus === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder-white/20 focus:border-orange/50 outline-none transition-all text-sm"
                  />
                </div>

                {subscribeMessage && (
                  <div className={`text-xs font-semibold font-poppins text-center p-2 rounded-xl ${
                    subscribeStatus === "success" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {subscribeMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                  className="w-full py-3.5 bg-orange text-white rounded-2xl font-bold text-sm transition-all hover:bg-orange/90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:scale-100 shadow-lg shadow-orange/20"
                >
                  {subscribeStatus === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {locale === "fr" ? "Inscription..." : "Subscribing..."}
                    </>
                  ) : subscribeStatus === "success" ? (
                    locale === "fr" ? "Inscrit avec succès !" : "Subscribed!"
                  ) : (
                    locale === "fr" ? "S'abonner" : "Subscribe"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
