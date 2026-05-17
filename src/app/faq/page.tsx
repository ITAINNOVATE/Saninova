"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import PageHero from "../../components/ui/PageHero";
import { Search, ChevronDown, MessageSquare, ArrowRight, X, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fallback translations if not yet loaded from supabase dynamically
  const faqData = useMemo(() => {
    return t.faqPage || {
      title: "FAQ SaniNova Global Consulting",
      subtitle: "Trouvez des réponses à toutes vos questions sur nos expertises, services et formations.",
      searchPlaceholder: "Rechercher une question...",
      noResults: "Aucune question ne correspond à votre recherche.",
      categories: {
        all: "Toutes les questions",
        general: "SaniNova & Vision",
        services: "Expertises & Services",
        digital: "Digitalisation & Santé",
        academy: "Formations & Inscriptions",
      },
      items: []
    };
  }, [t.faqPage]);

  // Categories list
  const categoriesList = useMemo(() => {
    return [
      { id: "all", label: faqData.categories?.all || "Toutes les questions" },
      { id: "general", label: faqData.categories?.general || "SaniNova & Vision" },
      { id: "services", label: faqData.categories?.services || "Expertises & Services" },
      { id: "digital", label: faqData.categories?.digital || "Digitalisation & Santé" },
      { id: "academy", label: faqData.categories?.academy || "Formations & Inscriptions" },
    ];
  }, [faqData]);

  // Filtered FAQ items based on category and search query
  const filteredFAQs = useMemo(() => {
    if (!faqData.items) return [];

    return faqData.items.filter((item: { category: string; q: string; a: string }, index: number) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      
      const matchesSearch = 
        searchQuery.trim() === "" ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [faqData.items, activeCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Helper to format answers (handling bullet points and paragraph breaks gracefully)
  const renderAnswerContent = (text: string) => {
    if (!text) return null;
    
    return text.split("\n\n").map((paragraph, pIdx) => {
      // Check if this paragraph contains bullet points
      if (paragraph.includes("•")) {
        const bulletPoints = paragraph.split("\n");
        const listItems = bulletPoints
          .map(line => line.replace("•", "").trim())
          .filter(line => line !== "");
          
        return (
          <ul key={pIdx} className="list-none space-y-3.5 my-4 pl-4 border-l-2 border-accent/30">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-base text-dark/70 leading-relaxed font-poppins">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      
      // Simple paragraph with possible inline line breaks
      return (
        <p key={pIdx} className="text-base sm:text-lg text-dark/70 leading-relaxed font-poppins mb-4 last:mb-0">
          {paragraph.split("\n").map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {line}
              {lIdx < paragraph.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  return (
    <>
      <PageHero 
        title={faqData.title}
        subtitle={faqData.subtitle}
        backgroundImages={["/images/bg_about.png", "/images/bg_about2.png"]}
      />

      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Modern Medical Tech Background Blurs */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 filter blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Dynamic Interactive Control Panel (Search & Tabs) */}
          <div className="mb-14 space-y-8 bg-light/30 border border-dark/5 rounded-[32px] p-6 sm:p-8 backdrop-blur-md shadow-xl shadow-dark/5">
            {/* Real-time Filter Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-dark/40 group-focus-within:text-accent transition-colors duration-200" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null); // Collapse accordion when searching to prevent visual clutter
                }}
                placeholder={faqData.searchPlaceholder}
                className="w-full pl-13 pr-12 py-4.5 bg-white border border-dark/10 rounded-2xl text-dark font-poppins text-base sm:text-lg shadow-inner focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder:text-dark/40"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-4 flex items-center justify-center p-2 text-dark/40 hover:text-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null); // Reset open accordion
                  }}
                  className={`px-5 py-2.5 rounded-xl font-poppins text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-accent text-white shadow-lg shadow-accent/25 scale-105"
                      : "bg-white text-dark/70 border border-dark/5 hover:bg-light hover:text-dark"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion list */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq: { category: string; q: string; a: string }, idx: number) => {
                const isOpen = openIndex === idx;
                
                return (
                  <div
                    key={idx}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-accent shadow-xl shadow-accent/5 ring-1 ring-accent/20"
                        : "border-dark/5 shadow-md shadow-dark/5 hover:border-dark/20"
                    }`}
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left px-6 py-5.5 flex items-start justify-between gap-5 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-4">
                        <HelpCircle className={`w-6 h-6 mt-0.5 shrink-0 transition-colors duration-300 ${isOpen ? "text-accent" : "text-dark/40"}`} />
                        <h3 className={`font-montserrat text-lg font-bold transition-colors duration-200 leading-snug ${isOpen ? "text-accent" : "text-dark"}`}>
                          {faq.q}
                        </h3>
                      </div>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-light/50 border border-dark/5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-accent/10 border-accent/20 text-accent" : "text-dark/40"}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {/* Content Body */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? "max-h-[1200px] border-t border-dark/5" : "max-h-0 pointer-events-none"
                      }`}
                    >
                      <div className="p-6 sm:p-8 bg-light/20">
                        {renderAnswerContent(faq.a)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty Search / Filter State */
              <div className="text-center py-16 bg-light/20 border border-dashed border-dark/10 rounded-3xl p-8 shadow-inner">
                <HelpCircle className="w-14 h-14 mx-auto text-dark/30 mb-4 animate-pulse" />
                <h4 className="font-montserrat text-xl font-bold text-dark mb-2">
                  {faqData.noResults}
                </h4>
                <p className="text-dark/50 text-base max-w-md mx-auto">
                  {locale === "fr" 
                    ? "Essayez de modifier vos filtres ou de saisir d'autres mots-clés pour trouver ce que vous cherchez."
                    : "Try modifying your filters or entering different keywords to find what you are looking for."}
                </p>
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="mt-6 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-poppins text-sm font-semibold transition-all shadow-md shadow-accent/25 hover:scale-105"
                  >
                    {locale === "fr" ? "Réinitialiser la recherche" : "Reset search"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Premium Bottom Contact Support CTA */}
          <div className="mt-20 bg-gradient-to-br from-primary to-[#0F1D33] rounded-[40px] border border-white/5 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/10 rounded-full filter blur-[50px] pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto text-accent">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-black text-white">
                {locale === "fr" ? "Vous avez d'autres questions ?" : "Have more questions?"}
              </h3>
              <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto font-poppins">
                {locale === "fr"
                  ? "Notre équipe d'experts est à votre entière disposition pour vous accompagner dans vos projets complexes."
                  : "Our team of experts is at your entire disposal to support you in your complex projects."}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-orange text-white rounded-xl font-poppins font-black shadow-lg shadow-orange/20 hover:scale-105 hover:shadow-orange/30 transition-all inline-flex items-center gap-3.5 group"
                >
                  <span>{locale === "fr" ? "Contactez un expert" : "Contact an expert"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
