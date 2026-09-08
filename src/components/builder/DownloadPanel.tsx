"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResume } from "@/context/ResumeContext";
import { useToast } from "@/components/ui/Toast";
import { calculatePageUsage } from "@/utils/pagination";
import { exportToPdf } from "@/export/pdf";
import { exportToDocx } from "@/export/docx";
import { exportToPng } from "@/export/png";
import { exportToJpg } from "@/export/jpg";
import {
  Download,
  FileText,
  FileType,
  Image,
  Loader2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DownloadPanel() {
  const { resume, resumeNodeRef, contentHeight, isEditingFormat, setIsEditingFormat } =
    useResume();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isOverflown, percentage } = calculatePageUsage(contentHeight);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const candidateSlug =
    resume.personal.name?.trim().replace(/\s+/g, "_") || "Resume";

  const handleExport = async (format: "pdf" | "docx" | "png" | "jpg") => {
    const node = resumeNodeRef.current;
    if (!node && format !== "docx") {
      showToast("Resume preview element not ready. Please wait.", "error");
      return;
    }

    if (isOverflown && (format === "pdf" || format === "png" || format === "jpg")) {
      showToast(
        "Cannot download: Content exceeds 1-page limit. Click Auto-Fit to adjust.",
        "error",
        5000
      );
      return;
    }

    setExportingFormat(format);

    try {
      if (format === "pdf" && node) {
        showToast("Generating crisp 1-page A4 PDF...", "info", 2000);
        await exportToPdf(node, {
          filename: `${candidateSlug}_Resume.pdf`,
          isOverflown,
        });
        showToast("PDF downloaded successfully!", "success");
      } else if (format === "docx") {
        showToast("Generating editable Word document...", "info", 2000);
        await exportToDocx(resume, {
          filename: `${candidateSlug}_Resume.docx`,
        });
        showToast("Word document downloaded successfully!", "success");
      } else if (format === "png" && node) {
        showToast("Rendering ultra-crisp PNG image...", "info", 2000);
        await exportToPng(node, {
          filename: `${candidateSlug}_Resume.png`,
        });
        showToast("PNG image downloaded successfully!", "success");
      } else if (format === "jpg" && node) {
        showToast("Rendering high-res JPEG image...", "info", 2000);
        await exportToJpg(node, {
          filename: `${candidateSlug}_Resume.jpg`,
        });
        showToast("JPG image downloaded successfully!", "success");
      }
      setIsOpen(false);
    } catch (err: any) {
      console.error(`Export failed for ${format}:`, err);
      showToast(
        err?.message || `Failed to export ${format.toUpperCase()}. Please retry.`,
        "error",
        4500
      );
    } finally {
      setExportingFormat(null);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Primary Download Trigger */}
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="font-semibold shadow-sm cursor-pointer"
        leftIcon={<Download className="w-4 h-4" />}
        rightIcon={<ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
      >
        Download
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Resume Ready
            </span>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Choose your preferred format
            </div>
          </div>

          {/* Overflow Warning Banner inside menu if overflown */}
          {isOverflown && (
            <div className="m-1.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-[11px] text-red-800 dark:text-red-200 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <span>
                Page usage is {percentage}%. Reduce content or auto-fit before exporting PDF/Images.
              </span>
            </div>
          )}

          <div className="space-y-1 py-1">
            {/* Download PDF */}
            <button
              type="button"
              disabled={!!exportingFormat}
              onClick={() => handleExport("pdf")}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <div>Download PDF</div>
                  <div className="text-[10px] text-slate-400 font-normal">
                    Pixel-identical 1-page A4
                  </div>
                </div>
              </div>
              {exportingFormat === "pdf" && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
              )}
            </button>

            {/* Download Word DOCX */}
            <button
              type="button"
              disabled={!!exportingFormat}
              onClick={() => handleExport("docx")}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <FileType className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <div className="text-left">
                  <div>Download Word (.docx)</div>
                  <div className="text-[10px] text-slate-400 font-normal">
                    Real, editable structured document
                  </div>
                </div>
              </div>
              {exportingFormat === "docx" && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              )}
            </button>

            {/* Download PNG */}
            <button
              type="button"
              disabled={!!exportingFormat}
              onClick={() => handleExport("png")}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <Image className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <div>Download PNG</div>
                  <div className="text-[10px] text-slate-400 font-normal">
                    High-res raster print graphic
                  </div>
                </div>
              </div>
              {exportingFormat === "png" && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              )}
            </button>

            {/* Download JPG */}
            <button
              type="button"
              disabled={!!exportingFormat}
              onClick={() => handleExport("jpg")}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <Image className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <div className="text-left">
                  <div>Download JPG</div>
                  <div className="text-[10px] text-slate-400 font-normal">
                    Compressed high-quality JPEG
                  </div>
                </div>
              </div>
              {exportingFormat === "jpg" && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
              )}
            </button>
          </div>

          {/* Quick Edit Resume toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsEditingFormat(!isEditingFormat);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isEditingFormat ? "Close Formatting" : "Edit Resume Formatting"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
