"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";

export function SummaryForm() {
  const { resume, updateSummary, setFocusedFieldId } = useResume();
  const wordCount = resume.summary ? resume.summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Professional Bio / Elevator Pitch
        </label>
        <span className="text-[11px] text-slate-500 font-mono">
          {wordCount} words (~{Math.round(wordCount / 40)} lines)
        </span>
      </div>
      <textarea
        rows={4}
        value={resume.summary}
        onChange={(e) => updateSummary(e.target.value)}
        onFocus={() => setFocusedFieldId("summary")}
        placeholder="Write a concise 2–4 sentence summary highlighting your core strengths, years of experience, and highest-impact achievements..."
        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
      />
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Tip: A concise 40–60 word summary keeps your resume well within the single-page limit.
      </p>
    </div>
  );
}
