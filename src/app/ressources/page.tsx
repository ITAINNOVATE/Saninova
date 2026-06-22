"use client";

import React, { useState, useEffect } from "react";
import { ResourceCard } from "../../components/resources/ResourceCard";
import { supabase } from "../../lib/supabase";
import { Search, File, X, Loader2, CreditCard, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  file_type: string;
  file_url: string;
  is_free: boolean;
  price_usd: number;
  created_at: string;
}

export default function RessourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [isPaidModalOpen, setIsPaidModalOpen] = useState(false);

  // Email state for free download
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subMessage, setSubMessage] = useState("");

  // FedaPay script loading
  useEffect(() => {
    const scriptId = "fedapay-checkout-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.fedapay.com/checkout.js?v=1.1.7";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("saninova_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResources(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Free Download Handler
  const handleFreeDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedResource) return;

    setIsSubmitting(true);
    setSubMessage("");

    try {
      // Subscribe to newsletter
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale: "fr" }),
      });

      const data = await res.json();
      if (!res.ok && !data.success && !data.alreadySubscribed) {
        throw new Error(data.error || "Erreur d'inscription");
      }

      setSubMessage("Inscription validée ! Téléchargement en cours...");
      
      // Trigger download
      setTimeout(() => {
        window.open(selectedResource.file_url, '_blank');
        setIsFreeModalOpen(false);
        setIsSubmitting(false);
        setEmail("");
        setSubMessage("");
      }, 1500);

    } catch (err: any) {
      setSubMessage(err.message || "Une erreur est survenue.");
      setIsSubmitting(false);
    }
  };

  // Paid Download Handler
  const handlePaidDownload = () => {
    if (!selectedResource) return;

    const FedaPay = (window as any).FedaPay;
    if (!FedaPay) {
      alert("Le module de paiement FedaPay est en cours de chargement. Veuillez patienter un instant.");
      return;
    }

    // Convert USD to FCFA (approx 600)
    const amountFCFA = selectedResource.price_usd * 600;

    try {
      const widget = FedaPay.init({
        public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY || "pk_live_glLmgqSBaYSt9ktutyPAmLuh",
        transaction: {
          amount: amountFCFA,
          description: `Achat Ressource : ${selectedResource.title}`,
        },
        customer: {
          email: "contact@saninovagc.com", 
          lastname: "Client",
          firstname: "Ressource",
        },
        onComplete: (resp: any) => {
          if (resp.reason === "CHECKOUT COMPLETE") {
            alert("Paiement réussi ! Le téléchargement va démarrer.");
            window.open(selectedResource.file_url, '_blank');
            setIsPaidModalOpen(false);
          }
        }
      });
      widget.open();
    } catch (err) {
      console.error("FedaPay widget initialization failed:", err);
      alert("Erreur lors de l'initialisation du paiement.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header Banner */}
      <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/60 to-primary/95" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: 'url("/images/bg_publications.png")' }}
        />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-40 transform translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6">
            Ressources Documentaires
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-poppins">
            Accédez à notre bibliothèque d'outils, rapports et guides pratiques pour optimiser la gestion de vos systèmes de santé.
          </p>

          <div className="max-w-xl mx-auto mt-10 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-full py-4 pl-12 pr-6 text-slate-900 font-inter focus:outline-none focus:ring-4 focus:ring-accent/30 shadow-2xl transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
            <p className="text-slate-500 font-poppins">Chargement des ressources...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <File className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-poppins font-semibold text-slate-700 mb-2">Aucun document trouvé</h3>
            <p className="text-slate-500 font-inter">Essayez d'autres termes de recherche.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-white/10 shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-300 font-poppins text-sm uppercase tracking-wider bg-white/5">
                  <th className="p-4 font-semibold">N°</th>
                  <th className="p-4 font-semibold">Titre du document</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold">Date de mise en ligne</th>
                  <th className="p-4 font-semibold text-center">Téléchargement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredResources.map((res, index) => (
                  <tr key={res.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-mono text-slate-400">{index + 1}</td>
                    <td className="p-4 font-montserrat font-bold text-white">{res.title}</td>
                    <td className="p-4">
                      <span className="bg-white/10 text-slate-200 font-mono text-xs font-bold px-2 py-1 rounded-md">
                        {res.file_type}
                      </span>
                    </td>
                    <td className="p-4 font-inter text-slate-300 text-sm max-w-xs truncate" title={res.description}>
                      {res.description || "-"}
                    </td>
                    <td className="p-4 font-inter text-slate-400 text-sm whitespace-nowrap">
                      {new Date(res.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4 text-center">
                      {res.is_free ? (
                        <button
                          onClick={() => {
                            setSelectedResource(res);
                            setIsFreeModalOpen(true);
                          }}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-4 py-2 rounded-lg font-poppins text-sm font-medium transition-colors inline-flex items-center whitespace-nowrap"
                        >
                          <Download className="w-4 h-4 mr-2" /> Gratuit
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedResource(res);
                            setIsPaidModalOpen(true);
                          }}
                          className="bg-orange/10 text-orange hover:bg-orange/20 px-4 py-2 rounded-lg font-poppins text-sm font-medium transition-colors inline-flex items-center whitespace-nowrap"
                        >
                          <CreditCard className="w-4 h-4 mr-2" /> Acheter ({res.price_usd} $)
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Free Download Modal */}
      <AnimatePresence>
        {isFreeModalOpen && selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-montserrat font-bold text-slate-900">
                    Téléchargement Gratuit
                  </h3>
                  <button onClick={() => setIsFreeModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-slate-600 font-inter mb-6">
                  Pour télécharger le document <strong>{selectedResource.title}</strong>, veuillez vous inscrire à notre newsletter.
                </p>

                <form onSubmit={handleFreeDownload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 font-poppins">Adresse Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  {subMessage && (
                    <p className={`text-sm font-medium ${subMessage.includes('succès') || subMessage.includes('validée') ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {subMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-poppins font-medium transition-colors flex items-center justify-center shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Traitement...</>
                    ) : (
                      "Accéder au téléchargement"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Paid Download Modal */}
      <AnimatePresence>
        {isPaidModalOpen && selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-montserrat font-bold text-slate-900">
                    Acheter ce document
                  </h3>
                  <button onClick={() => setIsPaidModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
                  <div className="font-poppins font-semibold text-slate-900 mb-1">{selectedResource.title}</div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                    <span className="text-slate-500 font-inter text-sm">Prix</span>
                    <span className="font-montserrat font-bold text-xl text-orange">{selectedResource.price_usd} $</span>
                  </div>
                  <div className="text-right text-xs text-slate-400 mt-1">Soit environ {selectedResource.price_usd * 600} FCFA</div>
                </div>

                <p className="text-slate-600 font-inter text-sm mb-6 text-center">
                  Le paiement est sécurisé via FedaPay (Mobile Money & Cartes). Le téléchargement démarrera automatiquement après validation.
                </p>

                <button
                  onClick={handlePaidDownload}
                  className="w-full bg-orange hover:bg-orange/90 text-white py-3.5 rounded-xl font-poppins font-medium transition-all flex items-center justify-center shadow-lg shadow-orange/20"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Procéder au paiement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
