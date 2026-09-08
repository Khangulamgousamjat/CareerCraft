"use client";

import React, { useState } from "react";
import { Check, Pipette } from "lucide-react";
import { SWATCH_COLORS } from "@/utils/formatting";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempHex, setTempHex] = useState(value);

  const curatedSwatches = [
    { name: "Black", hex: "#000000" },
    { name: "Dark Navy", hex: "#0B132B" },
    { name: "Royal Blue", hex: "#1E40AF" },
    { name: "Power Blue", hex: "#2563EB" },
    { name: "Cool Gray", hex: "#64748B" },
    { name: "Pure White", hex: "#FFFFFF" },
  ];

  const handleApply = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs cursor-pointer"
        >
          <span
            className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shadow-inner shrink-0"
            style={{ backgroundColor: value }}
          />
          <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 uppercase">
            {value}
          </span>
        </button>
        {label && (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {label}
          </span>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Preset Swatches
            </div>
            <div className="grid grid-cols-6 gap-1.5 mb-3">
              {curatedSwatches.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  title={swatch.name}
                  onClick={() => {
                    setTempHex(swatch.hex);
                    handleApply(swatch.hex);
                  }}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: swatch.hex }}
                >
                  {value.toLowerCase() === swatch.hex.toLowerCase() && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        swatch.hex === "#FFFFFF" ? "text-slate-900" : "text-white"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Custom Color
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <input
                  type="color"
                  value={tempHex}
                  onChange={(e) => setTempHex(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer p-0 bg-transparent"
                />
              </div>
              <input
                type="text"
                value={tempHex}
                onChange={(e) => setTempHex(e.target.value)}
                placeholder="#000000"
                className="flex-1 text-xs font-mono px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleApply(tempHex)}
                className="px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
