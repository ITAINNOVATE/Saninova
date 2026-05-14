"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { 
  Search, Mail, Trash2, Calendar, Globe, Building, User, Eye, X, AlertCircle, ChevronLeft, ChevronRight, FileText, ArrowLeft 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  institution: string | null;
  country: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactsDashboardPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("saninova_contacts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement ce message ?")) return;
    
    setDeletingId(id);
    try {
      const { error } = await supabase.from("saninova_contacts").delete().eq("id", id);
      if (error) throw error;
      setMessages(messages.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter messages based on search
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.institution && msg.institution.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8 relative min-h-[70vh]">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-2 text-xs font-bold uppercase tracking-widest gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour au Dashboard
          </Link>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Mail className="text-[#00A878]" />
            Boîte de Réception
          </h1>
          <p className="font-inter text-sm text-slate-400 mt-1">
            Consultez et gérez les demandes de consultations reçues depuis le site web.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3.5 shadow-lg shadow-black/20">
        <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
        <input
          type="text"
          placeholder="Rechercher par nom, email, sujet ou institution..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500 w-full font-poppins"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="px-6 py-4 font-poppins text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 font-poppins text-xs font-bold text-slate-400 uppercase tracking-wider">Expéditeur</th>
                <th className="px-6 py-4 font-poppins text-xs font-bold text-slate-400 uppercase tracking-wider">Sujet</th>
                <th className="px-6 py-4 font-poppins text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-6 py-5">
                      <div className="h-6 bg-slate-800 animate-pulse rounded-lg" />
                    </td>
                  </tr>
                ))
              ) : displayedMessages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <Mail className="w-12 h-12 mx-auto text-slate-700 mb-4" />
                    <h3 className="font-poppins font-bold text-slate-400">Aucun message trouvé</h3>
                    <p className="text-xs text-slate-500 mt-1">Vos demandes de contact apparaîtront ici.</p>
                  </td>
                </tr>
              ) : (
                displayedMessages.map((msg) => (
                  <tr 
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-5 text-xs font-poppins text-slate-400 font-medium">
                      {new Date(msg.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-poppins font-bold text-slate-200 group-hover:text-emerald-400 transition-colors text-sm">
                          {msg.name}
                        </span>
                        <span className="font-inter text-xs text-slate-500">{msg.email}</span>
                        {msg.institution && (
                          <span className="mt-1 inline-flex text-[10px] text-emerald-400 border border-emerald-500/10 bg-emerald-500/5 px-2 py-0.5 rounded-md w-max font-medium">
                            {msg.institution}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-inter text-sm font-semibold text-slate-300 line-clamp-1 max-w-[300px]">
                        {msg.subject}
                      </div>
                      <div className="font-inter text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {msg.message}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/10 transition-all"
                          title="Lire"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          disabled={deletingId === msg.id}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination control */}
        {totalPages > 1 && (
          <div className="bg-slate-900/60 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
            <p className="text-xs font-poppins text-slate-400 font-medium">
              Page {page} sur {totalPages}
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white disabled:opacity-50 border border-transparent active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white disabled:opacity-50 border border-transparent active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message Modal Overlay */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setSelectedMessage(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Top Header of the Modal */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <FileText className="w-5 h-5" />
                  <span className="font-poppins font-bold tracking-wide text-slate-200">Demande de consultation</span>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content / Details */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="space-y-2 bg-slate-950/40 border border-slate-800 p-5 rounded-2xl">
                  <h2 className="font-montserrat text-xl font-extrabold text-white tracking-tight leading-snug">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center text-xs text-slate-500 gap-1.5 font-poppins">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reçu le {new Date(selectedMessage.created_at).toLocaleString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>

                {/* Metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-poppins">
                  <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-2xl flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-emerald-400 shrink-0"><User className="w-4 h-4" /></div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Nom complet</span>
                      <p className="text-sm text-slate-100 font-bold">{selectedMessage.name}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-2xl flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-blue-400 shrink-0"><Mail className="w-4 h-4" /></div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Email</span>
                      <a href={`mailto:${selectedMessage.email}`} className="text-sm text-blue-400 font-bold hover:underline truncate block max-w-full">{selectedMessage.email}</a>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-2xl flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-amber-400 shrink-0"><Building className="w-4 h-4" /></div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Institution</span>
                      <p className="text-sm text-slate-100 font-bold">{selectedMessage.institution || "N/A"}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-2xl flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-purple-400 shrink-0"><Globe className="w-4 h-4" /></div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Pays / Région</span>
                      <p className="text-sm text-slate-100 font-bold">{selectedMessage.country}</p>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2 mt-2">
                  <label className="font-poppins text-xs font-bold text-slate-500 uppercase tracking-widest block">Contenu du Message</label>
                  <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl min-h-[150px] font-inter text-sm text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
                    {selectedMessage.message || "Aucun contenu supplémentaire fourni."}
                  </div>
                </div>
              </div>

              {/* Footer Action of Modal */}
              <div className="p-6 bg-slate-950/30 border-t border-slate-800 flex items-center justify-between font-poppins">
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="flex items-center space-x-2 text-xs font-bold text-red-400 bg-red-500/5 border border-red-500/10 px-4 py-2 rounded-xl hover:bg-red-500/10 active:scale-95 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer le message</span>
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=RE: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl active:scale-95 shadow-lg shadow-emerald-900/20 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Répondre par Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
