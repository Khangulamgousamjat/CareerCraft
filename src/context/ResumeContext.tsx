"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Resume,
  PersonalInfo,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  ResumeFormatting,
  TextFormatOverride,
} from "@/types/resume";
import {
  DEFAULT_RESUME,
  loadResumeFromStorage,
  saveResumeToStorage,
  clearResumeStorage,
} from "@/utils/storage";
import { getAutoFitFormatting } from "@/utils/pagination";

export interface ResumeContextType {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
  updatePersonal: <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => void;
  updateSummary: (summary: string) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateExperience: (experience: ExperienceItem[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateEducation: (education: EducationItem[]) => void;
  updateCertifications: (certifications: CertificationItem[]) => void;
  updateFormatting: (formatting: Partial<ResumeFormatting>) => void;
  updateTextOverride: (fieldId: string, override: Partial<TextFormatOverride>) => void;
  autoFit: () => void;
  clearResume: () => void;
  loadSampleResume: () => void;
  // UI states
  isEditingFormat: boolean;
  setIsEditingFormat: (editing: boolean) => void;
  focusedFieldId: string | null;
  setFocusedFieldId: (id: string | null) => void;
  contentHeight: number;
  setContentHeight: (height: number) => void;
  resumeNodeRef: React.RefObject<HTMLDivElement | null>;
  isSaving: boolean;
  lastSaved: Date | null;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume>(DEFAULT_RESUME);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [isEditingFormat, setIsEditingFormat] = useState(false);
  const [focusedFieldId, setFocusedFieldId] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const resumeNodeRef = useRef<HTMLDivElement | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial resume from local storage
  useEffect(() => {
    const saved = loadResumeFromStorage();
    setResume(saved);
    setIsInitialized(true);
    setLastSaved(new Date());
  }, []);

  // Debounced autosave whenever resume changes
  useEffect(() => {
    if (!isInitialized) return;

    setIsSaving(true);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      saveResumeToStorage(resume);
      setIsSaving(false);
      setLastSaved(new Date());
    }, 600);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [resume, isInitialized]);

  const updatePersonal = useCallback(
    <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
      setResume((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          [field]: value,
        },
      }));
    },
    []
  );

  const updateSummary = useCallback((summary: string) => {
    setResume((prev) => ({ ...prev, summary }));
  }, []);

  const updateSkills = useCallback((skills: SkillCategory[]) => {
    setResume((prev) => ({ ...prev, skills }));
  }, []);

  const updateExperience = useCallback((experience: ExperienceItem[]) => {
    setResume((prev) => ({ ...prev, experience }));
  }, []);

  const updateProjects = useCallback((projects: ProjectItem[]) => {
    setResume((prev) => ({ ...prev, projects }));
  }, []);

  const updateEducation = useCallback((education: EducationItem[]) => {
    setResume((prev) => ({ ...prev, education }));
  }, []);

  const updateCertifications = useCallback((certifications: CertificationItem[]) => {
    setResume((prev) => ({ ...prev, certifications }));
  }, []);

  const updateFormatting = useCallback((partial: Partial<ResumeFormatting>) => {
    setResume((prev) => ({
      ...prev,
      formatting: {
        ...prev.formatting,
        ...partial,
      },
    }));
  }, []);

  const updateTextOverride = useCallback(
    (fieldId: string, override: Partial<TextFormatOverride>) => {
      setResume((prev) => {
        const existing = prev.formatting.textOverrides?.[fieldId] || {};
        return {
          ...prev,
          formatting: {
            ...prev.formatting,
            textOverrides: {
              ...(prev.formatting.textOverrides || {}),
              [fieldId]: { ...existing, ...override },
            },
          },
        };
      });
    },
    []
  );

  const autoFit = useCallback(() => {
    const measuredHeight =
      contentHeight > 0
        ? contentHeight
        : resumeNodeRef.current
        ? resumeNodeRef.current.scrollHeight - 48
        : 0;

    setResume((prev) => ({
      ...prev,
      formatting: getAutoFitFormatting(prev.formatting, measuredHeight),
    }));
  }, [contentHeight]);

  const clearResume = useCallback(() => {
    const blankResume: Resume = {
      personal: {
        name: "",
        title: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        portfolio: "",
        location: "",
      },
      summary: "",
      skills: [{ id: "skill-0", category: "Technical Skills", items: [] }],
      experience: [],
      projects: [],
      education: [],
      certifications: [],
      formatting: {
        fontFamily: "Inter",
        baseFontSize: 10,
        accentColor: "#2563EB",
        headingColor: "#0B132B",
        bodyColor: "#1E293B",
        pageSize: "A4",
        lineSpacing: 1.25,
        sectionSpacing: 10,
        textOverrides: {},
      },
    };
    setResume(blankResume);
    clearResumeStorage();
  }, []);

  const loadSampleResume = useCallback(() => {
    setResume(DEFAULT_RESUME);
    saveResumeToStorage(DEFAULT_RESUME);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updatePersonal,
        updateSummary,
        updateSkills,
        updateExperience,
        updateProjects,
        updateEducation,
        updateCertifications,
        updateFormatting,
        updateTextOverride,
        autoFit,
        clearResume,
        loadSampleResume,
        isEditingFormat,
        setIsEditingFormat,
        focusedFieldId,
        setFocusedFieldId,
        contentHeight,
        setContentHeight,
        resumeNodeRef,
        isSaving,
        lastSaved,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
