"use client";

import { motion } from "framer-motion";
import { Heart, Phone, AlertTriangle, QrCode, Shield, User } from "lucide-react";
import { useState } from "react";

const mockEmergency = {
  bloodGroup: "O+",
  emergencyContacts: [
    { name: "Mom", phone: "+91 98765 43210", relation: "Mother" },
    { name: "Dad", phone: "+91 98765 43211", relation: "Father" },
  ],
  allergies: ["Penicillin", "Peanuts"],
  medicalConditions: ["Mild Asthma"],
};

export default function EmergencyPage() {
  const [data] = useState(mockEmergency);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[24px] font-bold mb-1">Emergency Health Card</h2>
        <p className="text-[14px] text-[#666]">Critical information accessible in emergencies</p>
      </motion.div>

      {/* Emergency Card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#ef4444] rounded-full opacity-[0.05] blur-[80px]" />
        <div className="p-8 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={20} className="text-[#ef4444]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#ef4444] uppercase">Emergency Medical Card</span>
              </div>
              <h3 className="text-[28px] font-bold text-white">Atharva Utekar</h3>
              <p className="text-[13px] text-[#666]">Age: 21 · Male</p>
            </div>
            <div className="text-center p-4 rounded-2xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <div className="text-[28px] font-bold text-[#ef4444]">{data.bloodGroup}</div>
              <div className="text-[10px] text-[#888] uppercase tracking-wider">Blood Group</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Allergies */}
            <div className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-[#ef4444]" />
                <span className="text-[12px] font-semibold text-[#ef4444]">Allergies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.allergies.map((a) => (
                  <span key={a} className="px-3 py-1 rounded-lg text-[12px] font-medium text-[#ef4444]"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>{a}</span>
                ))}
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="p-4 rounded-xl" style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.1)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={14} className="text-[#f97316]" />
                <span className="text-[12px] font-semibold text-[#f97316]">Medical Conditions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.medicalConditions.map((c) => (
                  <span key={c} className="px-3 py-1 rounded-lg text-[12px] font-medium text-[#f97316]"
                    style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Phone size={16} className="text-[#22c55e]" />
          <h3 className="text-[14px] font-semibold">Emergency Contacts</h3>
        </div>
        <div className="space-y-2">
          {data.emergencyContacts.map((c) => (
            <div key={c.name} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="w-10 h-10 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
                <User size={16} className="text-[#22c55e]" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-medium text-white">{c.name}</div>
                <div className="text-[11px] text-[#666]">{c.relation}</div>
              </div>
              <a href={`tel:${c.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium text-[#22c55e] transition-all hover:bg-[rgba(34,197,94,0.1)]"
                style={{ border: "1px solid rgba(34,197,94,0.2)" }}>
                <Phone size={12} /> {c.phone}
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      {/* QR Code */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <QrCode size={20} className="text-[#f97316] mx-auto mb-3" />
        <h3 className="text-[14px] font-semibold mb-2">Emergency QR Code</h3>
        <p className="text-[12px] text-[#666] mb-4">Generate a QR code for instant access to your emergency info</p>
        <button onClick={() => setShowQR(!showQR)}
          className="px-6 py-2.5 rounded-xl text-[13px] font-medium bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all">
          {showQR ? "Hide QR Code" : "Generate QR Code"}
        </button>
        {showQR && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 inline-block p-6 rounded-2xl bg-white">
            {/* Simple QR pattern placeholder */}
            <div className="w-40 h-40 grid grid-cols-8 gap-0.5">
              {Array.from({ length: 64 }, (_, i) => (
                <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Scan for emergency info</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
