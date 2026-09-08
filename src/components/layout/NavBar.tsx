"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { FileText, Sparkles, LayoutTemplate, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function NavBar({ current = "home" }: { current?: "home" | "builder" }) {
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B132B]/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                CareerCraft
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 tracking-wider">
                  One-Page
                </span>
              </span>
            </div>
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowTemplatesModal(true)}
              className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4 text-slate-400" />
              <span>Templates</span>
            </button>

            {current === "home" ? (
              <Link href="/builder">
                <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Create Resume
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button size="sm" variant="ghost">
                  Home
                </Button>
              </Link>
            )}

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Templates Information Modal (v2 Architecture) */}
      <Modal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
        title="Resume Templates"
        description="Curated layouts engineered specifically for strict 1-page compliance."
      >
        <div className="space-y-4 pt-1">
          <div className="p-4 rounded-xl border-2 border-blue-600/40 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Standard Modern Single-Page (Active)
                </span>
                <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  DEFAULT
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The flagship single-page layout with structured header, summary, technical skills matrix, and bulleted work history. Fully active right now.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 opacity-80">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                Executive Minimalist & Academic Dual-Column
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                Coming in v2
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Additional strict single-page variations are designed to seamlessly plug into the current data model without breaking export fidelity.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button size="sm" variant="primary" onClick={() => setShowTemplatesModal(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
