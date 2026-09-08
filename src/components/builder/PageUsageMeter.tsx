"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { calculatePageUsage } from "@/utils/pagination";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PageUsageMeter() {
  const { contentHeight, autoFit } = useResume();
  const { percentage, status, isOverflown, message } = calculatePageUsage(contentHeight);

  // Meter color styling
  const colorMap = {
    normal: {
      bar: "bg-blue-600 dark:bg-blue-500",
      text: "text-blue-700 dark:text-blue-300",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
    },
    warning: {
      bar: "bg-amber-500",
      text: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300",
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500" />,
    },
    overflow: {
      bar: "bg-red-600",
      text: "text-red-700 dark:text-red-300",
      bg: "bg-red-50 dark:bg-red-950/40",
      badge: "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300",
      icon: <AlertCircle className="w-3.5 h-3.5 text-red-500" />,
    },
  };

  const currentTheme = colorMap[status];

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {currentTheme.icon}
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
            Page Usage
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentTheme.badge}`}>
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-300 ${currentTheme.bar}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        {/* 100% capacity tick indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 dark:bg-slate-500 z-10"
          style={{ left: "95%" }}
          title="Safe capacity limit"
        />
      </div>

      {/* Overflow Hard-Stop Alert & Auto-Fit Affordance */}
      {isOverflown ? (
        <div className="mt-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-xs text-red-800 dark:text-red-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-2 flex-1">
              <p className="font-medium leading-snug">
                Your content exceeds the one-page limit. Shorten your content, or reduce font size / spacing to fit.
              </p>
              <Button
                size="sm"
                variant="primary"
                onClick={autoFit}
                className="w-full text-xs font-semibold py-1.5 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Auto-Fit to One Page
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>{status === "warning" ? "Approaching 1-page capacity" : "Strictly 1-page compliant"}</span>
          <button
            onClick={autoFit}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> Auto-fit
          </button>
        </div>
      )}
    </div>
  );
}
