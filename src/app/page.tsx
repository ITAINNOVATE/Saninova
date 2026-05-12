"use client";

import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import AboutDetails from "../components/home/AboutDetails";
import DirectorSection from "../components/home/DirectorSection";
import TeamSection from "../components/home/TeamSection";
import ExpertisesDetails from "../components/home/ExpertisesDetails";
import Methodology from "../components/home/Methodology";
import Advantages from "../components/home/Advantages";
import ImpactStats from "../components/home/ImpactStats";
import ServicesSection from "../components/home/ServicesSection";
import Publications from "../components/home/Publications";
import Partners from "../components/partners/Partners";
import ContactQuick from "../components/home/ContactQuick";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />
        <AboutDetails />
        <DirectorSection />
        <TeamSection />

        <ExpertisesDetails />

        {/* Services Section */}
        <ServicesSection />

        {/* Methodology Timeline */}
        <Methodology />

        {/* Advantages Section */}
        <Advantages />

        {/* Impact Stats */}
        <ImpactStats />

        {/* Publications / Insights Section */}
        <Publications />

        {/* Partners Logos */}
        <Partners />

        {/* Contact Form Section */}
        <ContactQuick />
      </main>

      {/* Floating Buttons */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
