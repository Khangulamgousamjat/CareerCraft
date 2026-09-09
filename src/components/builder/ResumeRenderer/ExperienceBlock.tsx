"use client";

import React from "react";
import { ExperienceItem, ResumeFormatting } from "@/types/resume";

interface ExperienceBlockProps {
  experience: ExperienceItem[];
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function ExperienceBlock({ experience, formatting, onSelectField }: ExperienceBlockProps) {
  const activeExp = experience.filter((e) => e.company || e.position);
  if (activeExp.length === 0) return null;

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
        Work Experience
      </h2>
      <div className="space-y-1.5">
        {activeExp.map((item) => {
          const fieldId = `experience.${item.id}`;
          const override = formatting.textOverrides?.[fieldId];

          return (
            <div
              key={item.id}
              onClick={() => onSelectField?.(fieldId)}
              className="cursor-pointer"
            >
              {/* Role and Company header */}
              <div
                className="flex items-baseline justify-between"
                style={{
                  fontSize: `${(formatting.baseFontSize || 10) * 0.98}pt`,
                }}
              >
                <div>
                  <span
                    className="font-bold"
                    style={{
                      color: headingColor,
                      fontWeight: override?.bold !== undefined ? (override.bold ? 800 : 400) : 700,
                      fontStyle: override?.italic ? "italic" : "normal",
                    }}
                  >
                    {item.position || "Position"}
                  </span>
                  {item.company && (
                    <span
                      className="font-semibold ml-1.5"
                      style={{ color: accentColor }}
                    >
                      | {item.company}
                    </span>
                  )}
                </div>
                {(item.startDate || item.endDate) && (
                  <span
                    className="text-right font-medium opacity-80 shrink-0 ml-2"
                    style={{
                      color: bodyColor,
                      fontSize: `${(formatting.baseFontSize || 10) * 0.85}pt`,
                    }}
                  >
                    {item.startDate} {item.startDate && item.endDate && "–"} {item.endDate}
                  </span>
                )}
              </div>

              {/* Bullet points */}
              {item.bullets && item.bullets.length > 0 && (
                <ul
                  className="list-disc list-outside ml-4 mt-0.5 space-y-0.5"
                  style={{
                    fontSize: `${(formatting.baseFontSize || 10) * 0.92}pt`,
                    lineHeight: lineSpacing,
                    color: override?.color || bodyColor,
                    textAlign: override?.alignment || formatting.bodyAlignment || "justify",
                    textJustify: "inter-word",
                    textAlignLast: "left",
                    textDecoration: override?.underline ? "underline" : "none",
                  }}
                >
                  {item.bullets
                    .filter((b) => b.trim().length > 0)
                    .map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
