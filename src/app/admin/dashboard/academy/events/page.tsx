"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Plus, Calendar as CalendarIcon, MapPin, 
  Clock, ArrowLeft, Loader2, Edit2, Trash2
} from "lucide-react";
import Link from "next/link";

export default function AdminAcademyEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from("academy_events").select("*").order("event_date", { ascending: true });
    if (data) setEvents(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer cet événement ?")) {
      const { error } = await supabase.from("academy_events").delete().eq("id", id);
      if (!error) setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/admin/dashboard/academy" className="inline-flex items-center text-slate-500 hover:text-white mb-4 text-xs font-bold uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour Academy
          </Link>
          <h1 className="text-3xl font-montserrat font-black text-white">Gestion des Événements</h1>
        </div>
        <button className="px-6 py-3 bg-accent text-white rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-accent/20">
          <Plus className="w-5 h-5" /> Nouvel Événement
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
          </div>
        ) : events.length === 0 ? (
          <div className="py-20 text-center text-slate-500">Aucun événement prévu.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-6">Événement</th>
                  <th className="px-6 py-6">Date & Heure</th>
                  <th className="px-6 py-6">Lieu</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                          <CalendarIcon className="w-5 h-5" />
                        </div>
                        <p className="text-white font-bold text-sm">{e.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-xs text-slate-300">
                        <div className="flex items-center gap-2 font-bold"><CalendarIcon className="w-3.5 h-3.5 text-orange" /> {e.event_date}</div>
                        <div className="flex items-center gap-2 text-slate-500 mt-1"><Clock className="w-3.5 h-3.5" /> {e.event_time || "N/A"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-white font-medium">{e.location}</td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(e.id)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
