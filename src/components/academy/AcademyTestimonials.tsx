"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const AcademyTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Moussa Traoré",
      role: "Directeur de l'Innovation, Ministère de la Santé",
      text: "La formation sur la transformation digitale a radicalement changé notre approche du pilotage des données sanitaires. Une expertise concrète et immédiatement applicable.",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "Awa Diop",
      role: "Pharmacienne Hospitalière",
      text: "Le programme certifiant en régulation pharmaceutique est d'un niveau exceptionnel. Les formateurs sont des leaders mondiaux qui connaissent les réalités africaines.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71f1e3c77c?auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Koffi Mensah",
      role: "Consultant International en Santé Publique",
      text: "SaniNova Academy offre un réseau d'élite. Les échanges avec d'autres professionnels du continent ont été aussi riches que les cours eux-mêmes.",
      avatar: "https://images.unsplash.com/photo-1576669801775-ff912ab76b88?auto=format&fit=crop&q=80",
      rating: 5
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-5xl font-montserrat font-black text-white leading-tight">
              Ce que disent nos participants
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[30px] overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange rounded-2xl flex items-center justify-center shadow-lg">
                  <Quote className="text-white w-6 h-6 fill-white" />
                </div>
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange fill-orange" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed mb-8">
                  "{testimonials[activeIndex].text}"
                </p>
                <div>
                  <h4 className="text-white font-montserrat font-black text-xl mb-1">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-accent font-bold text-sm tracking-wide">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile indicators */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <button onClick={prev} className="p-3 bg-white/5 rounded-full text-white"><ChevronLeft /></button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === activeIndex ? "w-8 bg-orange" : "w-2 bg-white/20"}`} />
            ))}
          </div>
          <button onClick={next} className="p-3 bg-white/5 rounded-full text-white"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
};

export default AcademyTestimonials;
