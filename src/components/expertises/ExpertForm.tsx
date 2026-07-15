"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, UploadCloud, FileText, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function ExpertForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    professional_status: "",
    job_title: "",
    institution: "",
    experience_years: "",
    education_level: "",
    domains: [] as string[],
    collaboration_types: [] as string[],
    availability: "",
    languages: [] as string[],
    biography: "",
    cv_link: "",
    consent: false,
  });

  const ALL_DOMAINS = [
    "Gouvernance sanitaire",
    "Réglementation/Régulation pharmaceutique",
    "Chaîne d'approvisionnement",
    "Santé digitale",
    "Qualité des soins",
    "Suivi-évaluation",
    "Plaidoyer",
    "Financement de la santé",
    "Ressources humaines",
    "Sécurité sanitaire",
    "Gestion des projets"
  ];

  const ALL_COLLAB_TYPES = [
    "Consultant ponctuel",
    "Formation / atelier",
    "Recherche / étude",
    "Expertise technique",
    "Bénévolat"
  ];

  const ALL_LANGUAGES = ["Français", "Anglais"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "consent") {
        setFormData(prev => ({ ...prev, consent: checked }));
        return;
      }

      // Handle arrays
      let arrayName = "";
      if (ALL_DOMAINS.includes(name) || name.startsWith("domain_other")) arrayName = "domains";
      if (ALL_COLLAB_TYPES.includes(name) || name.startsWith("collab_other")) arrayName = "collaboration_types";
      if (ALL_LANGUAGES.includes(name) || name.startsWith("lang_other")) arrayName = "languages";

      if (arrayName) {
        setFormData(prev => {
          const list = prev[arrayName as keyof typeof formData] as string[];
          if (checked) {
            return { ...prev, [arrayName]: [...list, name] };
          } else {
            return { ...prev, [arrayName]: list.filter(item => item !== name) };
          }
        });
      }
    } else if (type === "radio") {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayCheckbox = (arrayName: 'domains' | 'collaboration_types' | 'languages', value: string, checked: boolean) => {
    setFormData(prev => {
      const list = prev[arrayName];
      if (checked) return { ...prev, [arrayName]: [...list, value] };
      return { ...prev, [arrayName]: list.filter(item => item !== value) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setError("Vous devez accepter le traitement de vos données pour soumettre le formulaire.");
      return;
    }

    const activeDomains = formData.domains.filter(d => {
      if (d.startsWith("Autre:")) {
        return d.substring(6).trim() !== "";
      }
      return d.trim() !== "";
    });

    if (activeDomains.length === 0) {
      setError("Veuillez sélectionner au moins un domaine d'expertise (ou en préciser un dans la case 'Autre').");
      return;
    }

      const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('publication_submissions')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      throw new Error(`Erreur de téléchargement: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('publication_submissions')
      .getPublicUrl(filePath);

    return publicUrl;
  };

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      let finalCvLink = formData.cv_link;
      if (cvFile) {
        try {
          finalCvLink = await uploadFile(cvFile, "expert_cvs");
        } catch (uploadErr: any) {
          throw new Error("Impossible de télécharger le fichier: " + uploadErr.message);
        }
      }

      const { error: submitError } = await supabase
        .from('saninova_expert_applications')
        .insert([{
          last_name: formData.last_name,
          first_name: formData.first_name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          professional_status: formData.professional_status,
          job_title: formData.job_title,
          institution: formData.institution,
          experience_years: formData.experience_years,
          education_level: formData.education_level,
          domains: formData.domains,
          collaboration_types: formData.collaboration_types,
          availability: formData.availability,
          languages: formData.languages,
          biography: formData.biography,
          cv_link: finalCvLink,
          consent: formData.consent,
          status: 'Nouveau'
        }]);

      if (submitError) throw submitError;

      setSuccess(true);
      setCvFile(null);
      setFormData({
        last_name: "", first_name: "", email: "", phone: "", country: "", city: "",
        professional_status: "", job_title: "", institution: "", experience_years: "", education_level: "",
        domains: [], collaboration_types: [], availability: "", languages: [], biography: "", cv_link: "", consent: false,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Error submitting expert form:", err);
      setError(err.message || "Une erreur est survenue lors de l'envoi de votre candidature.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#091120] border-t border-slate-800 mt-16" id="expert-form">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 space-y-4">
          <span className="inline-block font-poppins text-xs font-bold text-orange tracking-widest uppercase border-b-2 border-orange pb-1">
            Rejoignez-nous
          </span>
          <h2 className="font-montserrat text-3xl font-extrabold text-white">
            Répertoire d'experts SaniNova
          </h2>
          <p className="font-inter text-white/80 max-w-2xl mx-auto">
            Ce formulaire vous permet de soumettre votre profil pour intégrer le répertoire d'experts de SaniNova. Vos informations resteront strictement confidentielles et ne seront utilisées qu'à des fins de mise en relation.
          </p>
        </div>

        <div className="bg-[#0F1D33] p-8 md:p-12 rounded-3xl shadow-xl border border-white/10">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-montserrat text-2xl font-bold text-white">Candidature envoyée !</h3>
              <p className="text-white/80">Nous avons bien reçu votre profil. Il sera conservé dans notre répertoire d'experts SaniNova Global Consulting.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 px-6 py-2 bg-light text-slate-800 font-medium rounded-full hover:bg-light/80 transition-colors"
              >
                Soumettre une autre candidature
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-start space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. INFORMATIONS PERSONNELLES */}
              <div className="space-y-6">
                <h3 className="font-montserrat text-xl font-bold border-b border-white/20 pb-2 mb-6 text-white">1. INFORMATIONS PERSONNELLES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white font-poppins">Nom *</label>
                    <input type="text" name="last_name" required value={formData.last_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none" placeholder="Nom de famille" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white font-poppins">Prénom *</label>
                    <input type="text" name="first_name" required value={formData.first_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none" placeholder="Prénom" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white font-poppins">Adresse e-mail *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none" placeholder="exemple@domaine.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white font-poppins">Téléphone *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none" placeholder="+229 ..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white font-poppins">Pays de résidence *</label>
                    <input type="text" name="country" required value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none" placeholder="Ex. Bénin, Côte d'Ivoire, France..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white font-poppins">Ville</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none" placeholder="Ex. Cotonou" />
                  </div>
                </div>
              </div>

              {/* 2. PROFIL PROFESSIONNEL */}
              <div className="space-y-6">
                <h3 className="font-montserrat text-xl font-bold border-b border-white/20 pb-2 mb-6 text-white">2. PROFIL PROFESSIONNEL</h3>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white font-poppins">Situation professionnelle *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="professional_status" value="Indépendant" required onChange={handleChange} checked={formData.professional_status === "Indépendant"} className="w-4 h-4 text-orange focus:ring-orange border-gray-300" />
                      <span className="text-white/90">Indépendant</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="professional_status" value="En Poste" required onChange={handleChange} checked={formData.professional_status === "En Poste"} className="w-4 h-4 text-orange focus:ring-orange border-gray-300" />
                      <span className="text-white/90">En Poste</span>
                    </label>
                  </div>
                </div>

                {formData.professional_status === "En Poste" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white/5 rounded-xl">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white font-poppins">Titre / Poste actuel *</label>
                      <input type="text" name="job_title" required value={formData.job_title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none" placeholder="Ex. Médecin épidémiologiste..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white font-poppins">Institution / Organisation actuelle *</label>
                      <input type="text" name="institution" required value={formData.institution} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none" placeholder="Ex. OMS, Ministère..." />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white font-poppins">Années d'expérience *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {["Moins de 5 ans", "5 – 10 ans", "10 – 20 ans", "Plus de 20 ans"].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="experience_years" value={opt} required onChange={handleChange} checked={formData.experience_years === opt} className="w-4 h-4 text-orange focus:ring-orange" />
                        <span className="text-white/90 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white font-poppins">Niveau de formation le plus élevé</label>
                  <div className="flex flex-wrap gap-4">
                    {["Bac+3 / Licence", "Bac+5 / Master", "Doctorat / PhD", "Formation professionnelle", "Autre"].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="education_level" value={opt} onChange={handleChange} checked={formData.education_level === opt} className="w-4 h-4 text-orange focus:ring-orange" />
                        <span className="text-white/90 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. DOMAINES D'EXPERTISE */}
              <div className="space-y-6">
                <h3 className="font-montserrat text-xl font-bold border-b border-white/20 pb-2 mb-6 text-white">3. DOMAINES D'EXPERTISE</h3>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white font-poppins block">Domaines principaux (plusieurs choix possibles) *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ALL_DOMAINS.map(domain => (
                      <label key={domain} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={formData.domains.includes(domain)} onChange={(e) => handleArrayCheckbox('domains', domain, e.target.checked)} className="w-4 h-4 rounded text-orange focus:ring-orange" />
                        <span className="text-white/90 text-sm">{domain}</span>
                      </label>
                    ))}
                  </div>
                  <input type="text" placeholder="Autre (à préciser)" className="w-full mt-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none text-sm" onChange={(e) => {
                    // Quick hack to store "Other" without complex state mapping
                    const val = "Autre: " + e.target.value;
                    setFormData(prev => ({ ...prev, domains: [...prev.domains.filter(d => !d.startsWith("Autre:")), val] }));
                  }} />
                </div>
              </div>

              {/* 4. DISPONIBILITÉ & MODALITÉS */}
              <div className="space-y-6">
                <h3 className="font-montserrat text-xl font-bold border-b border-white/20 pb-2 mb-6 text-white">4. DISPONIBILITÉ & MODALITÉS</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white font-poppins block">Type de collaboration souhaité</label>
                    <div className="space-y-2">
                      {ALL_COLLAB_TYPES.map(type => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" checked={formData.collaboration_types.includes(type)} onChange={(e) => handleArrayCheckbox('collaboration_types', type, e.target.checked)} className="w-4 h-4 rounded text-orange focus:ring-orange" />
                          <span className="text-white/90 text-sm">{type}</span>
                        </label>
                      ))}
                      <input type="text" placeholder="Autre (à préciser)" className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none text-sm" onChange={(e) => {
                        const val = "Autre: " + e.target.value;
                        setFormData(prev => ({ ...prev, collaboration_types: [...prev.collaboration_types.filter(d => !d.startsWith("Autre:")), val] }));
                      }} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white font-poppins block">Disponibilité générale</label>
                      <div className="space-y-2">
                        {["Immédiate", "Sous 3 mois", "Selon les opportunités"].map(opt => (
                          <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="availability" value={opt} onChange={handleChange} checked={formData.availability === opt} className="w-4 h-4 text-orange focus:ring-orange" />
                            <span className="text-white/90 text-sm">{opt}</span>
                          </label>
                        ))}
                        <input type="text" placeholder="Autre (à préciser)" className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none text-sm" onChange={(e) => setFormData(prev => ({...prev, availability: "Autre: " + e.target.value}))} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white font-poppins block">Langues de travail</label>
                      <div className="flex flex-wrap gap-4">
                        {ALL_LANGUAGES.map(lang => (
                          <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={formData.languages.includes(lang)} onChange={(e) => handleArrayCheckbox('languages', lang, e.target.checked)} className="w-4 h-4 rounded text-orange focus:ring-orange" />
                            <span className="text-white/90 text-sm">{lang}</span>
                          </label>
                        ))}
                      </div>
                      <input type="text" placeholder="Autre (à préciser)" className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none text-sm" onChange={(e) => {
                        const val = "Autre: " + e.target.value;
                        setFormData(prev => ({ ...prev, languages: [...prev.languages.filter(d => !d.startsWith("Autre:")), val] }));
                      }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. COMPLÉMENTS */}
              <div className="space-y-6">
                <h3 className="font-montserrat text-xl font-bold border-b border-white/20 pb-2 mb-6 text-white">5. COMPLÉMENTS</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white font-poppins">Brève biographie ou note de présentation</label>
                  <textarea name="biography" rows={4} value={formData.biography} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none resize-none" placeholder="En 3 à 5 lignes, décrivez votre parcours et vos principales réalisations..."></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white font-poppins">Lien vers votre profil professionnel</label>
                  <input type="url" name="cv_link" value={formData.cv_link} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-orange outline-none" placeholder="https://linkedin.com/in/... ou lien vers CV en ligne" />
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" name="consent" required checked={formData.consent} onChange={handleChange} className="w-5 h-5 mt-0.5 rounded text-orange focus:ring-orange shrink-0" />
                    <span className="text-white/90 text-sm leading-relaxed">
                      <strong>Consentement au traitement des données</strong><br/>
                      J'accepte que les informations renseignées dans ce formulaire soient conservées et utilisées par SaniNova Global Consulting dans le cadre exclusif de la constitution de son répertoire d'experts. Ces données ne seront pas partagées avec des tiers sans mon accord préalable.
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10">
                <p className="text-xs text-white/50">© 2026 SaniNova Global Consulting — Tous droits réservés</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-orange hover:bg-[#d95c00] text-white font-poppins font-bold rounded-xl shadow-lg shadow-orange/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Soumettre ma candidature</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
