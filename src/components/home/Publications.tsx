"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, Clock, ArrowRight, Loader2, Heart, MessageSquare, Share2, Check } from "lucide-react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

interface Article {
  id: string;
  category: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  likesCount: number;
  commentsCount?: number;
}

export const Publications: React.FC = () => {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadDynamicPublications = async () => {
    try {
      const { data, error } = await supabase
        .from("saninova_publications")
        .select(`
          *,
          saninova_comments (count)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped = data.map((item) => ({
          id: item.id,
          category: item.category,
          title: locale === "fr" ? item.title_fr : item.title_en,
          desc: locale === "fr" ? item.desc_fr : item.desc_en,
          date: locale === "fr" ? item.date_fr : item.date_en,
          readTime: locale === "fr" ? item.read_time_fr : item.read_time_en,
          image: item.image_url,
          likesCount: item.likes_count || 0,
          commentsCount: item.saninova_comments?.[0]?.count || 0,
        }));
        setArticles(mapped);

        // Populate liked states from localStorage
        const loadedLikes: Record<string, boolean> = {};
        mapped.forEach((pub) => {
          const key = `saninova_liked_${pub.id}`;
          if (typeof window !== "undefined" && localStorage.getItem(key)) {
            loadedLikes[pub.id] = true;
          }
        });
        setLikedMap(loadedLikes);
      } else {
        // Fallback
        const staticList = t.publications.list.map((item: any) => ({
          ...item,
          likesCount: 0,
          commentsCount: 0,
        }));
        setArticles(staticList);
      }
    } catch (err) {
      console.error("Failed to load dynamic publications:", err);
      const staticList = t.publications.list.map((item: any) => ({
        ...item,
        likesCount: 0,
        commentsCount: 0,
      }));
      setArticles(staticList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDynamicPublications();

    // Subscribe to real-time updates for both publications and comments
    const pubChannel = supabase
      .channel("publications_catalog_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "saninova_publications",
        },
        () => {
          loadDynamicPublications();
        }
      )
      .subscribe();

    const commentsChannel = supabase
      .channel("comments_catalog_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "saninova_comments",
        },
        () => {
          loadDynamicPublications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pubChannel);
      supabase.removeChannel(commentsChannel);
    };
  }, [locale, t.publications.list]);

  const handleLike = async (e: React.MouseEvent, articleId: string, currentLikes: number) => {
    e.preventDefault();
    e.stopPropagation();

    const key = `saninova_liked_${articleId}`;
    const wasLiked = likedMap[articleId] || false;

    try {
      if (wasLiked) {
        const newLikes = Math.max(0, currentLikes - 1);
        setLikedMap((prev) => ({ ...prev, [articleId]: false }));
        if (typeof window !== "undefined") {
          localStorage.removeItem(key);
        }
        await supabase
          .from("saninova_publications")
          .update({ likes_count: newLikes })
          .eq("id", articleId);
      } else {
        const newLikes = currentLikes + 1;
        setLikedMap((prev) => ({ ...prev, [articleId]: true }));
        if (typeof window !== "undefined") {
          localStorage.setItem(key, "true");
        }
        await supabase
          .from("saninova_publications")
          .update({ likes_count: newLikes })
          .eq("id", articleId);
      }
      loadDynamicPublications();
    } catch (err) {
      console.error("Error toggling like from catalog:", err);
    }
  };

  const handleShare = (e: React.MouseEvent, article: Article) => {
    e.preventDefault();
    e.stopPropagation();

    const url = typeof window !== "undefined" ? `${window.location.origin}/publications/${article.id}` : "";
    
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: article.title,
        text: article.desc,
        url: url,
      }).catch(console.error);
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(url);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const categories = [
    { id: "all", label: t.publications.categories.all },
    { id: "digital", label: t.publications.categories.digital },
    { id: "governance", label: t.publications.categories.governance },
    { id: "supply", label: t.publications.categories.supply },
  ];

  const filteredArticles = articles.filter((article) => {
    const title = article.title || "";
    const desc = article.desc || "";
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="publications" className="py-24 bg-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <span className="inline-block font-poppins text-xs font-bold text-orange tracking-widest uppercase border-b-2 border-orange pb-1">
            {t.publications.tag}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {t.publications.title}
          </h2>
          <p className="font-inter text-lg text-dark/70">
            {t.publications.subtitle}
          </p>
        </div>

        {/* Filters and search block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-3xl border border-dark/5 shadow-sm">
          {/* Categories Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-poppins transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-md shadow-primary/10"
                    : "bg-light text-dark/60 hover:text-primary hover:bg-light/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={t.publications.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-light text-dark text-sm px-4 py-2.5 pl-10 rounded-2xl border border-dark/5 focus:outline-none focus:border-accent focus:bg-white transition-all duration-300 font-inter"
            />
            <Search className="w-4 h-4 text-dark/40 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Publications Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#00A878] animate-spin mb-4" />
            <p className="text-sm font-poppins text-dark/50">Chargement des articles...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article) => {
              const isLiked = likedMap[article.id] || false;
              const isCopied = copiedId === article.id;

              return (
                <motion.article
                  key={article.id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl overflow-hidden border border-dark/5 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col h-full relative"
                >
                  {/* Link wrapper around card cover & title area to ensure access to detail page */}
                  <Link href={`/publications/${article.id}`} className="flex flex-col flex-grow">
                    {/* Image Cover */}
                    <div className="relative overflow-hidden aspect-video shrink-0 bg-primary/5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Category Tag overlay */}
                      <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase font-poppins tracking-wider shadow-md">
                        {categories.find((c) => c.id === article.category)?.label || article.category}
                      </span>
                    </div>

                    {/* Article Info */}
                    <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                      <div className="space-y-3">
                        {/* Date and read time */}
                        <div className="flex items-center space-x-4 text-xs text-dark/40 font-poppins font-medium">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-accent" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        <h3 className="font-poppins text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="font-inter text-sm sm:text-base text-dark/70 leading-relaxed line-clamp-3">
                          {article.desc}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Card Actions Footer (Like, Comment indicator, Share) */}
                  <div className="px-6 pb-6 pt-4 border-t border-light/60 flex items-center justify-between bg-slate-50/50 mt-auto">
                    
                    {/* Interaction row */}
                    <div className="flex items-center gap-3">
                      
                      {/* Like button on card */}
                      <button 
                        onClick={(e) => handleLike(e, article.id, article.likesCount)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold font-poppins transition-all duration-300 active:scale-95 ${
                          isLiked 
                            ? "bg-red-50 text-red-500 border border-red-100" 
                            : "bg-white text-dark/50 hover:text-red-500 border border-dark/5"
                        }`}
                        title={isLiked ? "Retirer votre j'aime" : "J'aime cet article"}
                      >
                        <Heart className={`w-3.5 h-3.5 transition-transform ${isLiked ? "fill-red-500 scale-110" : ""}`} />
                        <span>{article.likesCount}</span>
                      </button>

                      {/* Comment indicator on card */}
                      <Link 
                        href={`/publications/${article.id}#comments-section`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-primary/5 text-dark/50 hover:text-primary border border-dark/5 rounded-full text-xs font-bold font-poppins transition-all"
                        title="Voir la discussion"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#00A878]" />
                        <span>{article.commentsCount}</span>
                      </Link>
                    </div>

                    {/* Share button on card */}
                    <button 
                      onClick={(e) => handleShare(e, article)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-poppins transition-all duration-300 active:scale-95 ${
                        isCopied 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-white text-dark/50 hover:text-primary border border-dark/5"
                      }`}
                      title="Partager l'article"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Partager</span>
                        </>
                      )}
                    </button>

                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="font-poppins text-lg text-dark/40 font-semibold">
              {t.publications.noResults}
            </p>
          </div>
        )}

        {/* Global Read More CTA */}
        <div className="text-center mt-16">
          <a
            href="#publications"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white font-poppins font-semibold px-6 py-3 rounded-full text-sm shadow-md transition-all duration-300"
          >
            <span>{t.publications.allArticles}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Publications;
