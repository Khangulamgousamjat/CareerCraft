"use client";

import React from "react";
import { ResumeFormatting } from "@/types/resume";

interface SummaryBlockProps {
  summary: string;
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function SummaryBlock({ summary, formatting, onSelectField }: SummaryBlockProps) {
  if (!summary) return null;

  const { accentColor, headingColor, bodyColor, sectionSpacing = 10, lineSpacing = 1.25, textOverrides } = formatting;
  const override = textOverrides?.["summary"];

  return (
    <section className="mb-2" style={{ marginBottom: `${sectionSpacing}px` }}>
      <h2
        className="font-bold uppercase tracking-wider border-b pb-0.5 mb-1"
        style={{
          color: headingColor,
          borderColor: accentColor,
          fontSize: `${(formatting.baseFontSize || 10) * 0.95}pt`,
        }}
      >
        Professional Summary
      </h2>
      <p
        onClick={() => onSelectField?.("summary")}
        className="cursor-pointer transition-opacity hover:opacity-95"
        style={{
          color: override?.color || bodyColor,
          fontSize: `${(formatting.baseFontSize || 10) + (override?.fontSizeDelta || 0)}pt`,
          lineHeight: lineSpacing,
          fontWeight: override?.bold ? 700 : 400,
          fontStyle: override?.italic ? "italic" : "normal",
          textDecoration: override?.underline ? "underline" : "none",
          textAlign: override?.alignment || formatting.bodyAlignment || "justify",
          textJustify: "inter-word",
          textAlignLast: "left",
        }}
      >
        {summary}
      </p>
    </section>
  );
}
