"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Mail, BookOpen, Users, ArrowRight, Calendar, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Stats {
  contactsCount: number;
  publicationsCount: number;
}

interface Message {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  institution: string;
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<Stats>({ contactsCount: 0, publicationsCount: 0 });
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Contacts Count
        const { count: cCount } = await supabase
          .from("saninova_contacts")
          .select("*", { count: "exact", head: true });

        // Fetch Publications Count
        const { count: pCount } = await supabase
          .from("saninova_publications")
          .select("*", { count: "exact", head: true });

        // Fetch 5 most recent messages
        const { data: messages } = await supabase
          .from("saninova_contacts")
          .select("id, created_at, name, email, subject, institution")
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          contactsCount: cCount || 0,
          publicationsCount: pCount || 0,
        });
        setRecentMessages(messages || []);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      title: "Messages de Contact",
      value: stats.contactsCount,
      icon: Mail,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/10",
      link: "/admin/dashboard/contacts",
    },
    {
      title: "Publications Actives",
      value: stats.publicationsCount,
      icon: BookOpen,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/10",
      link: "/admin/dashboard/publications",
    },
    {
      title: "Consultations Planifiées",
      value: stats.contactsCount, // Since they are consultations
      icon: Calendar,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10 border-amber-500/10",
      link: "/admin/dashboard/contacts",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bonjour, Administrateur 👋
          </h1>
          <p className="font-inter text-base text-slate-400 mt-2">
            Voici ce qui se passe sur le site SaniNova aujourd'hui.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs font-poppins text-slate-400 font-medium">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative border rounded-2xl p-6 ${card.bgColor} backdrop-blur-sm flex flex-col overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* Background glow design */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            
            <div className="flex items-center justify-between relative z-10">
              <span className="font-poppins text-slate-300 text-sm font-medium tracking-wide uppercase">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl bg-slate-900/50 ${card.color} border border-slate-800`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-6 flex items-baseline space-x-2 relative z-10">
              {loading ? (
                <div className="h-10 w-16 bg-slate-800 animate-pulse rounded-lg" />
              ) : (
                <span className="font-montserrat text-4xl font-extrabold text-white tracking-tight">
                  {card.value}
                </span>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/40 flex justify-end relative z-10">
              <Link
                href={card.link}
                className="inline-flex items-center text-xs font-poppins font-bold text-slate-300 hover:text-white transition-colors"
              >
                <span>Gérer</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Action / Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages - Left Column (2/3 size) */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/10">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-montserrat text-lg font-bold text-white">Demandes Récentes</h3>
                <p className="font-inter text-xs text-slate-400">Dernières prises de contact reçues</p>
              </div>
            </div>
            <Link
              href="/admin/dashboard/contacts"
              className="text-xs font-poppins font-bold text-[#00A878] hover:underline"
            >
              Tout voir
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-800/50 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : recentMessages.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
              <Mail className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="font-poppins text-sm text-slate-400">Aucun message pour le moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/20">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-poppins font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">{msg.name}</h4>
                      {msg.institution && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium uppercase">
                          {msg.institution}
                        </span>
                      )}
                    </div>
                    <p className="font-inter text-xs text-slate-300 font-medium line-clamp-1">
                      {msg.subject}
                    </p>
                    <p className="font-inter text-[11px] text-slate-500 flex items-center gap-1">
                      <span>{msg.email}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2">
                    <span className="text-[10px] font-poppins text-slate-500">
                      {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </span>
                    <Link
                      href="/admin/dashboard/contacts"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500/10 text-slate-400 hover:text-[#00A878] border border-transparent hover:border-emerald-500/10 transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Panel - Right Column (1/3 size) */}
        <div className="bg-slate-900/40 backdrop-blur border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col space-y-6">
          <h3 className="font-montserrat text-lg font-bold text-white">Actions Rapides</h3>
          
          <div className="flex-1 flex flex-col space-y-3">
            <Link
              href="/admin/dashboard/publications"
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#00A878] to-emerald-600 text-white font-poppins font-bold text-sm shadow-lg shadow-emerald-900/20 hover:brightness-110 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5" />
                <span>Créer une Publication</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-800 text-white border border-slate-700 font-poppins font-medium text-sm hover:bg-slate-750 hover:border-slate-600 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <span>Visualiser le Site</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center space-x-2 text-[#FF8A00] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Aide & Guide</span>
            </div>
            <p className="font-inter text-xs text-slate-400 leading-relaxed">
              Ce tableau de bord vous permet de piloter l'activité de SaniNova. Gérez les contacts reçus depuis le site et administrez les publications visibles dans l'espace "Insights & Publications".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
