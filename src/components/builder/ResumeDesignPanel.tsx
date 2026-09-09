"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { ColorPicker } from "./ColorPicker";
import { FONT_OPTIONS } from "@/utils/formatting";
import { Sliders, Lock, Type, AlignJustify, AlignLeft } from "lucide-react";

export function ResumeDesignPanel() {
  const { resume, updateFormatting } = useResume();
  const { formatting } = resume;

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Resume Design
          </span>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          Global Styling
        </span>
      </div>

      {/* Font Family Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Resume Typography
        </label>
        <select
          value={formatting.fontFamily}
          onChange={(e) => updateFormatting({ fontFamily: e.target.value })}
          className="w-full text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.id} value={font.id}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Body Text Alignment */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Text Alignment
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => updateFormatting({ bodyAlignment: "justify" })}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              (formatting.bodyAlignment || "justify") === "justify"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <AlignJustify className="w-3.5 h-3.5" />
            <span>Justified</span>
          </button>
          <button
            type="button"
            onClick={() => updateFormatting({ bodyAlignment: "left" })}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              formatting.bodyAlignment === "left"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span>Left-Aligned</span>
          </button>
        </div>
      </div>

      {/* Document Colors Grid */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Accent Color
          </span>
          <ColorPicker
            value={formatting.accentColor}
            onChange={(color) => updateFormatting({ accentColor: color })}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Heading Color
          </span>
          <ColorPicker
            value={formatting.headingColor}
            onChange={(color) => updateFormatting({ headingColor: color })}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Body Text Color
          </span>
          <ColorPicker
            value={formatting.bodyColor}
            onChange={(color) => updateFormatting({ bodyColor: color })}
          />
        </div>
      </div>

      {/* Base Font Size Stepper */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Base Font Size
          </span>
          <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
            {formatting.baseFontSize || 10} pt
          </span>
        </div>
        <input
          type="range"
          min="8.5"
          max="12.0"
          step="0.5"
          value={formatting.baseFontSize || 10}
          onChange={(e) => updateFormatting({ baseFontSize: parseFloat(e.target.value) })}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>8.5 pt (Compact)</span>
          <span>10 pt (Default)</span>
          <span>12 pt (Large)</span>
        </div>
      </div>

      {/* Page Size - Locked Informational Badge */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Page Format
        </span>
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>A4 Standard (210 × 297 mm)</span>
        </div>
      </div>
    </div>
  );
}
