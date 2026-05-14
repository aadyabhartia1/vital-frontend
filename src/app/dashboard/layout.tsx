"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Brain, Moon, Droplets, Flame, Clock, Shield, Trophy,
  Heart, Bell, Settings, LogOut, Zap, Menu, X, MessageSquare, User,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/mood", icon: Brain, label: "Mood Tracker" },
  { href: "/dashboard/sleep", icon: Moon, label: "Sleep Analytics" },
  { href: "/dashboard/water", icon: Droplets, label: "Water Tracker" },
  { href: "/dashboard/habits", icon: Flame, label: "Habits" },
  { href: "/dashboard/timeline", icon: Clock, label: "Timeline" },
  { href: "/dashboard/burnout", icon: Shield, label: "Burnout AI" },
  { href: "/dashboard/assistant", icon: MessageSquare, label: "AI Assistant" },
  { href: "/dashboard/achievements", icon: Trophy, label: "Achievements" },
  { href: "/dashboard/emergency", icon: Heart, label: "Emergency Card" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { getToken } = useAuth();
  const { notifications, sidebarCollapsed, toggleSidebar, dashboardData, fetchDashboardData } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const loadData = async () => {
      const token = await getToken();
      if (token) {
        await fetchDashboardData(token);
      }
    };
    loadData();
  }, [getToken, fetchDashboardData]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ${
          sidebarCollapsed ? "w-[72px]" : "w-[250px]"
        }`}
        style={{ background: "rgba(8,8,8,0.95)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className={`h-[64px] flex items-center ${sidebarCollapsed ? "justify-center px-0" : "px-5"} shrink-0`}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Zap size={16} className="text-white" />
            </div>
            {!sidebarCollapsed && <span className="text-[15px] font-bold tracking-tight">Vitalis AI</span>}
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#f97316]/10 text-[#f97316]"
                    : "text-[#777] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon size={18} className="shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 space-y-1 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={toggleSidebar} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-[#777] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all w-full ${sidebarCollapsed ? "justify-center" : ""}`}>
            <Menu size={18} className="shrink-0" />
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
          <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-[#777] hover:text-red-400 hover:bg-[rgba(255,255,255,0.04)] transition-all ${sidebarCollapsed ? "justify-center" : ""}`}>
            <LogOut size={18} className="shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-[250px] z-50 md:hidden flex flex-col" style={{ background: "rgba(8,8,8,0.98)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="h-[64px] flex items-center justify-between px-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Link href="/dashboard" className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center"><Zap size={16} className="text-white" /></div><span className="text-[15px] font-bold">Vitalis AI</span></Link>
                <button onClick={() => setMobileOpen(false)} className="text-[#777]"><X size={20} /></button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isActive ? "bg-[#f97316]/10 text-[#f97316]" : "text-[#777] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"}`}>
                      <item.icon size={18} /><span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[250px]"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-[64px] flex items-center justify-between px-6 bg-[#050505]"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-[#777]"><Menu size={20} /></button>
            <div>
              <h1 className="text-[15px] font-semibold">
                {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
              </h1>
              <p className="text-[11px] text-[#555]">Level {dashboardData.level} · {dashboardData.xpTotal} XP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#777] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <Bell size={18} />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f97316]" />}
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[#777] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <Settings size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f97316] to-[#d4a017] flex items-center justify-center text-[12px] font-bold ml-1">
              <User size={14} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
