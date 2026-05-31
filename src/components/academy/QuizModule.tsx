"use client";

import React, { useEffect } from "react";

interface QuizModuleProps {
  courseTitle: string;
  courseSlug: string;
  onQuizPassed: () => void;
  onClose: () => void;
}

export default function QuizModule({ courseTitle, courseSlug, onQuizPassed, onClose }: QuizModuleProps) {
  useEffect(() => {
    window.location.href = `/academy/portal/evaluation/${courseSlug}`;
  }, [courseSlug]);

  return (
    <div className="bg-[#0F1D33] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative p-12 text-center text-white">
      <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <p className="text-xl font-bold">Redirection vers le système d'évaluation en cours...</p>
    </div>
  );
}
