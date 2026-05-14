"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Plus, Search, Edit2, Trash2, 
  Megaphone, ArrowLeft, Loader2,
  Calendar, Tag, Clock
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminAcademyAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("academy_announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setAnnouncements(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cette annonce ?")) {
      const { error } = await supabase.from("academy_announcements").delete().eq("id", id);
      if (!error) setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/admin/dashboard/academy" className="inline-flex items-center text-slate-500 hover:text-white mb-4 text-xs font-bold uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour Academy
          </Link>
          <h1 className="text-3xl font-montserrat font-black text-white">Gestion des Annonces</h1>
        </div>
        <button className="px-6 py-3 bg-orange text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-orange/20">
          <Plus className="w-5 h-5" /> Nouvelle Annonce
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="py-20 text-center text-slate-500">Aucune annonce.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-6">Titre / Type</th>
                  <th className="px-6 py-6">Date Publication</th>
                  <th className="px-6 py-6">Deadline</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange/20 text-orange flex items-center justify-center">
                          <Megaphone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{a.title}</p>
                          <p className="text-orange text-[10px] font-black uppercase mt-1">{a.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-slate-400">{new Date(a.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-6 text-xs text-white font-bold">{a.deadline || "N/A"}</td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
