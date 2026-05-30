"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useLanguage } from "../../context/LanguageContext";

export default function ExpertForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    cv_link: "",
    message: "",
  });

  const domains = [
    "Gouvernance & Politiques de santé",
    "Régulation pharmaceutique",
    "Supply Chain & Logistique de santé",
    "Santé Digitale & Télémédecine",
    "Qualité des soins & Sécurité des patients",
    "Financement de la santé",
    "Ressources humaines en santé",
    "Sécurité sanitaire",
    "Suivi-évaluation & Mesure d'impact"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('saninova_expert_applications')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          domain: formData.domain,
          cv_link: formData.cv_link,
          message: formData.message,
          status: 'Nouveau'
        }]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        domain: "",
        cv_link: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Error submitting expert form:", err);
      setError(err.message || "Une erreur est survenue lors de l'envoi de votre candidature.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-light border-t border-light mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 space-y-4">
          <span className="inline-block font-poppins text-xs font-bold text-orange tracking-widest uppercase border-b-2 border-orange pb-1">
            Rejoignez-nous
          </span>
          <h2 className="font-montserrat text-3xl font-extrabold text-primary">
            Appel aux Experts
          </h2>
          <p className="font-inter text-dark/70 max-w-2xl mx-auto">
            Vous avez une expertise pointue dans l'un de nos domaines d'intervention ? 
            Rejoignez le réseau SaniNova pour collaborer sur des projets à fort impact en Afrique.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-light">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-montserrat text-2xl font-bold text-primary">Candidature envoyée !</h3>
              <p className="text-dark/70">Nous avons bien reçu votre profil. Notre équipe l'examinera et vous contactera très prochainement.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 px-6 py-2 bg-light text-dark font-medium rounded-full hover:bg-light/80 transition-colors"
              >
                Soumettre une autre candidature
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-start space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-primary font-poppins">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-light focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all font-inter"
                    placeholder="Dr. Jean Dupont"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary font-poppins">Email professionnel *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-light focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all font-inter"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-primary font-poppins">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-light focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all font-inter"
                    placeholder="+229 00 00 00 00"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="domain" className="text-sm font-semibold text-primary font-poppins">Domaine d'expertise principal *</label>
                  <select
                    id="domain"
                    name="domain"
                    required
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-light focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all font-inter bg-white"
                  >
                    <option value="" disabled>Sélectionnez un domaine</option>
                    {domains.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="cv_link" className="text-sm font-semibold text-primary font-poppins">Lien vers votre CV ou profil LinkedIn (Optionnel)</label>
                <input
                  type="url"
                  id="cv_link"
                  name="cv_link"
                  value={formData.cv_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-light focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all font-inter"
                  placeholder="https://linkedin.com/in/votre-profil"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-primary font-poppins">Courte présentation / Motivations *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-light focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all font-inter resize-none"
                  placeholder="Décrivez brièvement votre parcours et ce que vous souhaitez apporter au réseau..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3.5 bg-orange hover:bg-[#d95c00] text-white font-poppins font-bold rounded-xl shadow-lg shadow-orange/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Envoyer ma candidature</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
