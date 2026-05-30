"use client";

import React, { useState, useEffect } from "react";
import { 
  BookOpen, Award, Clock, ArrowRight, CheckCircle2, 
  ChevronRight, Bookmark, Sparkles, User, LogOut, ArrowLeft, Lock, Plus, Search, Filter 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import PageHero from "../../../components/ui/PageHero";
import LMSPlayer from "../../../components/academy/LMSPlayer";
import CertificateCard from "../../../components/academy/CertificateCard";
import { staticModules } from "../../../lib/academyHelpers";

export default function StudentPortal() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"dashboard" | "player" | "certificate" | "lock-screen">("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [progresses, setProgresses] = useState<Record<string, { percent: number; completed: any; quizPassed: boolean }>>({});
  const [paidCourses, setPaidCourses] = useState<Record<string, boolean>>({});
  const [studentName, setStudentName] = useState("Dr. Ambroise Gbaguidi");
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"my-courses" | "catalog">("my-courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Fetch courses from Supabase & load local progress/payments
  useEffect(() => {
    // 1. Guard check: Verify authentication session
    const loggedIn = localStorage.getItem("logged_in") === "true";
    if (!loggedIn) {
      router.push("/academy/login");
      return;
    }

    // Load student name from localstorage if exists
    const savedName = localStorage.getItem("registered_fullname");
    if (savedName) {
      setStudentName(savedName);
    }

    const fetchCourses = async () => {
      setLoading(true);
      const allCourses = staticModules;
      setCourses(allCourses);
      
      // Load enrolled slugs from localStorage
      const savedEnrolled = localStorage.getItem("enrolled_slugs");
      let slugs: string[] = [];
      if (savedEnrolled) {
        try {
          slugs = JSON.parse(savedEnrolled);
        } catch (e) {
          console.error(e);
        }
      } else {
        // Auto-enroll in registered training if present
        const savedSlug = localStorage.getItem("registered_training_slug");
        if (savedSlug) {
          slugs = [savedSlug];
          localStorage.setItem("enrolled_slugs", JSON.stringify(slugs));
        } else {
          // Default pre-enroll for demo
          slugs = ["gestion-des-approvisionnements-et-des-stocks"];
          localStorage.setItem("enrolled_slugs", JSON.stringify(slugs));
        }
      }
      setEnrolledSlugs(slugs);
      
      // Fetch progress states and paid states from local storage for each course
      const loadedProgress: any = {};
      const loadedPaid: Record<string, boolean> = {};
      
      allCourses.forEach(c => {
        // Progress
        const savedProgress = localStorage.getItem(`progress_${c.slug}`);
        if (savedProgress) {
          try {
            loadedProgress[c.slug] = JSON.parse(savedProgress);
          } catch (e) {
            console.error(e);
          }
        } else {
          loadedProgress[c.slug] = { percent: 0, completed: {}, quizPassed: false };
        }

        // Payment status
        loadedPaid[c.slug] = localStorage.getItem(`paid_${c.slug}`) === "true";
      });

      setProgresses(loadedProgress);
      setPaidCourses(loadedPaid);
      setLoading(false);
    };

    fetchCourses();
  }, [router]);

  const refreshProgress = () => {
    const loadedProgress: any = {};
    const loadedPaid: Record<string, boolean> = {};
    courses.forEach(c => {
      const saved = localStorage.getItem(`progress_${c.slug}`);
      if (saved) {
        try {
          loadedProgress[c.slug] = JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      } else {
        loadedProgress[c.slug] = { percent: 0, completed: {}, quizPassed: false };
      }
      loadedPaid[c.slug] = localStorage.getItem(`paid_${c.slug}`) === "true";
    });
    setProgresses(loadedProgress);
    setPaidCourses(loadedPaid);

    // Refresh enrolled slugs too
    const savedEnrolled = localStorage.getItem("enrolled_slugs");
    if (savedEnrolled) {
      try {
        setEnrolledSlugs(JSON.parse(savedEnrolled));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEnrollCourse = (courseSlug: string) => {
    const savedEnrolled = localStorage.getItem("enrolled_slugs");
    let slugs: string[] = [];
    if (savedEnrolled) {
      try {
        slugs = JSON.parse(savedEnrolled);
      } catch (e) {
        console.error(e);
      }
    }
    if (!slugs.includes(courseSlug)) {
      const updated = [...slugs, courseSlug];
      localStorage.setItem("enrolled_slugs", JSON.stringify(updated));
      setEnrolledSlugs(updated);
      refreshProgress();
    }
  };

  const handleStartCourse = (course: any) => {
    setSelectedCourse(course);
    const isPaid = paidCourses[course.slug];
    if (isPaid) {
      setActiveView("player");
    } else {
      setActiveView("lock-screen");
    }
  };

  const handleShowCertificate = (course: any) => {
    setSelectedCourse(course);
    setActiveView("certificate");
  };

  const handleCourseCompleted = () => {
    refreshProgress();
  };

  const getCoursePriceDetails = (course: any) => {
    if (!course) return { price: "250.000", currency: "XOF" };
    if (course.isStaticModule || course.id?.startsWith("static-mod-")) {
      const p = parseInt(course.price) || 150;
      return {
        price: p.toLocaleString('fr-FR'),
        currency: course.currency || "USD"
      };
    }
    const databasePrices: Record<string, { price: string; currency: string }> = {
      "gouvernance-sanitaire-afrique": { price: "250.000", currency: "XOF" },
      "sante-digitale-interoperabilite": { price: "350.000", currency: "XOF" },
      "regulation-pharmaceutique-avancee": { price: "300.000", currency: "XOF" }
    };
    return databasePrices[course.slug] || { price: "250.000", currency: "XOF" };
  };

  const activeCoursesCount = Object.keys(progresses).filter(k => enrolledSlugs.includes(k) && progresses[k]?.percent > 0 && progresses[k]?.percent < 100).length;
  const completedCoursesCount = Object.keys(progresses).filter(k => enrolledSlugs.includes(k) && progresses[k]?.quizPassed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white font-black animate-pulse text-lg uppercase tracking-widest">Initialisation de votre espace...</div>
      </div>
    );
  }

  return (
    <>
      <PageHero 
        title="Espace Apprenant SaniNova"
        subtitle="Votre parcours d'apprentissage vers l'excellence en santé."
        backgroundImages={[
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
        ]}
      />

      <div className="bg-dark pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
          
          {/* Main Dashboard View */}
          {activeView === "dashboard" && (
            <div className="space-y-12">
              {/* Profile Card and Stats */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[36px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  {/* Left: Greeting */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange text-2xl font-black uppercase">
                      {studentName ? studentName.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2) : "AG"}
                    </div>
                    <div>
                      <span className="text-orange font-bold text-xs uppercase tracking-widest block mb-1">
                        Plateforme eLearning
                      </span>
                      <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white leading-tight">
                        Ravi de vous revoir, {studentName} !
                      </h2>
                      <p className="text-white/40 text-xs font-semibold mt-1">
                        Suivez vos modules, passez vos quiz et téléchargez vos diplômes officiels.
                      </p>
                    </div>
                  </div>

                  {/* Right: Quick actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        localStorage.setItem("logged_in", "false");
                        router.push("/academy/login");
                      }}
                      className="px-5 py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-400" /> Se déconnecter
                    </button>
                    <Link 
                      href="/academy"
                      className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Quitter l'espace
                    </Link>
                  </div>
                </div>

                {/* Dashboard Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-t border-white/5 pt-10">
                  <div className="bg-[#0A1629] rounded-2xl p-5 border border-white/5">
                    <BookOpen className="w-6 h-6 text-orange mb-3" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Mes formations</span>
                    <span className="text-2xl font-black text-white mt-1 block">{enrolledSlugs.length}</span>
                  </div>
                  <div className="bg-[#0A1629] rounded-2xl p-5 border border-white/5">
                    <Clock className="w-6 h-6 text-blue-400 mb-3" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">En cours</span>
                    <span className="text-2xl font-black text-white mt-1 block">{activeCoursesCount}</span>
                  </div>
                  <div className="bg-[#0A1629] rounded-2xl p-5 border border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-3" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Certificats obtenus</span>
                    <span className="text-2xl font-black text-emerald-400 mt-1 block">{completedCoursesCount}</span>
                  </div>
                  <div className="bg-[#0A1629] rounded-2xl p-5 border border-white/5">
                    <Sparkles className="w-6 h-6 text-yellow-400 mb-3" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Statut</span>
                    <span className="text-xs font-bold text-white mt-2 block bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/20 w-fit">
                      Membre Premium
                    </span>
                  </div>
                </div>
              </div>

              {/* Learning Catalog & Enrolled Courses with Tabs */}
              <div>
                {/* Tabs Selector */}
                <div className="flex gap-6 border-b border-white/5 pb-4 mb-8">
                  <button
                    onClick={() => setActiveTab("my-courses")}
                    className={`pb-2 px-4 text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${activeTab === "my-courses" ? "text-orange" : "text-white/40 hover:text-white"}`}
                  >
                    Mes Formations ({enrolledSlugs.length})
                    {activeTab === "my-courses" && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className={`pb-2 px-4 text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${activeTab === "catalog" ? "text-orange" : "text-white/40 hover:text-white"}`}
                  >
                    Parcourir le Catalogue ({courses.length})
                    {activeTab === "catalog" && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                  </button>
                </div>

                {/* Tab: My Courses */}
                {activeTab === "my-courses" && (
                  <>
                    {enrolledSlugs.length === 0 ? (
                      <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-12 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden my-8">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <BookOpen className="w-12 h-12 text-orange/40 mx-auto mb-4" />
                        <h4 className="text-white font-montserrat font-bold text-lg mb-2">Aucun module en cours</h4>
                        <p className="text-white/40 text-xs leading-relaxed mb-8 max-w-sm mx-auto">
                          Vous n'êtes inscrit à aucun module de formation pour le moment. Parcourez notre catalogue premium pour choisir une formation et commencer votre apprentissage.
                        </p>
                        <button
                          onClick={() => setActiveTab("catalog")}
                          className="px-6 py-3.5 bg-orange text-white hover:bg-orange/90 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                        >
                          Découvrir le Catalogue <ArrowRight className="w-4 h-4 ml-1.5 inline" />
                        </button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses
                          .filter((c) => enrolledSlugs.includes(c.slug))
                          .map((course) => {
                            const prog = progresses[course.slug] || { percent: 0, completed: {}, quizPassed: false };
                            const isCompleted = prog.quizPassed;
                            const isStarted = prog.percent > 0;
                            const isPaid = paidCourses[course.slug] || false;

                            return (
                              <motion.div
                                key={course.id}
                                whileHover={{ y: -6 }}
                                className="bg-[#0F1D33] rounded-[32px] overflow-hidden border border-white/5 flex flex-col h-full hover:border-orange/20 shadow-xl transition-all duration-300"
                              >
                                {/* Course Header Banner */}
                                <div className="relative aspect-video overflow-hidden">
                                  <img 
                                    src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"} 
                                    alt={course.title} 
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-dark/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                                      {course.category}
                                    </span>
                                  </div>

                                  {/* Payment status badge */}
                                  <div className="absolute top-4 right-4">
                                    {isPaid ? (
                                      <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-400/20 flex items-center gap-1.5 font-bold shadow-lg">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Payé
                                      </span>
                                    ) : (
                                      <span className="px-3 py-1 bg-orange/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-400/20 flex items-center gap-1.5 font-bold shadow-lg">
                                        <Lock className="w-3.5 h-3.5 text-orange-200" /> Verrouillé
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Card Info */}
                                <div className="p-8 flex flex-col flex-grow">
                                  <h4 className="text-lg font-montserrat font-extrabold text-white mb-4 line-clamp-2 leading-tight">
                                    {course.title}
                                  </h4>
                                  <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-3">
                                    {course.short_description}
                                  </p>

                                  {/* Progress indicators */}
                                  <div className="mt-auto space-y-5">
                                    {isCompleted ? (
                                      <div className="flex items-center justify-between text-emerald-400 text-xs font-black bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl">
                                        <span className="flex items-center gap-1.5">
                                          <CheckCircle2 className="w-4 h-4" /> Formation Validée (100%)
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-white/40">
                                          <span>{isStarted ? "En cours d'apprentissage" : "Non démarré"}</span>
                                          <span>{prog.percent}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                          <div className="bg-orange h-full rounded-full" style={{ width: `${prog.percent}%` }} />
                                        </div>
                                      </div>
                                    )}

                                    {/* Actions bar */}
                                    <div className="flex gap-3">
                                      {isCompleted ? (
                                        <button
                                          onClick={() => handleShowCertificate(course)}
                                          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                                        >
                                          <Award className="w-4 h-4" /> Mon Certificat
                                        </button>
                                      ) : isPaid ? (
                                        <button
                                          onClick={() => handleStartCourse(course)}
                                          className="w-full py-4 bg-orange text-white hover:bg-orange/90 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-orange/10"
                                        >
                                          <BookOpen className="w-4 h-4" /> {isStarted ? "Reprendre" : "Commencer"}
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handleStartCourse(course)}
                                          className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-orange/20 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg"
                                        >
                                          <Lock className="w-4 h-4 text-orange" /> S'inscrire & Payer
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                      </div>
                    )}
                  </>
                )}

                {/* Tab: Catalog */}
                {activeTab === "catalog" && (
                  <>
                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      {/* Search Bar */}
                      <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4.5 h-4.5" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Rechercher un module (ex: logistique, santé...)"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white text-xs placeholder:text-white/20 focus:border-orange/50 focus:bg-white/10 transition-all outline-none"
                        />
                      </div>

                      {/* Category Filters */}
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mr-2 flex items-center gap-1.5">
                          <Filter className="w-3.5 h-3.5 text-white/20" /> Filtrer par :
                        </span>
                        {[
                          { id: "all", label: "Tous" },
                          { id: "supply-chain", label: "Logistique" },
                          { id: "reglementation", label: "Réglementation" },
                          { id: "sante-digitale", label: "Santé Digitale" },
                          { id: "leadership", label: "Gouvernance" },
                          { id: "sante-publique", label: "Santé Publique" },
                          { id: "business", label: "Management" }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border ${
                              selectedCategory === cat.id
                                ? "bg-orange border-orange text-white"
                                : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filtered Grid */}
                    {(() => {
                      const filteredCourses = courses.filter((course) => {
                        const matchesSearch = 
                          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (course.parentCertification && course.parentCertification.toLowerCase().includes(searchQuery.toLowerCase()));
                        
                        const matchesCategory = 
                          selectedCategory === "all" || 
                          course.category.toLowerCase().includes(
                            (selectedCategory === "supply-chain" ? "logistique" :
                             selectedCategory === "reglementation" ? "réglementation" :
                             selectedCategory === "sante-digitale" ? "digitale" :
                             selectedCategory === "leadership" ? "leadership" :
                             selectedCategory === "sante-publique" ? "publique" :
                             selectedCategory === "business" ? "business" : selectedCategory).toLowerCase()
                          );
                        
                        return matchesSearch && matchesCategory;
                      });

                      if (filteredCourses.length === 0) {
                        return (
                          <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-12 text-center max-w-md mx-auto my-8">
                            <BookOpen className="w-10 h-10 text-white/10 mx-auto mb-4" />
                            <p className="text-white/40 text-xs font-bold">Aucun module ne correspond à vos critères.</p>
                          </div>
                        );
                      }

                      return (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {filteredCourses.map((course) => {
                            const prog = progresses[course.slug] || { percent: 0, completed: {}, quizPassed: false };
                            const isCompleted = prog.quizPassed;
                            const isStarted = prog.percent > 0;
                            const isPaid = paidCourses[course.slug] || false;
                            const isEnrolled = enrolledSlugs.includes(course.slug);

                            return (
                              <motion.div
                                key={course.id}
                                whileHover={{ y: -6 }}
                                className="bg-[#0F1D33] rounded-[32px] overflow-hidden border border-white/5 flex flex-col h-full hover:border-orange/20 shadow-xl transition-all duration-300"
                              >
                                {/* Course Header Banner */}
                                <div className="relative aspect-video overflow-hidden">
                                  <img 
                                    src={course.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"} 
                                    alt={course.title} 
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                                    <span className="px-3 py-1 bg-dark/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 shadow-lg">
                                      {course.category}
                                    </span>
                                    {course.isAvailable ? (
                                      <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-400/20 shadow-lg flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Disponible
                                      </span>
                                    ) : (
                                      <span className="px-3 py-1 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-red-400/20 shadow-lg flex items-center gap-1.5">
                                        <Lock className="w-3.5 h-3.5" /> En Maintenance
                                      </span>
                                    )}
                                  </div>

                                  {/* Payment status badge */}
                                  <div className="absolute top-4 right-4">
                                    {isPaid ? (
                                      <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-400/20 flex items-center gap-1.5 font-bold shadow-lg">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Payé
                                      </span>
                                    ) : (
                                      <span className="px-3 py-1 bg-orange/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-400/20 flex items-center gap-1.5 font-bold shadow-lg">
                                        <Lock className="w-3.5 h-3.5 text-orange-200" /> Verrouillé
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Card Info */}
                                <div className="p-8 flex flex-col flex-grow">
                                  <div className="flex items-center justify-between mb-2">
                                    {isEnrolled && (
                                      <span className="px-2 py-0.5 bg-orange/10 border border-orange/20 text-orange text-[9px] font-black uppercase tracking-wider rounded">
                                        Inscrit
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-xs md:text-sm font-bold text-orange uppercase tracking-wider mb-4 block bg-orange/10 px-4 py-2.5 rounded-xl border border-orange/15 leading-relaxed shadow-sm mt-3">
                                    {course.title}
                                  </h4>
                                  <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-3">
                                    {course.short_description}
                                  </p>

                                  {/* Progress indicators */}
                                  <div className="mt-auto space-y-5">
                                    {isEnrolled && (
                                      <>
                                        {isCompleted ? (
                                          <div className="flex items-center justify-between text-emerald-400 text-xs font-black bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl">
                                            <span className="flex items-center gap-1.5">
                                              <CheckCircle2 className="w-4 h-4" /> Formation Validée (100%)
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold text-white/40">
                                              <span>{isStarted ? "En cours d'apprentissage" : "Non démarré"}</span>
                                              <span>{prog.percent}%</span>
                                            </div>
                                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                              <div className="bg-orange h-full rounded-full" style={{ width: `${prog.percent}%` }} />
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}

                                    {/* Actions bar */}
                                    <div className="flex gap-3">
                                      {!course.isAvailable ? (
                                        <button
                                          disabled
                                          className="w-full py-4 bg-white/5 text-white/40 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-not-allowed shadow-none"
                                        >
                                          <Lock className="w-4.5 h-4.5" /> En cours de mise à jour
                                        </button>
                                      ) : isEnrolled ? (
                                        <>
                                          {isCompleted ? (
                                            <button
                                              onClick={() => handleShowCertificate(course)}
                                              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                                            >
                                              <Award className="w-4 h-4" /> Mon Certificat
                                            </button>
                                          ) : isPaid ? (
                                            <button
                                              onClick={() => handleStartCourse(course)}
                                              className="w-full py-4 bg-orange text-white hover:bg-orange/90 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-orange/10"
                                            >
                                              <BookOpen className="w-4 h-4" /> {isStarted ? "Reprendre" : "Commencer"}
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => handleStartCourse(course)}
                                              className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-orange/20 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg"
                                            >
                                              <Lock className="w-4 h-4 text-orange" /> Payer & Déverrouiller
                                            </button>
                                          )}
                                        </>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            handleEnrollCourse(course.slug);
                                            handleStartCourse(course);
                                          }}
                                          className="w-full py-4 bg-orange text-white hover:bg-orange/90 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                          <Plus className="w-4.5 h-4.5" /> S'inscrire au module
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Active Course LMS Player View */}
          {activeView === "player" && selectedCourse && (
            <LMSPlayer 
              courseTitle={selectedCourse.title}
              courseSlug={selectedCourse.slug}
              onBackToPortal={() => {
                setActiveView("dashboard");
                refreshProgress();
              }}
              onCourseCompleted={handleCourseCompleted}
            />
          )}

          {/* Certificate View */}
          {activeView === "certificate" && selectedCourse && (
            <div className="space-y-6">
              <button
                onClick={() => setActiveView("dashboard")}
                className="inline-flex items-center gap-2 text-white/60 hover:text-orange font-bold text-xs uppercase tracking-widest transition-all bg-white/5 border border-white/5 px-5 py-3 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Retour au Tableau de bord
              </button>

              <CertificateCard 
                courseTitle={selectedCourse.title}
                courseSlug={selectedCourse.slug}
              />
            </div>
          )}

          {/* Lock Screen / Payment Gate View */}
          {activeView === "lock-screen" && selectedCourse && (
            <div className="space-y-6 max-w-2xl mx-auto py-12">
              <button
                onClick={() => setActiveView("dashboard")}
                className="inline-flex items-center gap-2 text-white/60 hover:text-orange font-bold text-sm uppercase tracking-widest transition-all bg-white/5 border border-white/5 px-5 py-3 rounded-full hover:bg-white/10 cursor-pointer mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Retour au Tableau de bord
              </button>

              <div className="bg-[#0F1D33] rounded-[36px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl">
                {/* Visual Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Locked Emblem */}
                <div className="mx-auto w-24 h-24 rounded-3xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-8 shadow-inner animate-pulse">
                  <Lock className="w-10 h-10" />
                </div>

                <span className="text-orange font-black text-xs uppercase tracking-widest block mb-3">
                  Accès Verrouillé • eLearning
                </span>

                <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white leading-tight mb-4">
                  {selectedCourse.title}
                </h2>

                <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto mb-8 font-medium">
                  Pour accéder à ce module interactif, participer aux quiz et recevoir votre certification officielle SaniNova, veuillez finaliser le règlement de vos frais de formation.
                </p>

                {/* Price Display */}
                <div className="bg-[#0A1629] rounded-2xl p-6 border border-white/5 max-w-sm mx-auto mb-10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1">
                    Tarif d'accès au module
                  </span>
                  <span className="text-orange font-black text-3xl">
                    {getCoursePriceDetails(selectedCourse).price} <span className="text-sm font-bold opacity-60">{getCoursePriceDetails(selectedCourse).currency}</span>
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/academy/payment?training=${selectedCourse.slug}`}
                    className="px-8 py-5 bg-orange text-white hover:bg-orange/90 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Procéder au Paiement <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActiveView("dashboard")}
                    className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Retour au Catalogue
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
