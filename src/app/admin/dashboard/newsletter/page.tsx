"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { 
  Mail, 
  Trash2, 
  Download, 
  Search, 
  Calendar, 
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch subscribers from Supabase
  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("saninova_newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;
      setSubSubscribersList(data || []);
    } catch (err: any) {
      console.error("Error fetching subscribers:", err);
      setError("Impossible de charger la liste des abonnés.");
    } finally {
      setLoading(false);
    }
  };

  const setSubSubscribersList = (data: any[]) => {
    setSubscribers(data);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete subscriber
  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Voulez-vous vraiment désabonner l'adresse : ${email} ?`)) {
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from("saninova_newsletter_subscribers")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;
      
      // Update state locally
      setSubscribers(prev => prev.filter(sub => sub.id !== id));
      showActionMessage("success", `L'adresse ${email} a été supprimée avec succès.`);
    } catch (err: any) {
      console.error("Error deleting subscriber:", err);
      showActionMessage("error", "Une erreur est survenue lors de la suppression.");
    }
  };

  // Helper to show flash actions
  const showActionMessage = (type: "success" | "error", text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => {
      setActionMessage(null);
    }, 4000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) return;

    // Build CSV content
    const csvRows = [
      ["Email", "Date d'abonnement"], // header
      ...subscribers.map(sub => [
        sub.email, 
        new Date(sub.created_at).toLocaleString("fr-FR")
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `abonnés_newsletter_saninova_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter subscribers based on search query
  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Action Flash Notifications */}
      <AnimatePresence>
        {actionMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl ${
              actionMessage.type === "success" 
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" 
                : "bg-rose-950/90 border-rose-500/30 text-rose-400"
            }`}
          >
            {actionMessage.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-poppins text-sm font-semibold">{actionMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-montserrat font-black text-white mb-2">
            Abonnés à la Newsletter
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Visualisez et exportez la liste des adresses email enregistrées pour la newsletter.
          </p>
        </div>

        {subscribers.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold font-poppins text-sm shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export en CSV
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total des abonnés</p>
          <p className="text-4xl font-montserrat font-black text-white">
            {loading ? "..." : subscribers.length}
          </p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Abonnés récents (30j)</p>
          <p className="text-4xl font-montserrat font-black text-emerald-400">
            {loading ? "..." : subscribers.filter(sub => {
              const subDate = new Date(sub.created_at);
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              return subDate >= thirtyDaysAgo;
            }).length}
          </p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Dernière activité</p>
          <p className="text-lg font-poppins font-bold text-white mt-2">
            {loading ? "..." : subscribers[0] 
              ? new Date(subscribers[0].created_at).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })
              : "Aucune"}
          </p>
        </div>
      </div>

      {/* Filter and Table container */}
      <div className="bg-slate-900/20 border border-slate-800/80 rounded-[32px] p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher une adresse email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-poppins text-sm">Chargement de la liste des abonnés...</p>
          </div>
        ) : error ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-slate-300 font-bold mb-2">{error}</p>
            <button 
              onClick={fetchSubscribers} 
              className="text-emerald-400 hover:underline font-semibold"
            >
              Réessayer
            </button>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Aucun abonné trouvé</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              {searchQuery 
                ? "Aucune adresse ne correspond à vos critères de recherche." 
                : "La liste des abonnés est actuellement vide."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-poppins font-bold text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Adresse Email</th>
                  <th className="py-4 px-6 flex items-center gap-2"><Calendar className="w-4 h-4" /> Date d'abonnement</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/10 transition-colors group">
                    <td className="py-4 px-6">
                      <span className="font-poppins text-sm font-medium text-slate-200">{sub.email}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400">
                      {new Date(sub.created_at).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(sub.id, sub.email)}
                        className="p-2 bg-slate-800/10 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Désabonner"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
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
