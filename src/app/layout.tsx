import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitalis AI — AI-Powered Health Tracker",
  description:
    "A futuristic AI-powered wellness ecosystem. Track your health, predict burnout, and get personalized AI recommendations.",
  keywords: [
    "health tracker",
    "AI wellness",
    "burnout prediction",
    "mood tracker",
    "sleep analytics",
  ],
  authors: [{ name: "Vitalis AI" }],
};

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#f97316' } }}>
      <html lang="en" className={`${inter.variable} h-full antialiased`}>
        <body
          className="min-h-full flex flex-col"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
