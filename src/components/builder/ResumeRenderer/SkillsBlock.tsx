"use client";

import React from "react";
import { SkillCategory, ResumeFormatting } from "@/types/resume";

interface SkillsBlockProps {
  skills: SkillCategory[];
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function SkillsBlock({ skills, formatting, onSelectField }: SkillsBlockProps) {
  const activeSkills = skills.filter((s) => s.category && s.items && s.items.length > 0);
  if (activeSkills.length === 0) return null;

  const { accentColor, headingColor, bodyColor, sectionSpacing = 10, lineSpacing = 1.25 } = formatting;

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
        Technical Skills
      </h2>
      <div
        className="space-y-0.5"
        style={{
          fontSize: `${(formatting.baseFontSize || 10) * 0.95}pt`,
          lineHeight: lineSpacing,
          color: bodyColor,
        }}
      >
        {activeSkills.map((cat, idx) => {
          const fieldId = `skills.${cat.id || idx}`;
          const override = formatting.textOverrides?.[fieldId];

          return (
            <div
              key={cat.id || idx}
              onClick={() => onSelectField?.(fieldId)}
              className="flex items-baseline gap-1.5 cursor-pointer"
              style={{
                textAlign: override?.alignment || "left",
              }}
            >
              <span
                className="font-bold shrink-0"
                style={{
                  color: headingColor,
                  fontWeight: override?.bold !== undefined ? (override.bold ? 800 : 400) : 700,
                  fontStyle: override?.italic ? "italic" : "normal",
                  textDecoration: override?.underline ? "underline" : "none",
                }}
              >
                {cat.category}:
              </span>
              <span
                style={{
                  color: override?.color || bodyColor,
                }}
              >
                {cat.items.join(", ")}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
