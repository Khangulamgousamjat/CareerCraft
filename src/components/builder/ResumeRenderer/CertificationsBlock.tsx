"use client";

import React from "react";
import { CertificationItem, ResumeFormatting } from "@/types/resume";

interface CertificationsBlockProps {
  certifications: CertificationItem[];
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function CertificationsBlock({
  certifications,
  formatting,
  onSelectField,
}: CertificationsBlockProps) {
  const activeCerts = certifications.filter((c) => c.name);
  if (activeCerts.length === 0) return null;

  const { accentColor, headingColor, bodyColor, sectionSpacing = 10, lineSpacing = 1.25 } = formatting;

  return (
    <section className="mb-1" style={{ marginBottom: `${sectionSpacing}px` }}>
      <h2
        className="font-bold uppercase tracking-wider border-b pb-0.5 mb-1"
        style={{
          color: headingColor,
          borderColor: accentColor,
          fontSize: `${(formatting.baseFontSize || 10) * 0.95}pt`,
        }}
      >
        Certifications
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5"
        style={{
          fontSize: `${(formatting.baseFontSize || 10) * 0.92}pt`,
          lineHeight: lineSpacing,
          color: bodyColor,
        }}
      >
        {activeCerts.map((cert) => {
          const fieldId = `certifications.${cert.id}`;
          const override = formatting.textOverrides?.[fieldId];

          return (
            <div
              key={cert.id}
              onClick={() => onSelectField?.(fieldId)}
              className="flex items-baseline gap-1 cursor-pointer"
            >
              <span className="opacity-60">•</span>
              <span
                className="font-semibold"
                style={{
                  color: override?.color || headingColor,
                  fontWeight: override?.bold !== undefined ? (override.bold ? 800 : 400) : 600,
                  fontStyle: override?.italic ? "italic" : "normal",
                }}
              >
                {cert.name}
              </span>
              {cert.provider && (
                <span className="opacity-80 ml-0.5" style={{ color: accentColor }}>
                  ({cert.provider})
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
