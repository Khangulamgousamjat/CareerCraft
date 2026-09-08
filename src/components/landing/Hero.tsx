import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PreviewMockup } from "./PreviewMockup";

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy and CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Strictly Single-Page • Free Forever • No Sign-Up</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Build a professional resume in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                minutes
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              No account creation, no subscriptions, and zero silent page spills. Fill structured fields, preview changes live on a pixel-perfect A4 canvas, and download instant exports in PDF, Word (DOCX), PNG, and JPG.
            </p>

            {/* Benefits List */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero login or signup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single-page guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>PDF, DOCX, PNG, JPG</span>
              </div>
            </div>

            {/* Primary Call to Action */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto text-base font-semibold px-8 py-3.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Resume
                </Button>
              </Link>
            </div>

            {/* Privacy reassurance note */}
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Autosaved locally in your browser. No data ever leaves your computer.</span>
            </p>
          </div>

          {/* Right Column: Live Mockup Graphic */}
          <div className="lg:col-span-6 w-full">
            <PreviewMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
