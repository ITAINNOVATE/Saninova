"use client";

import React from "react";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ImpactStats from "../components/home/ImpactStats";
import ServicesSection from "../components/home/ServicesSection";
import Partners from "../components/partners/Partners";
import ContactQuick from "../components/home/ContactQuick";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Quick About Intro */}
      <AboutSection />

      {/* Services Preview Grid */}
      <ServicesSection />

      {/* Dynamic Impact Metrics */}
      <ImpactStats />

      {/* Universal Scrolling Ribbon */}
      <Partners />

      {/* Essential Outreach Form */}
      <ContactQuick />
    </>
  );
}
