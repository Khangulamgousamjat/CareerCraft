"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Plus,
  Palette,
  Sparkles,
} from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { TextAlignment } from "@/types/resume";

export function EditorToolbar() {
  const { resume, focusedFieldId, updateTextOverride, updateFormatting, isEditingFormat } =
    useResume();

  if (!isEditingFormat) return null;

  const currentOverride = focusedFieldId
    ? resume.formatting.textOverrides?.[focusedFieldId] || {}
    : {};

  const handleToggleBold = () => {
    if (!focusedFieldId) return;
    updateTextOverride(focusedFieldId, { bold: !currentOverride.bold });
  };

  const handleToggleItalic = () => {
    if (!focusedFieldId) return;
    updateTextOverride(focusedFieldId, { italic: !currentOverride.italic });
  };

  const handleToggleUnderline = () => {
    if (!focusedFieldId) return;
    updateTextOverride(focusedFieldId, { underline: !currentOverride.underline });
  };

  const handleAlign = (align: TextAlignment) => {
    if (!focusedFieldId) return;
    updateTextOverride(focusedFieldId, { alignment: align });
  };

  const handleFontSizeDelta = (change: number) => {
    if (focusedFieldId) {
      const currentDelta = currentOverride.fontSizeDelta || 0;
      updateTextOverride(focusedFieldId, { fontSizeDelta: currentDelta + change });
    } else {
      // Adjust global base font size if no field is focused
      const newBase = Math.max(8.5, Math.min(13, (resume.formatting.baseFontSize || 10) + change * 0.5));
      updateFormatting({ baseFontSize: Math.round(newBase * 10) / 10 });
    }
  };

  const handleColorChange = (color: string) => {
    if (focusedFieldId) {
      updateTextOverride(focusedFieldId, { color });
    } else {
      updateFormatting({ bodyColor: color });
    }
  };

  return (
    <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Formatting Toolbar
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
          {focusedFieldId ? focusedFieldId.replace(".", " → ") : "Select text on preview"}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {/* Font Size Stepper */}
        <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => handleFontSizeDelta(-1)}
            title="Decrease font size"
            className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-semibold px-2 text-slate-800 dark:text-slate-200">
            Size
          </span>
          <button
            type="button"
            onClick={() => handleFontSizeDelta(1)}
            title="Increase font size"
            className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Style Toggles: Bold, Italic, Underline */}
        <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={handleToggleBold}
            title="Bold"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              currentOverride.bold
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleToggleItalic}
            title="Italic"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              currentOverride.italic
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleToggleUnderline}
            title="Underline"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              currentOverride.underline
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Text Alignment */}
        <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => handleAlign("left")}
            title="Align Left"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              (currentOverride.alignment || "left") === "left"
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign("center")}
            title="Align Center"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              currentOverride.alignment === "center"
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign("right")}
            title="Align Right"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              currentOverride.alignment === "right"
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleAlign("justify")}
            title="Justify"
            disabled={!focusedFieldId}
            className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-40 ${
              currentOverride.alignment === "justify"
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* Font Color */}
        <ColorPicker
          value={currentOverride.color || resume.formatting.bodyColor || "#1E293B"}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
}
