"use client";

import React, { useState } from "react";
import { 
  CreditCard, Smartphone, ShieldCheck, 
  ArrowLeft, CheckCircle2, Lock, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "../../../components/ui/PageHero";

export default function AcademyPayment() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: "mobile_money", name: "Mobile Money", provider: "MTN / Moov", icon: <Smartphone className="w-8 h-8" />, color: "bg-yellow-500" },
    { id: "card", name: "Carte Bancaire", provider: "Visa / Mastercard", icon: <CreditCard className="w-8 h-8" />, color: "bg-blue-600" },
    { id: "flutterwave", name: "Flutterwave", provider: "Paiement International", icon: <ShieldCheck className="w-8 h-8" />, color: "bg-orange" },
    { id: "paypal", name: "PayPal", provider: "Compte PayPal", icon: <Lock className="w-8 h-8" />, color: "bg-indigo-600" },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    router.push("/academy/confirmation");
  };

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
          {/* Main Content */}

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
                  <p className="text-white font-bold text-sm">Gouvernance Sanitaire et Leadership en Afrique</p>
                </div>
                <div className="flex flex-col gap-1 pb-4 border-b border-white/5">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Participant</p>
                  <p className="text-white font-bold text-sm">Jean Dupont</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Total à payer</p>
                  <p className="text-orange font-black text-3xl mt-1">250.000 <span className="text-sm font-bold opacity-60">XOF</span></p>
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

            <div className="pt-8">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-6 bg-orange text-white rounded-[24px] font-black text-xl shadow-2xl shadow-orange/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    Traitement sécurisé...
                  </>
                ) : (
                  <>
                    Procéder au paiement <ChevronRight />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-8 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
