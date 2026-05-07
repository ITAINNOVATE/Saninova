"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

export const ContactQuick: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    country: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from("saninova_contacts").insert([
        {
          name: formData.name,
          institution: formData.institution,
          country: formData.country,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({
        name: "",
        institution: "",
        country: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error("Erreur lors de l'envoi :", err);
      setError("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background blur decorative circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-accent tracking-widest uppercase border-b-2 border-accent pb-1">
            {t.contactQuick.tag}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {t.contactQuick.title}
          </h2>
          <p className="font-inter text-lg text-dark/70">
            {t.contactQuick.subtitle}
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="bg-light/60 p-8 sm:p-12 rounded-3xl border border-dark/5 shadow-xl relative">
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center text-center p-8 z-20"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-montserrat text-2xl font-extrabold text-primary mb-3">
                  Demande Envoyée !
                </h3>
                <p className="font-inter text-base sm:text-lg text-dark/60 max-w-md">
                  {t.contactQuick.success}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-poppins text-xs font-bold text-primary uppercase tracking-wide">
                  {t.contactQuick.name} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/5 focus:outline-none focus:border-accent transition-all duration-200"
                />
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <label className="font-poppins text-xs font-bold text-primary uppercase tracking-wide">
                  {t.contactQuick.institution}
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/5 focus:outline-none focus:border-accent transition-all duration-200"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="font-poppins text-xs font-bold text-primary uppercase tracking-wide">
                  {t.contactQuick.country} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/5 focus:outline-none focus:border-accent transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-poppins text-xs font-bold text-primary uppercase tracking-wide">
                  {t.contactQuick.email} <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/5 focus:outline-none focus:border-accent transition-all duration-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="font-poppins text-xs font-bold text-primary uppercase tracking-wide">
                {t.contactQuick.subject} <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/5 focus:outline-none focus:border-accent transition-all duration-200"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-poppins text-xs font-bold text-primary uppercase tracking-wide">
                {t.contactQuick.message}
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/5 focus:outline-none focus:border-accent transition-all duration-200 resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-xl text-sm font-inter">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white font-poppins font-bold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-accent/20 transition-all duration-300 w-full sm:w-auto ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                <span>{isSubmitting ? "Envoi en cours..." : t.contactQuick.submit}</span>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ContactQuick;
