import React from "react";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/landing/Hero";
import { FeatureStrip } from "@/components/landing/FeatureStrip";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, ArrowUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF] dark:bg-[#0B132B] transition-colors">
      <NavBar current="home" />

      <main className="flex-1">
        {/* Hero with Preview Mockup */}
        <Hero />

        {/* Feature & Trust Strip */}
        <FeatureStrip />

        {/* Secondary Call to Action for users who scrolled */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-blue-950/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ready to craft your resume?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Get started instantly without signing up. Fill in your details, see real-time formatting, and download your single-page resume.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/builder">
                <Button
                  size="lg"
                  variant="primary"
                  className="px-8 py-3.5 shadow-lg shadow-blue-500/25 text-base font-semibold cursor-pointer"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Resume Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 bg-white/60 dark:bg-slate-900/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                CareerCraft
              </span>
              <span>—</span>
              <span>Strictly One-Page Resume Builder.</span>
            </div>
            <span className="hidden sm:inline opacity-40">•</span>
            <div>
              Created by{" "}
              <a
                href="https://github.com/Khangulamgousamjat/CareerCraft.git"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Gous Khan
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Khangulamgousamjat/CareerCraft.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              GitHub Repository
            </a>
            <span className="opacity-40">•</span>
            <a
              href="#top"
              className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
