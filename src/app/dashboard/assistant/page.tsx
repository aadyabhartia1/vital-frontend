"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const quickPrompts = [
  "How can I improve my sleep?",
  "Suggest a workout plan for me",
  "What should I eat today?",
  "How to manage my stress?",
  "Tips for better hydration",
];

export default function AssistantPage() {
  const { getToken } = useAuth();
  const { chatMessages, addChatMessage, chatLoading, setChatLoading } = useAppStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now().toString(), role: "user" as const, content: text, timestamp: new Date().toISOString() };
    addChatMessage(userMsg);
    setInput("");
    setChatLoading(true);

    try {
      const token = await getToken();
      const res = await axios.post(
        `${API_URL}/ai/chat`,
        { message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMsg = { id: (Date.now() + 1).toString(), role: "assistant" as const, content: res.data.message, timestamp: new Date().toISOString() };
      addChatMessage(aiMsg);
    } catch (error) {
      console.error("AI Error:", error);
      addChatMessage({ id: (Date.now() + 1).toString(), role: "assistant" as const, content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.", timestamp: new Date().toISOString() });
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto h-[calc(100vh-128px)] flex flex-col">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4 shrink-0">
        <h2 className="text-[24px] font-bold mb-1">AI Health Assistant</h2>
        <p className="text-[14px] text-[#666]">Ask me anything about your health</p>
      </motion.div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {chatMessages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#d4a017] flex items-center justify-center mb-4 animate-pulse-glow">
              <Sparkles size={28} className="text-white" />
            </div>
            <h3 className="text-[18px] font-semibold mb-2">Hello! I&apos;m your AI Health Assistant</h3>
            <p className="text-[13px] text-[#666] max-w-sm mb-6">I can help with diet plans, workout routines, sleep tips, and personalized health insights based on your data.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickPrompts.map((p) => (
                <button key={p} onClick={() => sendMessage(p)}
                  className="px-4 py-2 rounded-xl text-[12px] text-[#999] hover:text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {chatMessages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#d4a017] flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-white" />
              </div>
            )}
            <div className={`max-w-[75%] p-4 rounded-2xl text-[13px] leading-relaxed ${
              msg.role === "user"
                ? "bg-[#f97316] text-white rounded-br-md"
                : "rounded-bl-md"
            }`} style={msg.role === "assistant" ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" } : {}}>
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0 mt-1">
                <User size={14} className="text-[#888]" />
              </div>
            )}
          </motion.div>
        ))}

        {chatLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#d4a017] flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div className="p-4 rounded-2xl rounded-bl-md" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Loader2 size={16} className="text-[#f97316] animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        className="flex items-center gap-3 p-3 rounded-2xl shrink-0"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your health..."
          className="flex-1 bg-transparent text-[14px] text-white placeholder:text-[#444] focus:outline-none px-2" disabled={chatLoading} />
        <button type="submit" disabled={!input.trim() || chatLoading}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] flex items-center justify-center disabled:opacity-30 hover:shadow-lg hover:shadow-orange-500/20 transition-all">
          <Send size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
}
