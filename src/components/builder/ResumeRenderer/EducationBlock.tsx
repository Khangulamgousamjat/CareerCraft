"use client";

import React from "react";
import { EducationItem, ResumeFormatting } from "@/types/resume";

interface EducationBlockProps {
  education: EducationItem[];
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function EducationBlock({ education, formatting, onSelectField }: EducationBlockProps) {
  const activeEdu = education.filter((e) => e.degree || e.institution);
  if (activeEdu.length === 0) return null;

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
        Education
      </h2>
      <div className="space-y-1">
        {activeEdu.map((edu) => {
          const fieldId = `education.${edu.id}`;
          const override = formatting.textOverrides?.[fieldId];

          return (
            <div
              key={edu.id}
              onClick={() => onSelectField?.(fieldId)}
              className="cursor-pointer"
            >
              <div
                className="flex items-baseline justify-between"
                style={{
                  fontSize: `${(formatting.baseFontSize || 10) * 0.96}pt`,
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
                    {edu.degree || "Degree"}
                  </span>
                  {edu.institution && (
                    <span className="font-semibold ml-1.5" style={{ color: accentColor }}>
                      — {edu.institution}
                    </span>
                  )}
                  {edu.grade && (
                    <span className="ml-1.5 opacity-75" style={{ color: bodyColor }}>
                      ({edu.grade})
                    </span>
                  )}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span
                    className="text-right font-medium opacity-80 shrink-0 ml-2"
                    style={{
                      color: bodyColor,
                      fontSize: `${(formatting.baseFontSize || 10) * 0.85}pt`,
                    }}
                  >
                    {edu.startDate} {edu.startDate && edu.endDate && "–"} {edu.endDate}
                  </span>
                )}
              </div>
              {edu.details && (
                <p
                  className="mt-0.5"
                  style={{
                    fontSize: `${(formatting.baseFontSize || 10) * 0.88}pt`,
                    lineHeight: lineSpacing,
                    color: override?.color || bodyColor,
                    textAlign: override?.alignment || formatting.bodyAlignment || "justify",
                    textJustify: "inter-word",
                    textAlignLast: "left",
                  }}
                >
                  {edu.details}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
