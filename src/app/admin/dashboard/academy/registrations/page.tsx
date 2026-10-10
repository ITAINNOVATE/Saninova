"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { 
  Search, Filter, ArrowLeft, Loader2, 
  CheckCircle2, XCircle, MoreHorizontal, 
  Download, Mail, Phone, ExternalLink,
  CreditCard, UserCheck, AlertCircle, Clock,
  Edit2, Trash2, X, Eye, User, GraduationCap, FileText,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminAcademyRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Details modal state
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDetailsReg, setSelectedDetailsReg] = useState<any | null>(null);

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
    payment_reference: "",
    notes: "",
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchRegistrations = async (autoSync = true) => {
    setLoading(true);
    setFetchError(null);
    try {
      if (autoSync) {
        try {
          await fetch("/api/academy/sync-payments");
        } catch (e) {
          console.warn("Auto-sync error:", e);
        }
      }

      // First try join with academy_trainings
      const { data, error } = await supabase
        .from("academy_registrations")
        .select("*, academy_trainings(title)")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Join query failed, attempting simple select:", error);
        // Fallback to simple select
        const { data: simpleData, error: simpleErr } = await supabase
          .from("academy_registrations")
          .select("*")
          .order("created_at", { ascending: false });

        if (simpleErr) {
          throw simpleErr;
        }
        if (simpleData) setRegistrations(simpleData);
      } else if (data) {
        setRegistrations(data);
      }
    } catch (err: any) {
      console.error("Error fetching registrations:", err);
      setFetchError(err.message || "Erreur de chargement des inscriptions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncPayments = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/academy/sync-payments");
      const json = await res.json();
      if (json.success && json.syncedCount > 0) {
        alert(`Synchronisation FedaPay réussie ! ${json.syncedCount} inscription(s) mise(s) à jour.`);
      }
      await fetchRegistrations(false);
    } catch (e: any) {
      alert("Erreur lors de la synchronisation: " + e.message);
    } finally {
      setSyncing(false);
    }
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

  const openDetailsModal = (reg: any) => {
    setSelectedDetailsReg(reg);
    setIsDetailsModalOpen(true);
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
      payment_reference: reg.payment_reference || "",
      notes: reg.notes || "",
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

      const updatedList = registrations.map(r => 
        r.id === editingReg.id ? { ...r, ...editFormData } : r
      );
      setRegistrations(updatedList);
      
      if (selectedDetailsReg && selectedDetailsReg.id === editingReg.id) {
        setSelectedDetailsReg({ ...selectedDetailsReg, ...editFormData });
      }

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
      if (selectedDetailsReg && selectedDetailsReg.id === id) {
        setSelectedDetailsReg({ ...selectedDetailsReg, payment_status: status });
      }
    }
  };

  const calculateFinancials = (reg: any) => {
    if (!reg) {
      return {
        totalAmount: 0,
        paidAmount: 0,
        remainingAmount: 0,
        formattedTotal: "0 FCFA",
        formattedPaid: "0 FCFA",
        formattedRemaining: "0 FCFA",
      };
    }

    // 1. Détermination du tarif total de la formation
    let totalAmount = 75000;
    
    if (reg.role && reg.role.toLowerCase().includes("titulaire")) {
      totalAmount = 100000;
    } else if (reg.role && reg.role.toLowerCase().includes("assistant")) {
      totalAmount = 75000;
    } else if (reg.notes) {
      const matchTarif = reg.notes.match(/Profil:.*?(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i) || 
                         reg.notes.match(/(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i);
      if (matchTarif) {
        const parsed = parseInt(matchTarif[1].replace(/[\s.]/g, ""), 10);
        if (parsed > 0) totalAmount = parsed;
      }
    }

    // 2. Détermination du montant payé
    let paidAmount = 0;
    if (reg.payment_status === "completed") {
      const matchPaid = reg.notes?.match(/Paiement(?:\s+total)?\s*-\s*(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i);
      if (matchPaid) {
        paidAmount = parseInt(matchPaid[1].replace(/[\s.]/g, ""), 10) || totalAmount;
      } else {
        paidAmount = totalAmount;
      }
    } else if (reg.payment_status === "acompte") {
      const matchAcompte = reg.notes?.match(/Acompte\s*-\s*(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i);
      if (matchAcompte) {
        paidAmount = parseInt(matchAcompte[1].replace(/[\s.]/g, ""), 10) || Math.round(totalAmount / 2);
      } else {
        paidAmount = Math.round(totalAmount / 2);
      }
    } else {
      paidAmount = 0;
    }

    // 3. Montant restant
    const remainingAmount = Math.max(0, totalAmount - paidAmount);

    return {
      totalAmount,
      paidAmount,
      remainingAmount,
      formattedTotal: totalAmount.toLocaleString("fr-FR") + " FCFA",
      formattedPaid: paidAmount.toLocaleString("fr-FR") + " FCFA",
      formattedRemaining: remainingAmount.toLocaleString("fr-FR") + " FCFA",
    };
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

  const getTrainingTitle = (r: any) => {
    if (r.academy_trainings?.title) return r.academy_trainings.title;
    if (r.notes && r.notes.includes("Officine")) return "Formation Professionnelle : Gestion d’une Officine Moderne";
    if (r.notes && r.notes.includes("Supply Chain")) return "Certificat Professionnel Supply Chain Pharmaceutique";
    if (r.notes && r.notes.includes("Formation:")) {
      const match = r.notes.match(/Formation:\s*([^.]+)/);
      if (match) return match[1].trim();
    }
    return "Formation Professionnelle";
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
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSyncPayments}
            disabled={syncing || loading}
            className="px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all shadow-lg text-sm"
            title="Interroger FedaPay en direct pour actualiser le statut réel des paiements"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Synchronisation..." : "Synchroniser FedaPay"}
          </button>
          <button 
            onClick={() => fetchRegistrations(true)}
            disabled={loading || syncing}
            className="px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all shadow-lg text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-emerald-400" /> : "↻"} Actualiser
          </button>
          <button 
            onClick={exportToCSV}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" /> Exporter en CSV
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{fetchError}</span>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex justify-between items-start">
            <UserCheck className="text-emerald-400 w-8 h-8" />
            <span className="text-white font-black text-3xl">
              {registrations.filter(r => r.payment_status === 'completed' || r.payment_status === 'acompte').length}
            </span>
          </div>
          <p className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest mt-4">Inscriptions Confirmées</p>
        </div>
        <div className="p-6 rounded-3xl bg-orange/10 border border-orange/20">
          <div className="flex justify-between items-start">
            <Clock className="text-orange w-8 h-8" />
            <span className="text-white font-black text-3xl">
              {registrations.filter(r => r.payment_status === 'pending' || !r.payment_status).length}
            </span>
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
                      <button 
                        onClick={() => openDetailsModal(r)}
                        className="text-left group/btn focus:outline-none"
                        title="Voir la fiche détaillée"
                      >
                        <p className="text-white font-bold text-sm leading-tight group-hover/btn:text-emerald-400 transition-colors flex items-center gap-1.5">
                          {r.fullname}
                          <Eye className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </p>
                        <p className="text-slate-500 text-xs mt-1">{r.email}</p>
                      </button>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-slate-300 text-xs font-medium">
                        <p className="font-bold">{r.organization}</p>
                        <p className="text-slate-500">{r.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-white/70 text-[11px] font-bold max-w-[200px] line-clamp-1">{getTrainingTitle(r)}</p>
                    </td>
                    <td className="px-6 py-6">
                       {r.payment_status === 'completed' ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                           <CheckCircle2 className="w-3 h-3" /> Confirmé
                         </span>
                       ) : r.payment_status === 'acompte' ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                           <CheckCircle2 className="w-3 h-3" /> Acompte réglé
                         </span>
                       ) : r.payment_status === 'pending' || !r.payment_status ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/10 text-orange text-[10px] font-black uppercase tracking-widest border border-orange/20">
                           <Clock className="w-3 h-3" /> En attente
                         </span>
                       ) : (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                           <XCircle className="w-3 h-3" /> {r.payment_status}
                         </span>
                       )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openDetailsModal(r)}
                          className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all shadow-sm"
                          title="Voir tous les détails (Montant payé, restant, etc.)"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a href={`mailto:${r.email}`} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all" title="Envoyer un email">
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

      {/* Details Modal */}
      {isDetailsModalOpen && selectedDetailsReg && (() => {
        const fin = calculateFinancials(selectedDetailsReg);
        const cleanPhone = (selectedDetailsReg.phone || "").replace(/[^\d+]/g, "");
        const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}` : null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setIsDetailsModalOpen(false)}
            />
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-800/80 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <User className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-bold font-montserrat text-white">
                      {selectedDetailsReg.fullname}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Inscrit le {new Date(selectedDetailsReg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {selectedDetailsReg.payment_status === 'completed' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirmé
                    </span>
                  ) : selectedDetailsReg.payment_status === 'acompte' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-wider border border-blue-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Acompte réglé
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-black uppercase tracking-wider border border-orange/20">
                      <Clock className="w-3.5 h-3.5" /> En attente
                    </span>
                  )}
                  <button 
                    onClick={() => setIsDetailsModalOpen(false)} 
                    className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Financial Cards */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" /> Bilan Financier de la Formation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Total Amount */}
                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">Tarif Formation</p>
                    <p className="text-xl font-black text-white">{fin.formattedTotal}</p>
                    <p className="text-slate-500 text-[10px] mt-1">{selectedDetailsReg.role || "Prix standard"}</p>
                  </div>

                  {/* Paid Amount */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-emerald-400/80 text-[11px] font-bold uppercase tracking-wider mb-1">Montant Payé</p>
                    <p className="text-xl font-black text-emerald-400">{fin.formattedPaid}</p>
                    <p className="text-emerald-500/70 text-[10px] mt-1">
                      {selectedDetailsReg.payment_status === 'completed' ? "100% Encaissé" : selectedDetailsReg.payment_status === 'acompte' ? "Acompte perçu" : "Aucun paiement"}
                    </p>
                  </div>

                  {/* Remaining Amount */}
                  <div className={`p-4 rounded-2xl border ${fin.remainingAmount === 0 ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-orange/10 border-orange/20'}`}>
                    <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${fin.remainingAmount === 0 ? 'text-emerald-400' : 'text-orange'}`}>
                      Reste à Payer
                    </p>
                    <p className={`text-xl font-black ${fin.remainingAmount === 0 ? 'text-emerald-400' : 'text-orange'}`}>
                      {fin.formattedRemaining}
                    </p>
                    <p className={`text-[10px] mt-1 ${fin.remainingAmount === 0 ? 'text-emerald-400/70' : 'text-orange/70'}`}>
                      {fin.remainingAmount === 0 ? "✓ Solde entièrement réglé" : "⚠️ Solde à recouvrer"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Participant Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" /> Informations Personnelles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[11px] font-medium">Email</p>
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${selectedDetailsReg.email}`} className="text-white text-sm font-semibold hover:text-emerald-400 transition-colors break-all">
                        {selectedDetailsReg.email}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-slate-500 text-[11px] font-medium">Téléphone</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a href={`tel:${cleanPhone}`} className="text-white text-sm font-semibold hover:text-emerald-400 transition-colors">
                        {selectedDetailsReg.phone || "Non renseigné"}
                      </a>
                      {whatsappUrl && (
                        <a 
                          href={whatsappUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[11px] font-bold inline-flex items-center gap-1 transition-all"
                        >
                          WhatsApp ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-slate-500 text-[11px] font-medium">Organisation / Entreprise</p>
                    <p className="text-white text-sm font-semibold">{selectedDetailsReg.organization || "Non renseignée"}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-slate-500 text-[11px] font-medium">Rôle / Poste</p>
                    <p className="text-white text-sm font-semibold">{selectedDetailsReg.role || "Non renseigné"}</p>
                  </div>
                </div>
              </div>

              {/* Training Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" /> Formation Choisie
                </h4>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-snug">
                      {getTrainingTitle(selectedDetailsReg)}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Identifiant formation : <span className="font-mono text-slate-500">{selectedDetailsReg.training_id || "N/A"}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment & Transaction Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" /> Données de Transaction & Reçu
                </h4>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-1 font-medium">Référence de Transaction :</span>
                    {selectedDetailsReg.payment_reference ? (
                      <span className="font-mono bg-slate-900 px-2.5 py-1 rounded-md text-emerald-400 border border-slate-800 select-all font-bold">
                        {selectedDetailsReg.payment_reference}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Aucune référence de transaction (non payé en ligne)</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1 font-medium">Notes & Reçu Opérateur :</span>
                    <p className="text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono text-[11px] select-all">
                      {selectedDetailsReg.notes || "Aucune note additionnelle."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={async () => {
                      const newStatus = selectedDetailsReg.payment_status === 'completed' ? 'pending' : 'completed';
                      await updatePaymentStatus(selectedDetailsReg.id, newStatus);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all flex items-center gap-2"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    Basculer en {selectedDetailsReg.payment_status === 'completed' ? '« En attente »' : '« Confirmé »'}
                  </button>
                  <button
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      openEditModal(selectedDetailsReg);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                    Modifier la fiche
                  </button>
                </div>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-5 py-2 bg-[#00A878] hover:bg-[#00A878]/90 text-xs font-bold text-white rounded-xl transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        );
      })()}

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Statut Paiement</label>
                  <select
                    value={editFormData.payment_status}
                    onChange={(e) => setEditFormData({ ...editFormData, payment_status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  >
                    <option value="pending">En attente</option>
                    <option value="acompte">Acompte réglé</option>
                    <option value="completed">Confirmé (Payé)</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Réf. Transaction</label>
                  <input
                    type="text"
                    placeholder="ex: trx_xxx ou FEDAR-xxx"
                    value={editFormData.payment_reference || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, payment_reference: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Notes / Détails du règlement</label>
                <textarea
                  rows={2}
                  placeholder="Informations sur le paiement, opérateur, reçu..."
                  value={editFormData.notes || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-850 border border-slate-750 text-sm text-white rounded-lg focus:outline-none focus:border-[#00A878] outline-none"
                />
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
