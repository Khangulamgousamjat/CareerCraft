"use client";

import React, { useEffect, useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { HeaderBlock } from "./HeaderBlock";
import { SummaryBlock } from "./SummaryBlock";
import { SkillsBlock } from "./SkillsBlock";
import { ExperienceBlock } from "./ExperienceBlock";
import { ProjectsBlock } from "./ProjectsBlock";
import { EducationBlock } from "./EducationBlock";
import { CertificationsBlock } from "./CertificationsBlock";
import { getFontFamilyCss } from "@/utils/formatting";
import { A4_WIDTH_PX, A4_HEIGHT_PX, A4_PAGE_PADDING_Y_PX, A4_USABLE_HEIGHT_PX } from "@/utils/pagination";
import { AlertTriangle } from "lucide-react";

export function ResumePage() {
  const { resume, setFocusedFieldId, setContentHeight, resumeNodeRef } = useResume();
  const contentInnerRef = useRef<HTMLDivElement | null>(null);

  const { personal, summary, skills, experience, projects, education, certifications, formatting } = resume;
  const fontFamilyCss = getFontFamilyCss(formatting.fontFamily);

  // Measure content height continuously
  useEffect(() => {
    const measureHeight = () => {
      if (contentInnerRef.current) {
        const height = contentInnerRef.current.scrollHeight;
        setContentHeight(height);
      }
    };

    measureHeight();

    const observer = new ResizeObserver(() => {
      measureHeight();
    });

    if (contentInnerRef.current) {
      observer.observe(contentInnerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [resume, setContentHeight]);

  const handleSelectField = (fieldId: string) => {
    setFocusedFieldId(fieldId);
  };

  return (
    <div className="relative flex justify-center w-full py-4">
      {/* 
        The Fixed-Aspect Single-Page A4 Container 
        This is the single source of truth for on-screen live preview, 
        PDF export capture, and high-res PNG/JPG canvas rendering.
      */}
      <div
        ref={resumeNodeRef}
        id="careercraft-a4-page"
        data-testid="a4-resume-page"
        className="relative bg-white text-slate-900 shadow-2xl transition-all duration-150 select-text overflow-hidden"
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          minWidth: `${A4_WIDTH_PX}px`,
          minHeight: `${A4_HEIGHT_PX}px`,
          maxWidth: `${A4_WIDTH_PX}px`,
          maxHeight: `${A4_HEIGHT_PX}px`,
          boxSizing: "border-box",
          padding: "24px 34px",
          fontFamily: fontFamilyCss,
          color: formatting.bodyColor || "#1E293B",
          backgroundColor: "#FFFFFF", // Strictly white regardless of dark mode
        }}
      >
        {/* Measured Content Container */}
        <div ref={contentInnerRef} className="w-full flex flex-col justify-start">
          {/* Section 1: Header */}
          <HeaderBlock
            personal={personal}
            formatting={formatting}
            onSelectField={handleSelectField}
          />

          {/* Section 2: Summary */}
          <SummaryBlock
            summary={summary}
            formatting={formatting}
            onSelectField={handleSelectField}
          />

          {/* Section 3: Technical Skills */}
          <SkillsBlock
            skills={skills}
            formatting={formatting}
            onSelectField={handleSelectField}
          />

          {/* Section 4: Work Experience */}
          <ExperienceBlock
            experience={experience}
            formatting={formatting}
            onSelectField={handleSelectField}
          />

          {/* Section 5: Projects */}
          <ProjectsBlock
            projects={projects}
            formatting={formatting}
            onSelectField={handleSelectField}
          />

          {/* Section 6: Education */}
          <EducationBlock
            education={education}
            formatting={formatting}
            onSelectField={handleSelectField}
          />

          {/* Section 7: Certifications */}
          <CertificationsBlock
            certifications={certifications}
            formatting={formatting}
            onSelectField={handleSelectField}
          />
        </div>
      </div>
    </div>
  );
}
