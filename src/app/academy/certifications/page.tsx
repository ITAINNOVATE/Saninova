"use client";

import React from "react";
import AcademyCertifications from "../../../components/academy/AcademyCertifications";
import AcademyHero from "../../../components/academy/AcademyHero";

export default function CertificationsPage() {
  return (
    <div className="pt-20">
      <div className="bg-dark py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-montserrat font-black text-white">
            Nos Certifications
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            Découvrez l'ensemble de nos programmes certifiants conçus pour booster votre carrière et valider vos compétences stratégiques en santé.
          </p>
        </div>
      </div>
      <AcademyCertifications />
    </div>
  );
}
