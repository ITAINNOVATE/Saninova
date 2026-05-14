"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import { supabase } from "../../../lib/supabase";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Tag, Loader2, Bookmark } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  category: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
}

export default function PublicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          });
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id, locale]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-poppins text-dark/50">{t.common.loading}</p>
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
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <img 
          src={article.image} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link 
              href="/publications"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors font-poppins text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.common.back}</span>
            </Link>

            <div className="flex items-center space-x-3">
              <span className="bg-accent text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase font-poppins tracking-widest">
                {article.category}
              </span>
            </div>

            <h1 className="font-montserrat text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-4xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/70 font-poppins text-sm border-t border-white/10 pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>{article.readTime} de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-accent" />
                <span>Analyse SaniNova</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-dark/5">
          <div className="prose prose-lg max-w-none prose-primary">
            <p className="font-inter text-xl text-dark/80 leading-relaxed font-medium mb-8 border-l-4 border-accent pl-6">
              {article.desc}
            </p>
            
            <div className="font-inter text-dark/70 space-y-6 leading-relaxed">
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
            </div>

            {/* Footer of article */}
            <div className="mt-16 pt-8 border-t border-light flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  SN
                </div>
                <div>
                  <p className="font-poppins font-bold text-dark m-0 leading-none">Rédaction SaniNova</p>
                  <p className="font-inter text-xs text-dark/40 m-0">Think-Tank Innovation</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  navigator.share?.({
                    title: article.title,
                    text: article.desc,
                    url: window.location.href,
                  });
                }}
                className="flex items-center space-x-2 text-primary hover:text-accent transition-colors font-poppins font-bold text-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Partager l'analyse</span>
              </button>
            </div>
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
