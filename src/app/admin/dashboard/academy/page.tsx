"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { 
  GraduationCap, Users, Megaphone, Calendar, 
  Plus, ArrowRight, TrendingUp, DollarSign,
  Briefcase, Clock, CheckCircle2, AlertCircle, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AcademyDashboardOverview() {
  const [stats, setStats] = useState({
    trainings: 0,
    registrations: 0,
    announcements: 0,
    events: 0,
    revenue: "0"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademyStats = async () => {
      try {
        const [
          { count: tCount },
          { count: rCount },
          { count: aCount },
          { count: eCount }
        ] = await Promise.all([
          supabase.from("academy_trainings").select("*", { count: "exact", head: true }),
          supabase.from("academy_registrations").select("*", { count: "exact", head: true }),
          supabase.from("academy_announcements").select("*", { count: "exact", head: true }),
          supabase.from("academy_events").select("*", { count: "exact", head: true })
        ]);

        setStats({
          trainings: tCount || 0,
          registrations: rCount || 0,
          announcements: aCount || 0,
          events: eCount || 0,
          revenue: "1.250.000" // Placeholder for revenue
        });
      } catch (err) {
        console.error("Error fetching academy stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademyStats();
  }, []);

  const menuCards = [
    {
      title: "Formations",
      desc: "Gérer le catalogue et les contenus",
      count: stats.trainings,
      icon: GraduationCap,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      link: "/admin/dashboard/academy/trainings"
    },
    {
      title: "Inscriptions",
      desc: "Suivi des participants et paiements",
      count: stats.registrations,
      icon: Users,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      link: "/admin/dashboard/academy/registrations"
    },
    {
      title: "Annonces",
      desc: "Publier des appels et opportunités",
      count: stats.announcements,
      icon: Megaphone,
      color: "text-orange",
      bgColor: "bg-orange/10 border-orange/20",
      link: "/admin/dashboard/academy/announcements"
    },
    {
      title: "Événements",
      desc: "Calendrier des symposiums et webinars",
      count: stats.events,
      icon: Calendar,
      color: "text-accent",
      bgColor: "bg-accent/10 border-accent/20",
      link: "/admin/dashboard/academy/events"
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="pt-4">
          <Link href="/admin/dashboard" className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour au Dashboard
          </Link>
          <h1 className="text-3xl md:text-5xl font-montserrat font-black text-white">
            SaniNova Academy
          </h1>
          <p className="text-slate-400 mt-2 font-inter">
            Pilotage global de la plateforme de formation professionnelle.
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/dashboard/academy/trainings/new"
            className="px-6 py-3 bg-[#00A878] text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-emerald-900/20"
          >
            <Plus className="w-5 h-5" /> Nouvelle Formation
          </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-[32px] border ${card.bgColor} backdrop-blur-md group hover:scale-[1.02] transition-all relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl bg-slate-900/50 ${card.color} border border-slate-800`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className="text-white font-black text-4xl">{card.count}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
              <p className="text-slate-400 text-xs font-medium mb-6">{card.desc}</p>
              <Link 
                href={card.link}
                className="inline-flex items-center text-xs font-bold text-slate-300 hover:text-white transition-colors gap-2"
              >
                Gérer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Overview */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-[40px] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-montserrat font-black text-white flex items-center gap-3">
              <TrendingUp className="text-emerald-400" /> Performance du mois
            </h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mai 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800">
              <p className="text-slate-500 text-xs font-bold uppercase mb-2">Revenus</p>
              <p className="text-2xl font-black text-white">{stats.revenue} <span className="text-xs text-slate-500">XOF</span></p>
              <div className="mt-4 flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                +12% vs mois dernier
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800">
              <p className="text-slate-500 text-xs font-bold uppercase mb-2">Taux d'engagement</p>
              <p className="text-2xl font-black text-white">78%</p>
              <div className="mt-4 flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                +5% vs mois dernier
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800">
              <p className="text-slate-500 text-xs font-bold uppercase mb-2">Certificats émis</p>
              <p className="text-2xl font-black text-white">124</p>
              <div className="mt-4 flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                +18 vs mois dernier
              </div>
            </div>
          </div>
        </div>

        {/* Support & Tips */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-[40px] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-orange/20 rounded-2xl flex items-center justify-center text-orange mb-6">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Conseil d'administration</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Pensez à mettre à jour les dates limites d'inscription pour les formations de Juin afin d'éviter les inscriptions hors-délai.
            </p>
          </div>
          <div className="space-y-3">
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all text-sm">
              Consulter le guide Academy
            </button>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all text-sm">
              Support Technique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
