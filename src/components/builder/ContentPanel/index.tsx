"use client";

import React, { useState } from "react";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { SkillsForm } from "./SkillsForm";
import { ExperienceForm } from "./ExperienceForm";
import { ProjectsForm } from "./ProjectsForm";
import { EducationForm } from "./EducationForm";
import { CertificationsForm } from "./CertificationsForm";
import {
  User,
  FileText,
  Wrench,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useResume } from "@/context/ResumeContext";

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export function ContentPanel() {
  const { resume } = useResume();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    skills: true,
    experience: true,
    projects: false,
    education: false,
    certifications: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections: SectionConfig[] = [
    {
      id: "personal",
      title: "1. Personal Information",
      icon: <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <PersonalInfoForm />,
    },
    {
      id: "summary",
      title: "2. Professional Summary",
      icon: <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <SummaryForm />,
    },
    {
      id: "skills",
      title: "3. Technical Skills",
      icon: <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <SkillsForm />,
    },
    {
      id: "experience",
      title: "4. Work Experience",
      icon: <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <ExperienceForm />,
    },
    {
      id: "projects",
      title: "5. Key Projects",
      icon: <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <ProjectsForm />,
    },
    {
      id: "education",
      title: "6. Education",
      icon: <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <EducationForm />,
    },
    {
      id: "certifications",
      title: "7. Certifications",
      icon: <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      component: <CertificationsForm />,
    },
  ];

  return (
    <div className="space-y-3 pb-8">
      {sections.map((sec) => {
        const isOpen = !!openSections[sec.id];

        return (
          <div
            key={sec.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all duration-150"
          >
            {/* Section Accordion Trigger */}
            <button
              type="button"
              onClick={() => toggleSection(sec.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                  {sec.icon}
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {sec.title}
                </span>
              </div>
              <div className="text-slate-400">
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Section Content */}
            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in-50 duration-150">
                {sec.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
