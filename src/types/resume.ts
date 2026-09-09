export type PhotoShape = "rectangle" | "circle" | "rounded" | "original";

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
  photo?: {
    dataUrl: string;
    rawUrl?: string;
    shape?: PhotoShape;
  };
}

export interface SkillCategory {
  id?: string;
  category: string; // e.g. "Languages", "Frontend", "AI & ML"
  items: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string; // supports "Present"
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  provider?: string;
}

export type TextAlignment = "left" | "center" | "right" | "justify";

export interface TextFormatOverride {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  alignment?: TextAlignment;
  fontSizeDelta?: number; // relative pt/px delta
}

export interface ResumeFormatting {
  fontFamily: string;
  baseFontSize: number; // in pt (e.g. 10.5) or px (e.g. 14)
  accentColor: string;
  headingColor: string;
  bodyColor: string;
  pageSize: "A4";
  lineSpacing?: number; // scale multiplier e.g. 1.25
  sectionSpacing?: number; // px margin bottom e.g. 12
  bodyAlignment?: TextAlignment; // defaults to "justify"
  textOverrides?: Record<string, TextFormatOverride>;
}

export interface Resume {
  personal: PersonalInfo;
  summary: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  formatting: ResumeFormatting;
}
