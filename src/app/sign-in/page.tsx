"use client";

import { SignIn } from "@clerk/nextjs";
import { Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/10 via-transparent to-[#d4a017]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f97316] rounded-full opacity-[0.04] blur-[150px]" />
        <div className="relative z-10 max-w-[380px] px-8">
          <Link href="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">Vitalis AI</span>
          </Link>
          <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight mb-4">
            Welcome back to your
            <span className="bg-gradient-to-r from-[#f97316] to-[#d4a017] bg-clip-text text-transparent"> wellness journey</span>
          </h2>
          <p className="text-[15px] text-[#666] leading-relaxed">
            Your AI health companion is ready with new insights and recommendations.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[400px] mb-8">
          <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold">Vitalis AI</span>
          </Link>

          <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-[#666] hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>

        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              formButtonPrimary: 'bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:shadow-lg hover:shadow-orange-500/25',
              card: 'bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] shadow-2xl',
              headerTitle: 'text-white',
              headerSubtitle: 'text-[#666]',
              socialButtonsBlockButton: 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] text-white',
              dividerLine: 'bg-[rgba(255,255,255,0.06)]',
              dividerText: 'text-[#555]',
              formFieldLabel: 'text-[#888]',
              formFieldInput: 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-white placeholder-[#444] focus:border-[#f97316]/50',
              footerActionText: 'text-[#555]',
              footerActionLink: 'text-[#f97316] hover:text-[#f97316] hover:underline',
            }
          }}
          routing="hash"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
