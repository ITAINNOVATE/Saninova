"use client";

import React, { useState, useEffect } from "react";
import { 
  BookOpen, Award, Clock, ArrowRight, CheckCircle2, 
  ChevronRight, Bookmark, Sparkles, User, LogOut, ArrowLeft, Lock, Plus, Search, Filter,
  FileText, Download, Calendar, Bell, ExternalLink, RefreshCw, FolderOpen, CreditCard, Smartphone, ShieldCheck
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
  const [participantSession, setParticipantSession] = useState<any>(null);
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"my-courses" | "billing" | "documents" | "news" | "catalog">("my-courses");
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [refreshingBilling, setRefreshingBilling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Helper pour calculer le bilan financier de l'apprenant connecté
  const calculateFinancials = (session: any) => {
    if (!session) {
      return {
        totalAmount: 75000,
        paidAmount: 75000,
        remainingAmount: 0,
        isCompleted: true,
        isAcompte: false,
        formattedTotal: "75 000 FCFA",
        formattedPaid: "75 000 FCFA",
        formattedRemaining: "0 FCFA",
      };
    }

    let total = 75000;
    if (session.role && session.role.toLowerCase().includes("titulaire")) {
      total = 100000;
    } else if (session.role && session.role.toLowerCase().includes("assistant")) {
      total = 75000;
    } else if (session.notes) {
      const matchTarif = session.notes.match(/Profil:.*?(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i) || 
                         session.notes.match(/(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i);
      if (matchTarif) {
        const parsed = parseInt(matchTarif[1].replace(/[\s.]/g, ""), 10);
        if (parsed > 0) total = parsed;
      }
    }

    let paid = 0;
    if (session.payment_status === "completed") {
      const matchPaid = session.notes?.match(/Paiement(?:\s+total)?\s*-\s*(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i);
      if (matchPaid) {
        paid = parseInt(matchPaid[1].replace(/[\s.]/g, ""), 10) || total;
      } else {
        paid = total;
      }
    } else if (session.payment_status === "acompte") {
      const matchAcompte = session.notes?.match(/Acompte\s*-\s*(\d+[\d\s.]*)\s*(?:FCFA|CFA|XOF)/i);
      if (matchAcompte) {
        paid = parseInt(matchAcompte[1].replace(/[\s.]/g, ""), 10) || Math.round(total / 2);
      } else {
        paid = Math.round(total / 2);
      }
    } else {
      paid = 0;
    }

    const remaining = Math.max(0, total - paid);
    return {
      totalAmount: total,
      paidAmount: paid,
      remainingAmount: remaining,
      isCompleted: session.payment_status === "completed" || remaining === 0,
      isAcompte: session.payment_status === "acompte",
      formattedTotal: total.toLocaleString("fr-FR") + " FCFA",
      formattedPaid: paid.toLocaleString("fr-FR") + " FCFA",
      formattedRemaining: remaining.toLocaleString("fr-FR") + " FCFA",
    };
  };

  // Synchronisation en direct avec FedaPay et rechargement de la session depuis Supabase
  const refreshPaymentStatus = async (showNotification = false) => {
    setRefreshingBilling(true);
    try {
      // 1. Déclencher la synchronisation FedaPay
      try {
        await fetch("/api/academy/sync-payments");
      } catch (e) {
        console.warn("Sync error:", e);
      }

      // 2. Re-récupérer l'inscription de l'apprenant connecté
      const currentEmail = localStorage.getItem("registered_email");
      const currentId = participantSession?.id;

      let query = supabase.from("academy_registrations").select("*");
      if (currentId) {
        query = query.eq("id", currentId);
      } else if (currentEmail) {
        query = query.ilike("email", currentEmail);
      }

      const { data, error } = await query.limit(1).maybeSingle();
      if (!error && data) {
        setParticipantSession(data);
        localStorage.setItem("participant_session", JSON.stringify(data));
        if (data.fullname) {
          setStudentName(data.fullname);
          localStorage.setItem("registered_fullname", data.fullname);
        }
        if (showNotification) {
          alert("Votre statut de paiement a été synchronisé et actualisé avec succès !");
        }
      }
    } catch (err) {
      console.error("Error refreshing billing:", err);
    } finally {
      setRefreshingBilling(false);
    }
  };

  // Déclencher le paiement du solde restant avec le widget FedaPay directement
  const handlePayRemainingBalance = (remainingAmount: number) => {
    if (remainingAmount <= 0) return;

    const email = participantSession?.email || localStorage.getItem("registered_email") || "contact@saninova.org";
    const fullname = participantSession?.fullname || studentName || "Apprenant SaniNova";
    const nameParts = fullname.trim().split(" ");
    const firstname = nameParts[0] || "Apprenant";
    const lastname = nameParts.slice(1).join(" ") || "SaniNova";

    if (typeof window !== "undefined" && (window as any).FedaPay) {
      try {
        const widget = (window as any).FedaPay.init({
          public_key: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY || "pk_live_glLmgqSBaYSt9ktutyPAmLuh",
          transaction: {
            amount: remainingAmount,
            currency: { iso: "XOF" },
            description: `Règlement du solde restant (${remainingAmount.toLocaleString("fr-FR")} FCFA) - Formation Gestion d'une Officine Moderne`,
          },
          customer: {
            firstname,
            lastname,
            email,
          },
          callback_url: `${window.location.origin}/academy/portal?payment_synced=true`
        });

        widget.open();
        return;
      } catch (err) {
        console.error("FedaPay widget error:", err);
      }
    }

    // Si le widget n'est pas prêt, rediriger vers la page de paiement avec les paramètres préremplis
    router.push(`/academy/payment?training=formation-gestion-officine-moderne&amount=${remainingAmount}&solde=true`);
  };

  // Chargement du script FedaPay
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

  const fetchTrainingDocuments = async () => {
    setLoadingDocs(true);
    try {
      const res = await fetch("/api/academy/documents?training_slug=officine-moderne");
      const json = await res.json();
      if (json.success && json.documents) {
        setDocuments(json.documents);
      }
    } catch (err) {
      console.error("Error loading training documents:", err);
    } finally {
      setLoadingDocs(false);
    }
  };

  // Fetch courses from Supabase & load local progress/payments
  useEffect(() => {
    // 1. Guard check: Verify authentication session
    const loggedIn = localStorage.getItem("logged_in") === "true";
    if (!loggedIn) {
      router.push("/academy/login");
      return;
    }

    // Load participant session if available
    const savedSession = localStorage.getItem("participant_session");
    if (savedSession) {
      try {
        setParticipantSession(JSON.parse(savedSession));
      } catch (e) {
        console.error(e);
      }
    }

    // Load student name from localstorage if exists
    const savedName = localStorage.getItem("registered_fullname");
    if (savedName) {
      setStudentName(savedName);
    }

    fetchTrainingDocuments();
    refreshPaymentStatus(false);

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
                    <Sparkles className="w-6 h-6 text-emerald-400 mb-3" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Statut</span>
                    <span className="text-xs font-bold text-white mt-2 block bg-emerald-400/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-400/20 w-fit">
                      Starter
                    </span>
                  </div>
                </div>
              </div>

              {/* Learning Catalog & Enrolled Courses with Tabs */}
              <div>
                {/* Tabs Selector */}
                <div className="flex flex-wrap gap-4 md:gap-6 border-b border-white/5 pb-4 mb-8">
                  <button
                    onClick={() => setActiveTab("my-courses")}
                    className={`pb-2 px-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${activeTab === "my-courses" ? "text-orange" : "text-white/40 hover:text-white"}`}
                  >
                    Mes Formations ({enrolledSlugs.length})
                    {activeTab === "my-courses" && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                  </button>
                  {(() => {
                    const fin = calculateFinancials(participantSession);
                    return (
                      <button
                        onClick={() => setActiveTab("billing")}
                        className={`pb-2 px-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${activeTab === "billing" ? "text-orange" : "text-white/40 hover:text-white"}`}
                      >
                        <CreditCard className="w-4 h-4" /> 
                        Mon Paiement & Solde
                        {fin.remainingAmount > 0 ? (
                          <span className="px-2 py-0.5 bg-orange text-white text-[10px] font-black rounded-full animate-pulse">
                            Solde dû
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/30">
                            Réglé
                          </span>
                        )}
                        {activeTab === "billing" && (
                          <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                        )}
                      </button>
                    );
                  })()}
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={`pb-2 px-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${activeTab === "documents" ? "text-orange" : "text-white/40 hover:text-white"}`}
                  >
                    <FolderOpen className="w-4 h-4" /> Documents & Supports ({documents.length})
                    {activeTab === "documents" && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("news")}
                    className={`pb-2 px-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer flex items-center gap-2 ${activeTab === "news" ? "text-orange" : "text-white/40 hover:text-white"}`}
                  >
                    <Bell className="w-4 h-4" /> Actualités & Calendrier
                    {activeTab === "news" && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className={`pb-2 px-3 text-xs md:text-sm font-black uppercase tracking-wider transition-all relative cursor-pointer ${activeTab === "catalog" ? "text-orange" : "text-white/40 hover:text-white"}`}
                  >
                    Catalogue ({courses.length})
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
                            const rawProg = progresses[course.slug] || { percent: 0, completed: {}, quizPassed: false };
                            const prog = { ...rawProg, percent: Math.min(100, rawProg.percent || 0) };
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
                                    <div className="flex flex-col gap-3">
                                      {isCompleted ? (
                                        <button
                                          onClick={() => handleShowCertificate(course)}
                                          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
                                        >
                                          <Award className="w-4 h-4" /> Certificat de complétion
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
                                      
                                      {/* Evaluation Button */}
                                      {isPaid && (
                                        <Link 
                                          href={`/academy/portal/evaluation/${course.slug}`}
                                          onClick={(e) => {
                                            if (!isCompleted) {
                                              e.preventDefault();
                                              alert("Vous devez terminer le cours à 100% pour débloquer l'évaluation finale.");
                                            }
                                          }}
                                          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                                            isCompleted 
                                              ? 'bg-[#0F1D33] hover:bg-[#1a2e4c] text-white border border-orange/50 shadow-[0_0_15px_rgba(255,107,0,0.2)]' 
                                              : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                                          }`}
                                        >
                                          <Award className="w-4 h-4" /> Passer l'évaluation finale
                                        </Link>
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
                            const rawProg = progresses[course.slug] || { percent: 0, completed: {}, quizPassed: false };
                            const prog = { ...rawProg, percent: Math.min(100, rawProg.percent || 0) };
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

                {/* Tab: Mon Paiement & Solde */}
                {activeTab === "billing" && (() => {
                  const fin = calculateFinancials(participantSession);
                  return (
                    <div className="space-y-8">
                      {/* En-tête de facturation */}
                      <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange">
                            <CreditCard className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white flex items-center gap-2">
                              Situation Financière de votre Formation
                            </h3>
                            <p className="text-white/40 text-xs font-medium">
                              Formation Professionnelle : Gestion d’une Officine Moderne
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => refreshPaymentStatus(true)}
                          disabled={refreshingBilling}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${refreshingBilling ? "animate-spin" : ""}`} /> 
                          {refreshingBilling ? "Actualisation..." : "Actualiser en direct"}
                        </button>
                      </div>

                      {/* Cartes Bilan Financier */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tarif Total */}
                        <div className="bg-[#0F1D33] rounded-[28px] border border-white/5 p-6 shadow-xl">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                            Tarif Total Formation
                          </span>
                          <span className="text-2xl md:text-3xl font-montserrat font-black text-white block">
                            {fin.formattedTotal}
                          </span>
                          <span className="text-xs text-white/50 mt-2 block">
                            Profil : {participantSession?.role || "Pharmacien"}
                          </span>
                        </div>

                        {/* Montant Déjà Payé */}
                        <div className="bg-[#0F1D33] rounded-[28px] border border-emerald-500/20 bg-emerald-500/[0.03] p-6 shadow-xl">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Montant Encaissé
                          </span>
                          <span className="text-2xl md:text-3xl font-montserrat font-black text-emerald-400 block">
                            {fin.formattedPaid}
                          </span>
                          <span className="text-xs text-emerald-400/80 mt-2 block font-medium">
                            {fin.isCompleted ? "Paiement 100% complet" : "Acompte validé"}
                          </span>
                        </div>

                        {/* Reste à Payer */}
                        <div className={`rounded-[28px] border p-6 shadow-xl ${fin.remainingAmount > 0 ? "bg-orange/[0.06] border-orange/30" : "bg-[#0F1D33] border-white/5"}`}>
                          <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${fin.remainingAmount > 0 ? "text-orange" : "text-white/40"}`}>
                            Reste à Régler
                          </span>
                          <span className={`text-2xl md:text-3xl font-montserrat font-black block ${fin.remainingAmount > 0 ? "text-orange" : "text-emerald-400"}`}>
                            {fin.formattedRemaining}
                          </span>
                          <span className={`text-xs mt-2 block font-medium ${fin.remainingAmount > 0 ? "text-orange/80" : "text-emerald-400"}`}>
                            {fin.remainingAmount > 0 ? "Solde en attente de versement" : "✓ Aucun solde restant"}
                          </span>
                        </div>
                      </div>

                      {/* Bloc d'action : Payer le solde si restant > 0 */}
                      {fin.remainingAmount > 0 ? (
                        <div className="bg-gradient-to-br from-orange/15 via-[#0F1D33] to-[#0A1629] rounded-[32px] border border-orange/30 p-8 md:p-10 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
                          
                          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="space-y-3 max-w-xl">
                              <span className="px-3 py-1 bg-orange/20 border border-orange/40 text-orange text-[10px] font-black uppercase tracking-widest rounded-full inline-block">
                                Solde à régulariser
                              </span>
                              <h4 className="text-xl md:text-2xl font-montserrat font-bold text-white">
                                Réglez votre solde de {fin.formattedRemaining} en ligne
                              </h4>
                              <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                                Vous pouvez finaliser votre paiement sécurisé par Mobile Money (MTN, Moov, Flooz, Wave) ou carte bancaire. Votre statut sera instantanément mis à jour pour vous et l'administration.
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                              <button
                                onClick={() => handlePayRemainingBalance(fin.remainingAmount)}
                                className="px-8 py-4.5 bg-orange hover:bg-orange/90 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                              >
                                <Smartphone className="w-4 h-4" /> Payer le solde ({fin.formattedRemaining})
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#0F1D33] rounded-[32px] border border-emerald-500/20 p-8 text-center max-w-xl mx-auto shadow-xl">
                          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <h4 className="text-white font-montserrat font-bold text-lg mb-2">
                            Paiement Intégralement Réglé
                          </h4>
                          <p className="text-white/50 text-xs leading-relaxed">
                            Félicitations ! Vos frais d'inscription sont entièrement réglés. Vous bénéficiez d'un accès sans restriction à tous les modules, documents et futurs certificats de la formation.
                          </p>
                        </div>
                      )}

                      {/* Détails du paiement / Reçu opérateur */}
                      {participantSession?.payment_reference && (
                        <div className="bg-[#0A1629] rounded-[24px] border border-white/5 p-6">
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">
                            Référence du paiement enregistré
                          </span>
                          <p className="font-mono text-sm text-white/80 select-all">
                            {participantSession.payment_reference}
                          </p>
                          {participantSession.notes && (
                            <p className="text-xs text-white/40 mt-2">
                              {participantSession.notes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Tab: Documents */}
                {activeTab === "documents" && (
                  <div className="space-y-6">
                    <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange">
                            <FolderOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white">
                              Supports & Documents de Formation
                            </h3>
                            <p className="text-white/40 text-xs font-medium">
                              Formation Professionnelle : Gestion d’une Officine Moderne
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={fetchTrainingDocuments}
                        disabled={loadingDocs}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${loadingDocs ? "animate-spin" : ""}`} /> Actualiser
                      </button>
                    </div>

                    {loadingDocs ? (
                      <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-12 text-center">
                        <RefreshCw className="w-8 h-8 text-orange animate-spin mx-auto mb-4" />
                        <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Chargement des documents...</p>
                      </div>
                    ) : documents.length === 0 ? (
                      <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-12 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden my-8">
                        <FileText className="w-12 h-12 text-orange/40 mx-auto mb-4" />
                        <h4 className="text-white font-montserrat font-bold text-lg mb-2">Aucun document chargé</h4>
                        <p className="text-white/40 text-xs leading-relaxed max-w-sm mx-auto">
                          Les supports pédagogiques de votre formation seront mis à disposition ici par les formateurs. Revenez bientôt !
                        </p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="bg-[#0F1D33] rounded-[28px] border border-white/5 p-6 hover:border-orange/20 transition-all shadow-xl flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="px-3 py-1 bg-orange/10 border border-orange/20 text-orange text-[10px] font-black uppercase tracking-widest rounded-full">
                                  {doc.category || "Support"}
                                </span>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                                  {doc.file_type || "Fichier"}
                                </span>
                              </div>

                              <h4 className="text-base font-bold text-white group-hover:text-orange transition-colors mb-2 line-clamp-2">
                                {doc.title}
                              </h4>

                              {doc.description && (
                                <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-6">
                                  {doc.description}
                                </p>
                              )}
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                              <span className="text-[11px] text-white/30 font-semibold">
                                {doc.created_at ? new Date(doc.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "Ressource"}
                              </span>

                              <a
                                href={doc.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 bg-orange hover:bg-orange/90 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-orange/20 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" /> Télécharger
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: News & Announcements */}
                {activeTab === "news" && (
                  <div className="space-y-6">
                    <div className="bg-[#0F1D33] rounded-[32px] border border-white/5 p-6 md:p-8 flex items-center gap-4 shadow-xl">
                      <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-montserrat font-bold text-white">
                          Actualités & Calendrier de la Formation
                        </h3>
                        <p className="text-white/40 text-xs font-medium">
                          Informations importantes, plannings des webinaires et jalons clés.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Announcement 1: Confirmation */}
                      <div className="bg-[#0F1D33] rounded-[28px] border border-white/5 p-6 hover:border-orange/20 transition-all shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                            Inscription Validée
                          </span>
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                            Session Officine Moderne
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">
                          Bienvenue dans la session : Gestion d’une Officine Moderne
                        </h4>
                        <p className="text-white/50 text-xs leading-relaxed mb-4">
                          Votre inscription est officiellement enregistrée. Vous pouvez consulter les premiers documents de cours dans l'onglet "Documents & Supports" et préparer les prochaines sessions interactives.
                        </p>
                        <div className="text-[11px] text-white/30 font-semibold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-orange" /> Programme en cours de déploiement
                        </div>
                      </div>

                      {/* Announcement 2: Live Webinars */}
                      <div className="bg-[#0F1D33] rounded-[28px] border border-white/5 p-6 hover:border-orange/20 transition-all shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                            Calendrier des sessions
                          </span>
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                            Webinaires Directs
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">
                          Sessions d'échange avec les experts formateurs
                        </h4>
                        <p className="text-white/50 text-xs leading-relaxed mb-4">
                          Les liens de connexion Google Meet / Zoom ainsi que les plannings précis des ateliers pratiques vous seront transmis et affichés ici avec les notifications de rappel.
                        </p>
                        <div className="text-[11px] text-white/30 font-semibold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-400" /> Notifications automatiques par WhatsApp & Email
                        </div>
                      </div>
                    </div>
                  </div>
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
                chapters={selectedCourse.program?.map((p: any) => p.title) || []}
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
