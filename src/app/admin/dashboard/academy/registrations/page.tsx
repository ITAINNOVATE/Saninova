"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Search, Filter, ArrowLeft, Loader2, 
  CheckCircle2, XCircle, MoreHorizontal, 
  Download, Mail, Phone, ExternalLink,
  CreditCard, UserCheck, AlertCircle, Clock,
  Edit2, Trash2, X
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminAcademyRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReg, setEditingReg] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState<any>({
    fullname: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    payment_status: "",
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("academy_registrations")
      .select("*, academy_trainings(title)")
      .order("created_at", { ascending: false });

    if (data) setRegistrations(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette inscription ?")) return;
    try {
      const { error } = await supabase
        .from("academy_registrations")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      setRegistrations(registrations.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error deleting registration:", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const openEditModal = (reg: any) => {
    setEditingReg(reg);
    setEditFormData({
      fullname: reg.fullname || "",
      email: reg.email || "",
      phone: reg.phone || "",
      organization: reg.organization || "",
      role: reg.role || "",
      payment_status: reg.payment_status || "pending",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;

    try {
      const { error } = await supabase
        .from("academy_registrations")
        .update(editFormData)
        .eq("id", editingReg.id);

      if (error) throw error;

      setRegistrations(registrations.map(r => 
        r.id === editingReg.id ? { ...r, ...editFormData } : r
      ));
      setIsEditModalOpen(false);
      setEditingReg(null);
    } catch (err) {
      console.error("Error updating registration:", err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("academy_registrations")
      .update({ payment_status: status })
      .eq("id", id);
    
    if (!error) {
      setRegistrations(registrations.map(r => r.id === id ? { ...r, payment_status: status } : r));
    }
  };

  const filtered = registrations.filter(r => 
    r.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Nom", "Email", "Téléphone", "Organisation", "Formation", "Date", "Statut Paiement"];
    const rows = filtered.map(r => [
      r.fullname,
      r.email,
      r.phone,
      r.organization,
      r.academy_trainings?.title || "N/A",
      new Date(r.created_at).toLocaleDateString(),
      r.payment_status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inscriptions_academy_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/admin/dashboard/academy" className="inline-flex items-center text-slate-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour Academy
          </Link>
          <h1 className="text-3xl font-montserrat font-black text-white">
            Inscriptions & Participants
          </h1>
        </div>
        <button 
          onClick={exportToCSV}
          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all shadow-lg"
        >
          <Download className="w-5 h-5" /> Exporter en CSV
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex justify-between items-start">
            <UserCheck className="text-emerald-400 w-8 h-8" />
            <span className="text-white font-black text-3xl">{registrations.filter(r => r.payment_status === 'completed').length}</span>
          </div>
          <p className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest mt-4">Inscriptions Confirmées</p>
        </div>
        <div className="p-6 rounded-3xl bg-orange/10 border border-orange/20">
          <div className="flex justify-between items-start">
            <Clock className="text-orange w-8 h-8" />
            <span className="text-white font-black text-3xl">{registrations.filter(r => r.payment_status === 'pending').length}</span>
          </div>
          <p className="text-orange/70 text-xs font-bold uppercase tracking-widest mt-4">Paiements en attente</p>
        </div>
        <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex justify-between items-start">
            <CreditCard className="text-blue-400 w-8 h-8" />
            <span className="text-white font-black text-3xl">{registrations.length}</span>
          </div>
          <p className="text-blue-400/70 text-xs font-bold uppercase tracking-widest mt-4">Total Inscriptions</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Rechercher un participant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#00A878] transition-all outline-none"
          />
        </div>
      </div>

      {/* List Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-400" />
            <p className="font-poppins">Chargement des participants...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center text-slate-500">
             Aucune inscription trouvée.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-6">Participant</th>
                  <th className="px-6 py-6">Organisation</th>
                  <th className="px-6 py-6">Formation</th>
                  <th className="px-6 py-6">Paiement</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-white font-bold text-sm leading-tight group-hover:text-emerald-400 transition-colors">{r.fullname}</p>
                        <p className="text-slate-500 text-xs mt-1">{r.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-slate-300 text-xs font-medium">
                        <p className="font-bold">{r.organization}</p>
                        <p className="text-slate-500">{r.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-white/70 text-[11px] font-bold max-w-[200px] line-clamp-1">{r.academy_trainings?.title || 'Formation supprimée'}</p>
                    </td>
                    <td className="px-6 py-6">
                       {r.payment_status === 'completed' ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                           <CheckCircle2 className="w-3 h-3" /> Confirmé
                         </span>
                       ) : r.payment_status === 'pending' ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/10 text-orange text-[10px] font-black uppercase tracking-widest border border-orange/20">
                           <Clock className="w-3 h-3" /> En attente
                         </span>
                       ) : (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                           <XCircle className="w-3 h-3" /> Annulé
                         </span>
                       )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`mailto:${r.email}`} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all">
                          <Mail className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => updatePaymentStatus(r.id, r.payment_status === 'completed' ? 'pending' : 'completed')}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
                          title="Changer statut paiement"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(r)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(r.id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-all"
                          title="Supprimer"
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-montserrat text-white">Modifier l'Inscription</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={editFormData.fullname}
                  onChange={(e) => setEditFormData({ ...editFormData, fullname: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Téléphone</label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Organisation</label>
                  <input
                    type="text"
                    required
                    value={editFormData.organization}
                    onChange={(e) => setEditFormData({ ...editFormData, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Poste / Rôle</label>
                  <input
                    type="text"
                    required
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Statut Paiement</label>
                <select
                  value={editFormData.payment_status}
                  onChange={(e) => setEditFormData({ ...editFormData, payment_status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                >
                  <option value="pending">En attente</option>
                  <option value="completed">Confirmé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 font-poppins">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-sm font-bold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00A878] hover:bg-[#00A878]/90 text-sm font-bold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
