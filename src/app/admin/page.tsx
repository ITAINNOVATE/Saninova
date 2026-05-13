"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        if (data.authenticated) {
          router.push("/admin/dashboard");
        } else {
          setIsChecking(false);
        }
      } catch (err) {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de la connexion.");
      }

      // Redirect to dashboard upon success
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion.");
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-10 h-10 text-[#00A878] animate-spin mb-4" />
        <p className="font-poppins text-slate-400">Vérification de la session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Background ambient gradient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00A878]/10 blur-[120px] -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF8A00]/5 blur-[120px] -z-10" />

      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-white text-sm font-poppins font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md px-6"
      >
        {/* Glassmorphic Container */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative">
          {/* Glow Border Top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00A878] via-emerald-400 to-[#FF8A00] rounded-t-3xl" />

          {/* Branding Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src="/images/logo.png"
              alt="SaniNova"
              className="h-14 w-auto object-contain mb-6 filter brightness-0 invert"
            />
            <h1 className="font-montserrat text-2xl font-extrabold text-white tracking-tight mb-2">
              Espace Administration
            </h1>
            <p className="font-inter text-sm text-slate-400">
              Connectez-vous pour gérer votre plateforme.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start space-x-3 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-poppins text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Mail className="w-3 h-3" /> Identifiant (E-mail)
              </label>
              <input
                type="email"
                required
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878] transition-all duration-200 placeholder:text-slate-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-poppins text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Mot de passe
                </label>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#00A878] focus:ring-1 focus:ring-[#00A878] transition-all duration-200 placeholder:text-slate-500 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00A878] hover:bg-[#00A878]/90 text-white font-poppins font-bold py-3.5 rounded-xl shadow-lg shadow-[#00A878]/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2 mt-8"
            >
              {isSubmitting ? (
                <>
                  <span>Connexion en cours...</span>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
