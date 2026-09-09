"use client";

import React from "react";
import { ProjectItem, ResumeFormatting } from "@/types/resume";

interface ProjectsBlockProps {
  projects: ProjectItem[];
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function ProjectsBlock({ projects, formatting, onSelectField }: ProjectsBlockProps) {
  const activeProjects = projects.filter((p) => p.name);
  if (activeProjects.length === 0) return null;

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
        Key Projects
      </h2>
      <div className="space-y-1.5">
        {activeProjects.map((proj) => {
          const fieldId = `projects.${proj.id}`;
          const override = formatting.textOverrides?.[fieldId];

          return (
            <div
              key={proj.id}
              onClick={() => onSelectField?.(fieldId)}
              className="cursor-pointer"
            >
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
                    {proj.name}
                  </span>
                  {proj.technologies && (
                    <span
                      className="font-medium ml-1.5 italic"
                      style={{
                        color: accentColor,
                        fontSize: `${(formatting.baseFontSize || 10) * 0.88}pt`,
                      }}
                    >
                      ({proj.technologies})
                    </span>
                  )}
                </div>
                {(proj.startDate || proj.endDate) && (
                  <span
                    className="text-right font-medium opacity-80 shrink-0 ml-2"
                    style={{
                      color: bodyColor,
                      fontSize: `${(formatting.baseFontSize || 10) * 0.85}pt`,
                    }}
                  >
                    {proj.startDate} {proj.startDate && proj.endDate && "–"} {proj.endDate}
                  </span>
                )}
              </div>

              {proj.bullets && proj.bullets.length > 0 && (
                <ul
                  className="list-disc list-outside ml-4 mt-0.5 space-y-0.5"
                  style={{
                    fontSize: `${(formatting.baseFontSize || 10) * 0.92}pt`,
                    lineHeight: lineSpacing,
                    color: override?.color || bodyColor,
                    textAlign: override?.alignment || formatting.bodyAlignment || "justify",
                    textJustify: "inter-word",
                    textAlignLast: "left",
                  }}
                >
                  {proj.bullets
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
