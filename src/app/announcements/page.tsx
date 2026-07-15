"use client";

import React, { useState } from "react";
import { Megaphone, Calendar, Tag, ArrowRight, Search, Bell, ArrowLeft, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";

import { supabase } from "../../lib/supabase";

export default function AcademyAnnouncements() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [activeType, setActiveType] = useState("all");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

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

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("academy_announcements")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data) setAnnouncements(data);
      setLoading(false);
    };
    fetchAnnouncements();
  }, []);

  const types = ["all", "Recrutement", "Appel", "Webinaire", "Conférence", "Annonce"];

  const filtered = activeType === "all" ? announcements : announcements.filter(a => a.type === activeType);

  return (
    <>
      <PageHero 
        title={locale === "fr" ? "Actualités & Appels" : "News & Calls"}
        subtitle={locale === "fr" ? "Restez informés (es) des activités de SaniNova Global Consulting." : "Stay informed about SaniNova Global Consulting activities."}
        backgroundImages={[
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1454165833767-027ffea7025c?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <div className="mb-8">
            <Link 
              href="/academy"
              className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> {t.common?.back || "Retour"}
            </Link>
          </div>
          {/* Header (Simplified since PageHero handles title) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs tracking-widest uppercase mb-4">
                <Megaphone className="w-4 h-4 mr-2" /> Academy Insights
              </span>
            </div>
            
            <button 
              onClick={() => setShowSubscribeModal(true)}
              className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all"
            >
              <Bell className="w-5 h-5 text-orange" /> {locale === "fr" ? "S'abonner aux alertes" : "Subscribe to alerts"}
            </button>
          </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeType === type ? "bg-orange text-white shadow-lg shadow-orange/20" : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"}`}
            >
              {type === "all" ? (locale === "fr" ? "Toutes les annonces" : "All Announcements") : type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((announcement, i) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#0F1D33] rounded-[40px] overflow-hidden border border-white/5 flex flex-col h-full hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={announcement.image} 
                  alt={announcement.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {announcement.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-wider mb-4">
                  <Calendar className="w-4 h-4" /> {announcement.created_at ? new Date(announcement.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "---"}
                </div>
                <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-4 line-clamp-3 leading-tight group-hover:text-accent transition-colors">
                  {announcement.title}
                </h3>
                <p className="text-white/50 text-sm font-poppins mb-8 line-clamp-3 leading-relaxed">
                  {announcement.content}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Deadline</span>
                    <span className="text-orange font-black text-sm">
                      {announcement.deadline ? new Date(announcement.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A"}
                    </span>
                  </div>
                  <Link 
                    href={`/announcements/${announcement.id}`}
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white flex items-center justify-center hover:bg-orange transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
