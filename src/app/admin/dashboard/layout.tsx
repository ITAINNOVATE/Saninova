"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Mail,
  BookOpen,
  LogOut,
  Loader2,
  Menu,
  X,
  ChevronRight,
  User,
  FileText,
  GraduationCap
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/admin");
        } else {
          setIsChecking(false);
        }
      } catch (err) {
        router.push("/admin");
      }
    };
    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navItems = [
    {
      label: "Vue d'ensemble",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Gestion des Pages",
      href: "/admin/dashboard/pages",
      icon: FileText,
    },
    {
      label: "Messages / Contacts",
      href: "/admin/dashboard/contacts",
      icon: Mail,
    },
    {
      label: "Publications / CMS",
      href: "/admin/dashboard/publications",
      icon: BookOpen,
    },
    {
      label: "SaniNova Academy",
      href: "/admin/dashboard/academy",
      icon: GraduationCap,
    },
  ];

  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-10 h-10 text-[#00A878] animate-spin mb-4" />
        <p className="font-poppins text-slate-400">Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-800 bg-slate-900/30 backdrop-blur-xl p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center space-x-3 mb-12 mt-2">
          <img
            src="/images/logo.png"
            alt="SaniNova"
            className="h-9 w-auto filter brightness-0 invert"
          />
          <div className="border-l border-slate-700 pl-3 py-1">
            <span className="text-xs font-poppins font-bold text-emerald-400 uppercase tracking-widest block leading-none">Admin</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-poppins font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-emerald-500/10 text-[#00A878] border border-emerald-500/10 shadow-lg shadow-emerald-950/30"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-[#00A878]" : "text-slate-400 group-hover:text-slate-300"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-[#00A878]" />}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800/60">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-poppins font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar/Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="relative z-10 flex flex-col w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 p-6 h-full"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-2">
                <img src="/images/logo.png" alt="SaniNova" className="h-8 w-auto filter brightness-0 invert" />
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">ADMIN</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-poppins font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-500/10 text-[#00A878] border border-emerald-500/10"
                        : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-poppins font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-slate-900/50 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <img src="/images/logo.png" alt="SaniNova" className="h-8 w-auto filter brightness-0 invert" />
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Desktop Breadcrumbs & Profile Header */}
        <header className="hidden lg:flex items-center justify-between px-10 py-6 border-b border-slate-800/50 bg-slate-900/10">
          <div>
            <h2 className="font-poppins font-semibold text-slate-200 text-sm capitalize">
              {navItems.find(i => i.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#00A878]">
                <User className="w-4 h-4" />
              </div>
              <span className="font-poppins text-sm font-medium text-slate-300">saninovagc@gmail.com</span>
            </div>
          </div>
        </header>

        {/* Actual View Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-gradient-to-b from-slate-950 to-slate-900">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
