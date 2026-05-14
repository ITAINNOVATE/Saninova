"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Plus, Search, Edit2, Trash2, Eye, 
  Filter, ArrowLeft, Loader2, Calendar, 
  MapPin, Megaphone, MoreHorizontal, Video
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminAcademyEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("academy_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setEvents(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      const { error } = await supabase
        .from("academy_events")
        .delete()
        .eq("id", id);
      
      if (!error) {
        setEvents(events.filter(e => e.id !== id));
      }
    }
  };

  const filtered = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="pt-4">
          <Link href="/admin/dashboard/academy" className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour Academy
          </Link>
          <h1 className="text-3xl font-montserrat font-black text-white">
            Gestion des Événements
          </h1>
        </div>
        <Link 
          href="/admin/dashboard/academy/events/new"
          className="px-6 py-3 bg-[#F57C00] text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-orange-900/20"
        >
          <Plus className="w-5 h-5" /> Ajouter un événement
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Rechercher par titre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#F57C00] transition-all outline-none"
          />
        </div>
      </div>

      {/* List Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-orange-400" />
            <p className="font-poppins">Chargement des événements...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
              <Calendar className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Aucun événement trouvé</h3>
            <p className="text-slate-500 mb-8">Créez votre premier événement Academy.</p>
            <Link 
              href="/admin/dashboard/academy/events/new"
              className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
            >
              Créer un événement
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-6">Événement</th>
                  <th className="px-6 py-6">Date & Lieu</th>
                  <th className="px-6 py-6">Type</th>
                  <th className="px-6 py-6">Statut</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                          {e.image ? (
                            <img src={e.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600"><Video className="w-6 h-6" /></div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm leading-tight group-hover:text-orange-400 transition-colors">{e.title}</p>
                          <p className="text-slate-500 text-[10px] uppercase font-black tracking-tighter mt-1">{e.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-orange" /> {e.date || "À définir"}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5" /> {e.venue || "En ligne"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-700">
                        {e.type}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                         e.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                         e.status === 'completed' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                         'bg-orange-500/10 text-orange-400 border-orange-500/20'
                       }`}>
                         {e.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/dashboard/academy/events/edit/${e.id}`} 
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-orange-400 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(e.id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
