"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AcademyEvents() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/announcements");
  }, [router]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-white font-black animate-pulse text-lg uppercase tracking-widest">
        Redirection vers les Annonces...
      </div>
    </div>
  );
}
