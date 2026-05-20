"use client";

import React, { useState, useEffect } from "react";
import { 
  BookOpen, Award, Clock, ArrowRight, CheckCircle2, 
  ChevronRight, Bookmark, Sparkles, User, LogOut, ArrowLeft 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import PageHero from "../../../components/ui/PageHero";
import LMSPlayer from "../../../components/academy/LMSPlayer";
import CertificateCard from "../../../components/academy/CertificateCard";

export default function StudentPortal() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"dashboard" | "player" | "certificate">("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [progresses, setProgresses] = useState<Record<string, { percent: number; completed: any; quizPassed: boolean }>>({});
  const [studentName, setStudentName] = useState("Dr. Ambroise Gbaguidi");

  // Fetch courses from Supabase & load local progress
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("academy_trainings")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data) {
        setCourses(data);
        
        // Fetch progress states from local storage for each course
        const loadedProgress: any = {};
        data.forEach(c => {
          const saved = localStorage.getItem(`progress_${c.slug}`);
          if (saved) {
            try {
              loadedProgress[c.slug] = JSON.parse(saved);
            } catch (e) {
              console.error(e);
            }
          } else {
            // Set initial mock progress for presentation if empty
            if (c.slug === "logistique-medicale-dernier-kilometre") {
              loadedProgress[c.slug] = { percent: 50, completed: { "log-c1": true }, quizPassed: false };
            } else {
              loadedProgress[c.slug] = { percent: 0, completed: {}, quizPassed: false };
            }
          }
        });
        setProgresses(loadedProgress);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const refreshProgress = () => {
    const loadedProgress: any = {};
    courses.forEach(c => {
      const saved = localStorage.getItem(`progress_${c.slug}`);
      if (saved) {
        loadedProgress[c.slug] = JSON.parse(saved);
      } else {
        loadedProgress[c.slug] = { percent: 0, completed: {}, quizPassed: false };
      }
    });
    setProgresses(loadedProgress);
  };

  const handleStartCourse = (course: any) => {
    setSelectedCourse(course);
    setActiveView("player");
  };

  const handleShowCertificate = (course: any) => {
    setSelectedCourse(course);
    setActiveView("certificate");
  };

  const handleCourseCompleted = () => {
    refreshProgress();
  };

  const activeCoursesCount = Object.keys(progresses).filter(k => progresses[k]?.percent > 0 && progresses[k]?.percent < 100).length;
  const completedCoursesCount = Object.keys(progresses).filter(k => progresses[k]?.quizPassed).length;

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
                    <div className="w-16 h-16 rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange text-2xl font-black">
                      AG
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
                  <div className="flex gap-4">
                    <Link 
                      href="/academy"
                      className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
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
                    <span className="text-2xl font-black text-white mt-1 block">{courses.length}</span>
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

              {/* Learning Catalog & Enrolled Courses */}
              <div>
                <h3 className="text-2xl font-montserrat font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-2.5 h-7 bg-orange rounded-full" />
                  Mon Catalogue de Formations eLearning
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => {
                    const prog = progresses[course.slug] || { percent: 0, completed: {}, quizPassed: false };
                    const isCompleted = prog.quizPassed;
                    const isStarted = prog.percent > 0;

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
                              ) : (
                                <button
                                  onClick={() => handleStartCourse(course)}
                                  className="w-full py-4 bg-orange text-white hover:bg-orange/90 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-orange/10"
                                >
                                  <BookOpen className="w-4 h-4" /> {isStarted ? "Reprendre" : "Commencer"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
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

        </div>
      </div>
    </>
  );
}
