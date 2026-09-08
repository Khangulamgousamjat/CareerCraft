"use client";

import React from "react";
import Link from "next/link";
import { DEFAULT_RESUME } from "@/utils/storage";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function PreviewMockup() {
  const { personal, summary, skills, experience, projects, education, certifications } = DEFAULT_RESUME;

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Decorative ambient glows */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Frame Container */}
      <div className="relative rounded-2xl p-2 sm:p-3.5 bg-gradient-to-b from-slate-200/80 to-slate-100/40 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-xs">
        {/* Mockup Topbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 rounded-t-xl text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-slate-500 dark:text-slate-400 font-mono text-[11px] hidden sm:inline">
              live-preview.a4 (100% Guaranteed Single-Page)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Page Usage: 91%
            </span>
          </div>
        </div>

        {/* The Realistic Rendered Resume Document Card */}
        <div className="relative bg-white text-[#0B132B] rounded-b-xl p-5 sm:p-8 shadow-inner font-sans select-none overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="border-b-2 border-blue-600 pb-3 mb-3 text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
              {personal.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-blue-600 tracking-wide mt-0.5">
              {personal.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-[10px] sm:text-[11px] text-slate-600 mt-1.5">
              <span>{personal.phone}</span>
              <span>•</span>
              <span>{personal.email}</span>
              <span>•</span>
              <span>{personal.location}</span>
              <span>•</span>
              <span className="text-blue-600">{personal.portfolio}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-3">
            <h3 className="text-[11px] uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1 flex items-center gap-1">
              Professional Summary
            </h3>
            <p className="text-[10px] leading-relaxed text-slate-700">
              {summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-3">
            <h3 className="text-[11px] uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 gap-1 text-[10px]">
              {skills.slice(0, 3).map((s) => (
                <div key={s.id || s.category} className="flex items-baseline gap-1">
                  <span className="font-semibold text-slate-900 min-w-[110px] shrink-0">
                    {s.category}:
                  </span>
                  <span className="text-slate-700">{s.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-3">
            <h3 className="text-[11px] uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5">
              Work Experience
            </h3>
            {experience.slice(0, 2).map((exp) => (
              <div key={exp.id} className="mb-2 last:mb-0">
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="font-bold text-slate-900">
                    {exp.position} — <span className="text-blue-700 font-semibold">{exp.company}</span>
                  </span>
                  <span className="text-[9.5px] text-slate-500 font-medium">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-3.5 mt-0.5 text-[9.5px] leading-snug text-slate-700 space-y-0.5">
                  {exp.bullets.slice(0, 2).map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education & Certs row */}
          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div>
              <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1">
                Education
              </h3>
              <div className="text-[9.5px]">
                <div className="font-bold text-slate-900">{education[0].degree}</div>
                <div className="text-slate-600">{education[0].institution}</div>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1">
                Certifications
              </h3>
              <div className="text-[9.5px] text-slate-800">
                <div>• {certifications[0].name}</div>
                <div>• {certifications[1].name}</div>
              </div>
            </div>
          </div>

          {/* Interactive Hover Overlay */}
          <div className="absolute inset-0 bg-blue-900/0 hover:bg-blue-900/5 transition-colors flex items-end justify-center pb-4 opacity-0 hover:opacity-100 pointer-events-none">
            <Link
              href="/builder"
              className="pointer-events-auto inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg transform translate-y-2 hover:translate-y-0 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Customize this in Builder <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
