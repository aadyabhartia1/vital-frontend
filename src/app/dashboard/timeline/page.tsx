"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Activity, Brain, Droplets, Heart, Moon, Flame } from "lucide-react";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const icons = { calories: Flame, waterIntake: Droplets, sleepHours: Moon, heartRate: Heart, activityScore: Activity, mood: Brain };
const colors = { calories: "#f97316", waterIntake: "#06b6d4", sleepHours: "#3b82f6", heartRate: "#ef4444", activityScore: "#22c55e", mood: "#8b5cf6" };

export default function TimelinePage() {
  const { dashboardData } = useAppStore();
  const { weeklyLogs } = dashboardData;

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Health Timeline</h2>
        <p className="text-[14px] text-[#666]">Your complete health journey at a glance</p>
      </motion.div>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

        {weeklyLogs.map((log, i) => {
          const date = new Date(log.createdAt);
          const isLeft = i % 2 === 0;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`relative flex items-start gap-4 mb-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#f97316] border-2 border-[#050505] z-10 mt-6" />
              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? "" : ""}`}>
                <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[12px] text-[#f97316] font-semibold mb-2">{dayNames[i]} · {date.toLocaleDateString()}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(["calories", "sleepHours", "waterIntake", "heartRate", "activityScore", "mood"] as const).map((key) => {
                      const Icon = icons[key];
                      const color = colors[key];
                      const val = key === "mood" ? log.mood : key === "waterIntake" ? `${log[key].toFixed(1)}L` : key === "sleepHours" ? `${log[key].toFixed(1)}h` : key === "heartRate" ? `${log[key]} bpm` : key === "calories" ? `${log[key]} kcal` : `${log[key]}%`;
                      return (
                        <div key={key} className="flex items-center gap-2 py-1">
                          <Icon size={13} style={{ color }} />
                          <span className="text-[11px] text-[#888] capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
                          <span className="text-[11px] font-medium text-white">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
