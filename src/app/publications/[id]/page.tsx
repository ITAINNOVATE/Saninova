"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import { supabase } from "../../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Tag, Loader2, Bookmark, Heart, MessageSquare, Send, Copy, Check } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  category: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function PublicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Likes & Socials State
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const fetchComments = async (pubId: string) => {
    try {
      const { data, error } = await supabase
        .from("saninova_comments")
        .select("*")
        .eq("publication_id", pubId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (data) setComments(data);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("saninova_publications")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setArticle({
            id: data.id,
            category: data.category,
            title: locale === "fr" ? data.title_fr : data.title_en,
            desc: locale === "fr" ? data.desc_fr : data.desc_en,
            date: locale === "fr" ? data.date_fr : data.date_en,
            readTime: locale === "fr" ? data.read_time_fr : data.read_time_en,
            image: data.image_url,
            content: locale === "fr" ? data.content_fr : data.content_en,
          });
          setLikes(data.likes_count || 0);

          // Check localStorage for like state
          const likedKey = `saninova_liked_${data.id}`;
          if (typeof window !== "undefined" && localStorage.getItem(likedKey)) {
            setHasLiked(true);
          }

          // Fetch comments
          fetchComments(data.id);

          // Subscribe to comments realtime
          const commentChannel = supabase
            .channel(`comments_${data.id}`)
            .on(
              "postgres_changes",
              {
                event: "*",
                schema: "public",
                table: "saninova_comments",
                filter: `publication_id=eq.${data.id}`,
              },
              () => {
                fetchComments(data.id);
              }
            )
            .subscribe();

          // Subscribe to likes realtime
          const pubChannel = supabase
            .channel(`pub_likes_${data.id}`)
            .on(
              "postgres_changes",
              {
                event: "UPDATE",
                schema: "public",
                table: "saninova_publications",
                filter: `id=eq.${data.id}`,
              },
              (payload: any) => {
                if (payload.new) {
                  setLikes(payload.new.likes_count || 0);
                }
              }
            )
            .subscribe();

          return () => {
            supabase.removeChannel(commentChannel);
            supabase.removeChannel(pubChannel);
          };
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id, locale]);

  const handleLike = async () => {
    if (!article) return;
    const likedKey = `saninova_liked_${article.id}`;
    
    try {
      if (hasLiked) {
        // Decrement like
        const newLikes = Math.max(0, likes - 1);
        setLikes(newLikes);
        setHasLiked(false);
        if (typeof window !== "undefined") {
          localStorage.removeItem(likedKey);
        }
        
        await supabase
          .from("saninova_publications")
          .update({ likes_count: newLikes })
          .eq("id", article.id);
      } else {
        // Increment like
        const newLikes = likes + 1;
        setLikes(newLikes);
        setHasLiked(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(likedKey, "true");
        }
        
        await supabase
          .from("saninova_publications")
          .update({ likes_count: newLikes })
          .eq("id", article.id);
      }
    } catch (err) {
      console.error("Error setting like:", err);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !newCommentName.trim() || !newCommentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      const { error } = await supabase
        .from("saninova_comments")
        .insert({
          publication_id: article.id,
          author_name: newCommentName.trim(),
          content: newCommentText.trim(),
        });

      if (error) throw error;
      setNewCommentText("");
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Impossible d'ajouter le commentaire pour le moment.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrls = {
    twitter: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || "")}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
    facebook: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
    linkedin: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
    whatsapp: () => `https://api.whatsapp.com/send?text=${encodeURIComponent((article?.title || "") + " - " + (typeof window !== "undefined" ? window.location.href : ""))}`,
  };

  const renderArticleContent = (content: string) => {
    if (!content) return null;

    // Helper to format body text and replace [1], [2] with smooth scroll references to the bibliography
    const formatParagraphText = (text: string) => {
      const parts = text.split(/(\[\d+\])/g);
      if (parts.length === 1) return text;

      return parts.map((part, index) => {
        const isRef = /^\[\d+\]$/.test(part);
        if (isRef) {
          return (
            <a
              key={index}
              href="#bibliography-block"
              className="text-accent hover:text-accent/80 font-bold hover:underline mx-0.5 cursor-pointer select-none inline-flex items-center align-baseline text-xs"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("bibliography-block");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              {part}
            </a>
          );
        }
        return part;
      });
    };

    // Split into lines, trim, and filter out any empty lines to prevent double spaces
    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const orangeHeadings = [
      "Des défis structurels qui persistent",
      "Une transformation qui ne peut plus attendre",
      "Un coût humain et financier considérable",
      "L’eLMIS : quand la donnée devient un outil de gouvernance",
      "La donnée logistique, nouveau pilier de la souveraineté sanitaire",
      "Ce que la transformation numérique rend possible",
      "Une dynamique continentale en accélération",
      "La donnée comme infrastructure stratégique",
      "La traçabilité : bien plus qu’un outil technique",
      "De la sérialisation à la souveraineté pharmaceutique",
      "Un écosystème numérique au service de la confiance publique",
      "La gouvernance, liant invisible de toutes les réformes",
      "Le leadership : moteur silencieux des transformations réussies",
      "Vers une souveraineté institutionnelle numérique",
      "Des systèmes pilotés par la donnée et renforcés par la crise",
      "La santé comme investissement stratégique, pas comme dépense sociale",
      "Ce que SaniNova croit et ce que nous construisons ensemble",
      "Structural challenges that persist",
      "A transformation that can no longer wait",
      "A considerable human and financial cost",
      "eLMIS: when data becomes a governance tool",
      "Logistics data, new pillar of health sovereignty",
      "What digital transformation makes possible",
      "An accelerating continental dynamic",
      "Data as a strategic infrastructure"
    ];

    const renderedElements: React.ReactNode[] = [];
    const biblioLines: string[] = [];
    let isInBibliography = false;
    let biblioHeader: string | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if it's the Bibliography Header
      if (
        line.toLowerCase().includes("références bibliographiques") || 
        line.toLowerCase().includes("bibliographical references")
      ) {
        isInBibliography = true;
        biblioHeader = line;
        continue;
      }

      if (isInBibliography) {
        biblioLines.push(line);
        continue;
      }

      // Check if it is an orange subheading
      if (orangeHeadings.some(heading => heading.toLowerCase() === line.toLowerCase())) {
        renderedElements.push(
          <h3 
            key={`heading-${i}`} 
            className="font-montserrat text-lg sm:text-xl font-extrabold text-orange mt-10 mb-4 tracking-tight leading-snug"
          >
            {line}
          </h3>
        );
      } else {
        // Normal paragraph with custom text-justify for beautiful editorial alignment and inline scroll links
        renderedElements.push(
          <p 
            key={`para-${i}`} 
            className="font-inter text-dark/70 text-base sm:text-lg leading-relaxed text-justify"
          >
            {formatParagraphText(line)}
          </p>
        );
      }
    }

    // If we have bibliography entries, render them grouped inside a single container with tight space-y-2
    if (biblioHeader || biblioLines.length > 0) {
      renderedElements.push(
        <div id="bibliography-block" key="bibliography-block" className="mt-10 pt-6 border-t border-light scroll-mt-20">
          {biblioHeader && (
            <h4 className="font-inter text-base font-bold text-dark/80 mb-4">
              {biblioHeader}
            </h4>
          )}
          <div className="font-inter text-sm text-dark/60 space-y-3 text-justify">
            {biblioLines.map((line, idx) => {
              const match = line.match(/^(\[\d+\])\s*(.*)$/);
              if (match) {
                const marker = match[1];
                const text = match[2];
                const searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(text)}`;

                return (
                  <p key={`bib-${idx}`} className="leading-relaxed">
                    <span className="font-bold text-accent mr-2">{marker}</span>
                    <a 
                      href={searchUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-accent hover:underline transition-all duration-200 cursor-pointer text-dark/70 hover:font-medium"
                    >
                      {text}
                    </a>
                  </p>
                );
              }
              return (
                <p key={`bib-${idx}`} className="leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      );
    }

    return renderedElements;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-poppins text-dark/50">{t.common?.loading || "Chargement..."}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Article non trouvé</h2>
        <p className="font-inter text-dark/60 mb-8 max-w-md">
          Désolé, l'article que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <Link 
          href="/publications"
          className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full font-poppins font-semibold transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux publications</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header / Hero */}
      <div className="relative min-h-[500px] w-full flex items-end pt-36 pb-20 sm:pb-28">
        <img 
          src={article.image} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-dark/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Link 
              href="/publications"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors font-poppins text-xs font-bold uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>{t.common?.back || "Retour"}</span>
            </Link>

            <div className="flex items-center">
              <span className="bg-accent text-white px-3.5 py-1 rounded-full text-[9px] font-extrabold uppercase font-poppins tracking-widest">
                {article.category}
              </span>
            </div>

            <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug max-w-4xl tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/70 font-poppins text-xs font-semibold border-t border-white/10 pt-4 mt-2">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-accent" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-accent" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Bookmark className="w-4 h-4 text-accent" />
                <span>Analyse SaniNova</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
        
        {/* Main Article Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-dark/5">
          <div className="prose prose-lg max-w-none prose-primary">
            
            {/* Description / Introduction */}
            <p className="font-inter text-xl text-dark/80 leading-relaxed font-medium mb-8 border-l-4 border-accent pl-6 text-justify">
              {article.desc}
            </p>
            
            {/* Dynamic Body Text */}
            <div className="font-inter text-dark/70 space-y-6 leading-relaxed mb-12">
              {article.content ? (
                renderArticleContent(article.content)
              ) : (
                <>
                  <p>
                    L'Afrique de l'Ouest connaît une transformation sans précédent de ses structures de santé. 
                    SaniNova, à travers cette analyse, explore les leviers stratégiques qui permettront de pérenniser 
                    ces avancées technologiques et organisationnelles.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-primary font-montserrat mt-10">Un contexte en pleine mutation</h2>
                  <p>
                    La transition vers des systèmes de santé plus résilients nécessite non seulement des investissements 
                    financiers massifs, mais surtout une refonte de la gouvernance et de l'approche logistique. 
                    Le "dernier kilomètre" reste le défi majeur pour l'accès aux soins de qualité.
                  </p>

                  <div className="bg-light/50 p-8 rounded-2xl border border-primary/5 my-10">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-accent" />
                      Points Clés de l'Analyse
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-dark/80">
                      <li>Nécessité d'une interopérabilité des systèmes d'information.</li>
                      <li>Formation continue des cadres de santé aux outils digitaux.</li>
                      <li>Partenariats public-privé pour le financement des infrastructures critiques.</li>
                      <li>Souveraineté pharmaceutique régionale comme pilier de la sécurité sanitaire.</li>
                    </ul>
                  </div>

                  <p>
                    En conclusion, l'avenir de la santé en Afrique repose sur une vision holistique intégrant 
                    innovation technologique et expertise locale. SaniNova continue d'accompagner ces changements 
                    pour un impact durable sur les populations.
                  </p>
                </>
              )}
            </div>

            {/* Premium Dynamic Action Bar (Like, Comment, Share) */}
            <div className="py-6 border-t border-b border-light flex flex-col md:flex-row items-center justify-between gap-6 my-12 bg-light/35 p-6 rounded-2xl">
              
              {/* Interaction Left Block */}
              <div className="flex items-center gap-4">
                
                {/* Like Button */}
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold font-poppins transition-all duration-300 active:scale-95 ${
                    hasLiked 
                      ? "bg-red-50 text-red-500 shadow-md shadow-red-100 border border-red-200" 
                      : "bg-white text-dark/60 hover:text-red-500 hover:bg-red-50/55 border border-dark/5"
                  }`}
                >
                  <Heart className={`w-5 h-5 transition-transform duration-300 ${hasLiked ? "fill-red-500 scale-110" : ""}`} />
                  <span>{hasLiked ? "Aimé" : "Aimer"}</span>
                  <span className="bg-dark/5 text-dark/80 px-2 py-0.5 rounded-md text-xs font-black">{likes}</span>
                </button>

                {/* Comment Jump button */}
                <a 
                  href="#comments-section"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-dark/60 hover:text-primary hover:bg-primary/5 border border-dark/5 rounded-full text-sm font-bold font-poppins transition-all active:scale-95"
                >
                  <MessageSquare className="w-5 h-5 text-[#00A878]" />
                  <span>Commenter</span>
                  <span className="bg-dark/5 text-dark/80 px-2 py-0.5 rounded-md text-xs font-black">{comments.length}</span>
                </a>
              </div>

              {/* Share Block Right */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-black font-poppins uppercase tracking-widest text-dark/40 mr-2">Partager :</span>
                
                {/* Twitter / X */}
                <a 
                  href={shareUrls.twitter()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-100 border border-dark/5 rounded-full hover:scale-105 active:scale-95 transition-all text-slate-800"
                  title="Partager sur X (Twitter)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href={shareUrls.facebook()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-blue-50 border border-dark/5 rounded-full hover:scale-105 active:scale-95 transition-all text-blue-600"
                  title="Partager sur Facebook"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href={shareUrls.linkedin()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-blue-50 border border-dark/5 rounded-full hover:scale-105 active:scale-95 transition-all text-blue-700"
                  title="Partager sur LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a 
                  href={shareUrls.whatsapp()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-emerald-50 border border-dark/5 rounded-full hover:scale-105 active:scale-95 transition-all text-emerald-600"
                  title="Partager sur WhatsApp"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.385 9.861-9.779.002-2.614-1.012-5.071-2.859-6.921C16.626 2.055 14.17 1.04 11.561 1.04c-5.437 0-9.859 4.386-9.862 9.78-.001 1.777.472 3.511 1.371 5.071L2.094 22l6.215-1.625c1.554.848 3.118 1.285 4.338 1.285h.014zm11.397-6.848c-.31-.156-1.834-.905-2.119-1.01-.285-.104-.493-.156-.7.156-.207.312-.802.104-.983.312-.18.208-.362.234-.672.078-.31-.156-1.309-.48-2.493-1.537-.92-.818-1.54-1.83-1.72-2.14-.18-.312-.019-.481.136-.635.14-.138.31-.36.466-.54.156-.18.207-.31.311-.52.104-.208.052-.39-.026-.546-.078-.156-.7-1.688-.958-2.312-.25-.603-.526-.52-.72-.53-.186-.01-.399-.012-.612-.012-.213 0-.56.08-.853.4-.293.32-1.12 1.1-1.12 2.682 0 1.582 1.146 3.11 1.303 3.32.157.208 2.254 3.442 5.46 4.83.763.33 1.358.527 1.821.674.767.244 1.464.21 2.016.128.614-.092 1.834-.75 2.093-1.474.259-.724.259-1.344.18-1.474-.077-.13-.284-.208-.595-.364z"/>
                  </svg>
                </a>

                {/* Copy Link */}
                <button 
                  onClick={copyToClipboard}
                  className={`w-9 h-9 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all border ${
                    copied 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                      : "bg-white border-dark/5 text-dark/60 hover:bg-slate-100"
                  }`}
                  title="Copier le lien"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>

                {copied && (
                  <span className="text-[10px] font-black font-poppins text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded border border-emerald-100 animate-fade-in">
                    Lien copié !
                  </span>
                )}
              </div>

            </div>

            {/* Footer of article (Author bio) */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  SN
                </div>
                <div>
                  <p className="font-poppins font-bold text-dark m-0 leading-none">Rédaction SaniNova</p>
                  <p className="font-inter text-xs text-dark/40 m-0">Think-Tank Innovation</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Premium Comments & Interaction Zone */}
        <div id="comments-section" className="mt-12 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-dark/5">
          <h3 className="font-montserrat text-2xl font-bold text-primary mb-8 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent" />
            <span>Discussion ({comments.length})</span>
          </h3>

          {/* List of Comments */}
          <div className="space-y-6 mb-12">
            <AnimatePresence>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="p-6 bg-light/35 rounded-2xl border border-dark/5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center font-poppins uppercase">
                          {comment.author_name.substring(0, 2)}
                        </div>
                        <span className="font-poppins font-bold text-dark text-sm">{comment.author_name}</span>
                      </div>
                      
                      <span className="text-[10px] font-bold text-dark/40 font-poppins uppercase tracking-wider">
                        {new Date(comment.created_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>

                    <p className="font-inter text-sm text-dark/75 leading-relaxed pl-11 whitespace-pre-line">
                      {comment.content}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 bg-light/10 border border-dashed border-dark/10 rounded-2xl">
                  <MessageSquare className="w-8 h-8 text-dark/25 mx-auto mb-3" />
                  <p className="font-poppins text-sm text-dark/40 font-bold">Aucun commentaire pour le moment.</p>
                  <p className="font-inter text-xs text-dark/30">Soyez le premier à engager la discussion !</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Write a comment form */}
          <div className="bg-light/25 p-6 sm:p-8 rounded-2xl border border-dark/5">
            <h4 className="font-poppins font-bold text-dark text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-[#00A878]" />
              <span>Laisser un commentaire</span>
            </h4>

            <form onSubmit={handlePostComment} className="space-y-5">
              
              {/* Full Name input */}
              <div className="space-y-2">
                <label className="font-poppins text-xs font-bold text-dark/50 uppercase tracking-wider block">
                  Nom complet
                </label>
                <input 
                  type="text"
                  required
                  placeholder="ex: Jean Dupont"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/10 focus:outline-none focus:border-[#00A878] transition-all duration-300 font-inter"
                />
              </div>

              {/* Message textarea */}
              <div className="space-y-2">
                <label className="font-poppins text-xs font-bold text-dark/50 uppercase tracking-wider block">
                  Votre message ou question
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Écrivez votre commentaire ici..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-white text-dark text-sm px-4 py-3 rounded-xl border border-dark/10 focus:outline-none focus:border-[#00A878] transition-all duration-300 font-inter resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingComment}
                  className="bg-primary hover:bg-[#00A878] text-white font-poppins font-bold text-sm px-8 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-md flex items-center gap-2 disabled:opacity-75"
                >
                  {isSubmittingComment ? (
                    <>
                      <span>Publication...</span>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Publier</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
        
        {/* Back Button Footer */}
        <div className="text-center mt-12">
          <Link 
            href="/publications"
            className="inline-flex items-center space-x-2 text-dark/40 hover:text-primary transition-colors font-poppins font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les publications</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
