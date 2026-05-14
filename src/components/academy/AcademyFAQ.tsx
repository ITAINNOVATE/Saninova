"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const AcademyFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      question: "Comment s'inscrire à une formation ?",
      answer: "L'inscription se fait directement en ligne via notre plateforme. Choisissez votre formation, remplissez le formulaire d'inscription et procédez au paiement pour garantir votre place."
    },
    {
      id: 1,
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les paiements via Mobile Money (MTN, Moov), Cartes Bancaires (Visa, Mastercard), PayPal et virement bancaire via nos passerelles sécurisées Flutterwave et Paystack."
    },
    {
      id: 2,
      question: "Est-ce que je reçois un certificat après la formation ?",
      answer: "Oui, toutes nos formations donnent lieu à la délivrance d'un certificat professionnel SaniNova Academy, attestant des compétences acquises et reconnu par nos partenaires institutionnels."
    },
    {
      id: 3,
      question: "Les formations sont-elles accessibles à distance ?",
      answer: "La plupart de nos programmes sont proposés en format hybride (présentiel et en ligne) ou 100% digital pour permettre aux professionnels de toute l'Afrique de se former sans contrainte de déplacement."
    },
    {
      id: 4,
      question: "Quelle est la politique d'annulation et de remboursement ?",
      answer: "Toute annulation effectuée plus de 15 jours avant le début de la formation donne lieu à un remboursement intégral. Entre 15 et 7 jours, 50% sont remboursés. Aucun remboursement n'est possible à moins de 7 jours, mais un report sur une session future peut être envisagé."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-montserrat font-black text-dark mb-6">
            Questions fréquentes
          </h2>
          <p className="text-dark/60 max-w-xl mx-auto">
            Tout ce que vous devez savoir pour démarrer votre parcours de formation avec SaniNova Academy.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className={`rounded-3xl border transition-all duration-300 ${openId === faq.id ? "border-primary shadow-xl shadow-primary/5 bg-primary/5" : "border-dark/10 bg-white hover:border-primary/50"}`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openId === faq.id ? "bg-primary text-white" : "bg-light text-primary"}`}>
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-dark font-montserrat">
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center transition-all ${openId === faq.id ? "rotate-180 bg-primary text-white border-primary" : "text-dark/40"}`}>
                  {openId === faq.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-10 md:pl-20 text-dark/70 leading-relaxed font-poppins">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyFAQ;
