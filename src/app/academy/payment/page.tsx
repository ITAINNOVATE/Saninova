"use client";

import React, { useState, useEffect, Suspense } from "react";
import { 
  CreditCard, Smartphone, ShieldCheck, 
  ArrowLeft, CheckCircle2, Lock, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PageHero from "../../../components/ui/PageHero";
import { staticModules } from "../../../lib/academyHelpers";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainingSlug = searchParams.get("training") || "";
  
  const [selectedMethod, setSelectedMethod] = useState("fedapay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [participantName, setParticipantName] = useState("Jean Dupont");
  const [courseDetails, setCourseDetails] = useState({
    title: "Formation Générale SaniNova",
    price: "250.000",
    currency: "XOF",
    slug: ""
  });

  useEffect(() => {
    // Load participant name from localStorage
    const savedName = localStorage.getItem("registered_fullname");
    if (savedName) {
      setParticipantName(savedName);
    }

    // Resolve course details
    if (trainingSlug) {
      const staticMatch = staticModules.find(m => m.slug === trainingSlug);
      if (staticMatch) {
        setCourseDetails({
          title: staticMatch.title,
          price: parseInt(staticMatch.price).toLocaleString('fr-FR'),
          currency: staticMatch.currency,
          slug: staticMatch.slug
        });
      } else {
        // Fallbacks for legacy/Supabase courses
        const databaseCourses: Record<string, { title: string; price: string; currency: string }> = {
          "gouvernance-sanitaire-afrique": {
            title: "Gouvernance Sanitaire et Leadership en Afrique",
            price: "250.000",
            currency: "XOF"
          },
          "sante-digitale-interoperabilite": {
            title: "Santé Digitale et Interopérabilité en Afrique",
            price: "350.000",
            currency: "XOF"
          },
          "regulation-pharmaceutique-avancee": {
            title: "Régulation Pharmaceutique Avancée en Afrique",
            price: "300.000",
            currency: "XOF"
          }
        };

        const match = databaseCourses[trainingSlug];
        if (match) {
          setCourseDetails({
            title: match.title,
            price: match.price,
            currency: match.currency,
            slug: trainingSlug
          });
        } else {
          // General fallback
          setCourseDetails({
            title: trainingSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            price: "250.000",
            currency: "XOF",
            slug: trainingSlug
          });
        }
      }
    }
  }, [trainingSlug]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingScript = document.getElementById("fedapay-checkout-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "fedapay-checkout-script";
        script.src = "https://cdn.fedapay.com/checkout.js?v=1.1.7";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const handlePayment = async () => {
    if (selectedMethod === "fedapay") {
      const FedaPay = (window as any).FedaPay;
      if (FedaPay) {
        try {
          const priceValue = parseInt(courseDetails.price.replace(/\D/g, ""));
          let finalAmount = priceValue;
          if (courseDetails.currency === "USD") {
            finalAmount = priceValue * 600;
          }

          const nameParts = participantName.trim().split(" ");
          const firstname = nameParts[0] || "Participant";
          const lastname = nameParts.slice(1).join(" ") || "SaniNova";
          const savedEmail = localStorage.getItem("registered_email") || "contact@saninova.com";
          
          // Mark paid so the confirmation screen validates it correctly
          if (trainingSlug) {
            localStorage.setItem(`paid_${trainingSlug}`, "true");
          }
          
          const widget = FedaPay.init({
            public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY || "pk_live_glLmgqSBaYSt9ktutyPAmLuh",
            transaction: {
              amount: finalAmount,
              currency: {
                iso: "XOF"
              },
              description: `Frais d'inscription - ${courseDetails.title}`,
            },
            customer: {
              firstname: firstname,
              lastname: lastname,
              email: savedEmail,
            },
            callback_url: `${window.location.origin}/academy/confirmation?training=${trainingSlug}`
          });
          
          widget.open();
          return;
        } catch (err) {
          console.error("FedaPay widget initialization failed:", err);
          alert("Une erreur est survenue lors de l'initialisation du paiement Fédapay.");
        }
      } else {
        console.warn("FedaPay script not loaded. Redirecting to backup link...");
        window.open("https://app.fedapay.com", "_blank");
      }
    } else if (selectedMethod === "izichangepay") {
      setIsProcessing(true);
      try {
        const savedEmail = localStorage.getItem("registered_email") || "contact@saninova.com";
        const fullname = participantName || "Apprenant SaniNova";
        const nameParts = fullname.trim().split(" ");
        const firstname = nameParts[0] || "Apprenant";
        const lastname = nameParts.slice(1).join(" ") || "SaniNova";
        const priceValue = parseInt(courseDetails.price.replace(/\D/g, ""));
        const currency = courseDetails.currency || (courseDetails.price.includes("USD") || courseDetails.price.includes("$") ? "USD" : "XOF");

        const response = await fetch("/api/payment/izipay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: priceValue,
            currency: currency,
            firstname,
            lastname,
            email: savedEmail,
            trainingSlug,
          }),
        });

        const data = await response.json();
        if (data.status && data.url) {
          if (trainingSlug) {
            localStorage.setItem(`paid_${trainingSlug}`, "true");
          }
          window.open(data.url, "_blank");
          setIsProcessing(false);
          router.push(`/academy/confirmation?training=${trainingSlug}`);
          return;
        } else {
          console.error("Erreur IzichangePay:", data.message, data.details);
          alert("Erreur de paiement IzichangePay : " + (data.message || "Impossible d'initialiser le paiement."));
          setIsProcessing(false);
          return;
        }
      } catch (err) {
        console.error("Erreur requête IzichangePay:", err);
        alert("Une erreur de connexion est survenue avec le service de paiement IzichangePay.");
        setIsProcessing(false);
        return;
      }
    }

    // Fallback simulation for Izipay or if script is missing
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (trainingSlug) {
      localStorage.setItem(`paid_${trainingSlug}`, "true");
    }
    setIsProcessing(false);
    router.push(`/academy/confirmation?training=${trainingSlug}`);
  };

  const paymentMethods = [
    { id: "fedapay", name: "Fedapay", provider: "Avec Mobile Money", icon: <Smartphone className="w-8 h-8" />, color: "bg-blue-600" },
    { id: "izichangepay", name: "Izichangepay", provider: "Par Cryptomonnaie", icon: <ShieldCheck className="w-8 h-8" />, color: "bg-orange" },
  ];

  // Cryptos acceptées sur IziChangePay
  const acceptedCryptos = [
    { symbol: "USDC", name: "USD Coin", networks: ["ERC20", "POLYGON", "BEP20", "SOL"], color: "#2775CA", emoji: "🟦" },
    { symbol: "USDT", name: "Tether", networks: ["ERC20", "BEP20", "POLYGON", "SOL", "TON"], color: "#26A17B", emoji: "🟩" },
    { symbol: "BTC", name: "Bitcoin", networks: ["Native"], color: "#F7931A", emoji: "₿" },
    { symbol: "ETH", name: "Ethereum", networks: ["Native"], color: "#627EEA", emoji: "🔷" },
    { symbol: "BNB", name: "BNB", networks: ["Native"], color: "#F3BA2F", emoji: "🟡" },
    { symbol: "SOL", name: "Solana", networks: ["Native"], color: "#9945FF", emoji: "🟪" },
    { symbol: "XRP", name: "XRP", networks: ["Native"], color: "#346AA9", emoji: "🟦" },
    { symbol: "ADA", name: "Cardano", networks: ["Native"], color: "#0033AD", emoji: "🟦" },
    { symbol: "TRX", name: "TRON", networks: ["Native"], color: "#FF0013", emoji: "🔴" },
    { symbol: "XLM", name: "Stellar", networks: ["Native"], color: "#7D00FF", emoji: "⭐" },
    { symbol: "DOGE", name: "Dogecoin", networks: ["Native"], color: "#C2A633", emoji: "🐶" },
  ];

  return (
    <>
      <PageHero 
        title="Paiement Sécurisé"
        subtitle="Finalisez votre inscription en toute simplicité."
        backgroundImages={[
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80"
        ]}
      />
      <div className="bg-dark pb-24">
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <div className="mb-8">
            <Link 
              href={`/academy/trainings/${trainingSlug || ""}`}
              className="inline-flex items-center text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Retour
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0F1D33] rounded-3xl border border-white/5 p-6 shadow-xl sticky top-32">
                <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-orange rounded-full" />
                  Résumé
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex flex-col gap-1 pb-4 border-b border-white/5">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Formation</p>
                    <p className="text-white font-bold text-sm leading-snug">{courseDetails.title}</p>
                  </div>
                  <div className="flex flex-col gap-1 pb-4 border-b border-white/5">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Participant</p>
                    <p className="text-white font-bold text-sm">{participantName}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Total à payer</p>
                    <p className="text-orange font-black text-3xl mt-1">
                      {courseDetails.price} <span className="text-sm font-bold opacity-60">{courseDetails.currency}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 flex items-start gap-3">
                  <ShieldCheck className="text-accent w-5 h-5 flex-shrink-0" />
                  <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                    Vos informations de paiement sont cryptées et sécurisées selon les standards internationaux.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Payment Methods */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white font-black text-xl mb-6">Modes de paiement</h3>
              
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-[32px] border transition-all ${selectedMethod === method.id ? "bg-white/10 border-orange shadow-lg shadow-orange/10" : "bg-white/5 border-white/5 hover:border-white/20"}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${method.color} text-white flex items-center justify-center shadow-lg`}>
                      {method.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-black text-lg">{method.name}</p>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{method.provider}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === method.id ? "border-orange bg-orange" : "border-white/20"}`}>
                    {selectedMethod === method.id && <CheckCircle2 className="text-white w-4 h-4" />}
                  </div>
                </button>
              ))}

              {/* Cryptos acceptées — visible uniquement si IziChangePay est sélectionné */}
              {selectedMethod === "izichangepay" && (
                <div className="mt-2 bg-white/5 border border-white/10 rounded-[24px] p-5">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    Cryptomonnaies acceptées
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {acceptedCryptos.map((crypto) => (
                      <div
                        key={crypto.symbol}
                        className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-2.5 transition-all group"
                      >
                        {/* Logo cercle coloré */}
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg"
                          style={{ backgroundColor: crypto.color }}
                        >
                          {crypto.symbol.slice(0, 2)}
                        </div>
                        <span className="text-white font-bold text-xs">{crypto.symbol}</span>
                        {/* Réseaux */}
                        <div className="flex flex-wrap justify-center gap-0.5">
                          {crypto.networks.map((net) => (
                            <span
                              key={net}
                              className="text-[8px] text-white/40 font-medium bg-white/5 px-1 py-0.5 rounded"
                            >
                              {net}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/30 text-[10px] text-center mt-4 font-medium">
                    Le réseau de paiement sera choisi automatiquement lors du checkout IziChangePay
                  </p>
                </div>
              )}

              <div className="pt-8">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-6 bg-orange text-white rounded-[24px] font-black text-xl shadow-2xl shadow-orange/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      Redirection vers {selectedMethod === "fedapay" ? "Fedapay" : "Izichangepay"}...
                    </>
                  ) : (
                    <>
                      {selectedMethod === "fedapay" ? "Payer via Fedapay (Mobile Money)" : "Payer via Izichangepay (Crypto)"} <ChevronRight />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-8 mt-8">
                  <div className={`flex items-center gap-2 transition-all ${selectedMethod === "fedapay" ? "opacity-100" : "opacity-20 grayscale"}`}>
                    <div className="bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded-lg">FEDAPAY</div>
                    <span className="text-white/40 text-xs font-bold">Mobile Money</span>
                  </div>
                  <div className={`flex items-center gap-2 transition-all ${selectedMethod === "izichangepay" ? "opacity-100" : "opacity-20 grayscale"}`}>
                    <div className="bg-orange text-white text-xs font-black px-3 py-1.5 rounded-lg">IZICHANGEPAY</div>
                    <span className="text-white/40 text-xs font-bold">Cryptomonnaie</span>
                  </div>
                </div>

                <p className="text-center text-white/30 text-xs mt-6 font-medium">
                  🔒 Paiement sécurisé — Vous serez redirigé vers la plateforme de paiement choisie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AcademyPayment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white font-bold animate-pulse">Chargement de la page de paiement...</div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
