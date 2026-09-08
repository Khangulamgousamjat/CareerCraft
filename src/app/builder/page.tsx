"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { ResumeProvider, useResume } from "@/context/ResumeContext";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ContentPanel } from "@/components/builder/ContentPanel";
import { ResumePage } from "@/components/builder/ResumeRenderer/ResumePage";
import { PageUsageMeter } from "@/components/builder/PageUsageMeter";
import { EditorToolbar } from "@/components/builder/EditorToolbar";
import { ResumeDesignPanel } from "@/components/builder/ResumeDesignPanel";
import { DownloadPanel } from "@/components/builder/DownloadPanel";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  Sparkles,
  Sliders,
  RotateCcw,
  Trash2,
  Home,
  CheckCircle2,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Edit3,
  Eye,
} from "lucide-react";

function BuilderMain() {
  const {
    resume,
    isEditingFormat,
    setIsEditingFormat,
    clearResume,
    loadSampleResume,
    isSaving,
    lastSaved,
    autoFit,
  } = useResume();
  const { showToast } = useToast();

  const [showClearModal, setShowClearModal] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.85);
  const [mobileTab, setMobileTab] = useState<"form" | "preview" | "design">("preview");

  const centerContainerRef = useRef<HTMLDivElement | null>(null);

  // Dynamically calculate scale factor for center A4 preview container
  useEffect(() => {
    const handleResize = () => {
      if (centerContainerRef.current) {
        const containerWidth = centerContainerRef.current.clientWidth - 48; // padding
        const a4Width = 794;
        if (containerWidth < a4Width) {
          const calculated = Math.min(1, Math.max(0.35, containerWidth / a4Width));
          setPreviewScale(calculated);
        } else {
          setPreviewScale(0.85); // Comfortable default on desktop
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleConfirmClear = () => {
    clearResume();
    setShowClearModal(false);
    showToast("Resume cleared.", "info");
  };

  const handleLoadSample = () => {
    loadSampleResume();
    showToast("Sample resume loaded successfully!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFF] dark:bg-[#0B132B] transition-colors">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B132B]/90 backdrop-blur-md transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand + Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white tracking-tight hidden sm:inline">
                CareerCraft
              </span>
            </Link>

            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                Resume Builder
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                A4
              </span>
            </div>
          </div>

          {/* Center: Autosave Status Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {isSaving ? (
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving locally...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved locally</span>
              </span>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Edit Resume Formatting Toggle */}
            <Button
              variant={isEditingFormat ? "subtle" : "outline"}
              size="sm"
              onClick={() => setIsEditingFormat(!isEditingFormat)}
              className="hidden sm:inline-flex text-xs font-semibold cursor-pointer"
              leftIcon={<Sliders className="w-3.5 h-3.5" />}
            >
              {isEditingFormat ? "Hide Formatting" : "Edit Resume"}
            </Button>

            {/* Quick Auto-Fit */}
            <Button
              variant="outline"
              size="sm"
              onClick={autoFit}
              title="Auto-fit content to single page"
              className="hidden lg:inline-flex text-xs font-medium cursor-pointer"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            >
              Auto-Fit
            </Button>

            {/* Download Dropdown */}
            <DownloadPanel />

            {/* Reset / Sample Data Actions */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                title="Clear resume data"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

            <Link href="/">
              <button
                type="button"
                title="Back to Home"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
              </button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Tabs (visible on narrow screens) */}
      <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 flex items-center justify-around text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMobileTab("form")}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg cursor-pointer ${
            mobileTab === "form"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" /> Content Form
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg cursor-pointer ${
            mobileTab === "preview"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Live A4 Preview
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("design")}
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg cursor-pointer ${
            mobileTab === "design"
              ? "bg-blue-600 text-white"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" /> Formatting
        </button>
      </div>

      {/* Main Builder Three-Area Workspace */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT PANEL: Form Sections (Desktop: 4 cols or 5 cols) */}
        <aside
          className={`lg:col-span-4 xl:col-span-4 ${
            mobileTab === "form" ? "block" : "hidden lg:block"
          } lg:sticky lg:top-20 lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto pr-1`}
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Resume Sections
            </h2>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Sample Data
            </button>
          </div>
          <ContentPanel />
        </aside>

        {/* CENTER PANEL: Fixed A4 Preview Canvas */}
        <main
          ref={centerContainerRef}
          className={`lg:col-span-5 xl:col-span-5 flex flex-col items-center ${
            mobileTab === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Zoom and Scaling Toolbar */}
          <div className="w-full max-w-[794px] flex items-center justify-between mb-2 px-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Live A4 Preview (794 × 1123 px)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPreviewScale((s) => Math.max(0.4, Math.round((s - 0.05) * 100) / 100))}
                title="Zoom Out"
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] min-w-[36px] text-center">
                {Math.round(previewScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setPreviewScale((s) => Math.min(1.2, Math.round((s + 0.05) * 100) / 100))}
                title="Zoom In"
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewScale(0.85)}
                title="Reset Zoom"
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Centered Scaled Preview Wrapper */}
          <div
            className="w-full flex justify-center items-start overflow-visible"
            style={{
              height: `${1123 * previewScale + 40}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
                transition: "transform 0.1s ease-out",
              }}
            >
              <ResumePage />
            </div>
          </div>
        </main>

        {/* RIGHT PANEL: Formatting Properties & Page Usage Meter */}
        <aside
          className={`lg:col-span-3 xl:col-span-3 space-y-4 ${
            mobileTab === "design"
              ? "block"
              : isEditingFormat
              ? "block"
              : "hidden lg:block"
          } lg:sticky lg:top-20`}
        >
          {/* Real-time Page Usage Meter & Overflow Guard */}
          <PageUsageMeter />

          {/* Scoped Formatting Toolbar */}
          <EditorToolbar />

          {/* Global Resume Design Panel */}
          <ResumeDesignPanel />
        </aside>
      </div>

      {/* Clear Resume Confirmation Dialog */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Resume?"
        description="This action will clear all current content and reset the resume to blank."
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Are you sure you want to clear your resume? Your locally stored data will be wiped. You can reload sample data anytime.
          </p>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowClearModal(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleConfirmClear}
              className="cursor-pointer"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Yes, Clear Resume
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bottom Footer Attribution */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 py-4 mt-8 bg-white/50 dark:bg-[#0B132B]/50 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>CareerCraft — Single-Page Resume Builder • </span>
            <span>Created by </span>
            <a
              href="https://github.com/Khangulamgousamjat/CareerCraft.git"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Gous Khan
            </a>
          </div>
          <div>
            <a
              href="https://github.com/Khangulamgousamjat/CareerCraft.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              GitHub: Khangulamgousamjat/CareerCraft
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ToastProvider>
      <ResumeProvider>
        <BuilderMain />
      </ResumeProvider>
    </ToastProvider>
  );
}
