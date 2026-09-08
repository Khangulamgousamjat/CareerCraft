import { Resume } from "@/types/resume";

export const STORAGE_KEY = "careercraft_resume_v1";

export const DEFAULT_RESUME: Resume = {
  personal: {
    name: "Alex Morgan",
    title: "Senior Full-Stack Engineer",
    phone: "+1 (555) 234-5678",
    email: "alex.morgan@email.com",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan",
    portfolio: "alexmorgan.io",
    location: "San Francisco, CA",
  },
  summary:
    "Results-driven Senior Full-Stack Engineer with 6+ years of experience designing and scaling fault-tolerant web architectures and high-throughput APIs. Spearheaded cloud microservices migrations reducing latency by 35% while mentoring engineering squads in TypeScript, Next.js, and distributed cloud systems.",
  skills: [
    {
      id: "skill-1",
      category: "Languages & Core",
      items: ["TypeScript", "JavaScript (ES6+)", "Python", "Go", "SQL", "HTML5/CSS3"],
    },
    {
      id: "skill-2",
      category: "Frontend Frameworks",
      items: ["React", "Next.js", "Tailwind CSS", "Redux Toolkit", "Vue.js", "WebSockets"],
    },
    {
      id: "skill-3",
      category: "Backend & Cloud",
      items: ["Node.js", "Express", "PostgreSQL", "Redis", "AWS (ECS, S3, Lambda)", "Docker"],
    },
    {
      id: "skill-4",
      category: "DevOps & Tooling",
      items: ["CI/CD (GitHub Actions)", "Jest", "Playwright", "Terraform", "GraphQL", "Git"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Starlight Technologies",
      position: "Lead Software Engineer",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Architected and deployed a low-latency real-time collaborative workspace supporting 180K+ DAU using Next.js, WebSockets, and Redis pub/sub.",
        "Optimized database query throughput and cache layers in PostgreSQL, reducing average P99 API response times from 420ms to 85ms.",
        "Championed engineering best practices across 12 engineers, introducing end-to-end automated testing pipelines that cut production defects by 42%.",
      ],
    },
    {
      id: "exp-2",
      company: "Nexus Cloud Solutions",
      position: "Senior Full-Stack Developer",
      startDate: "2019",
      endDate: "2022",
      bullets: [
        "Engineered multi-tenant billing and subscription integration with Stripe, processing over $4.2M in annual recurring revenue with 99.98% reliability.",
        "Built responsive component design system adopted across 4 internal product suites, reducing frontend feature delivery cycle time by 30%.",
        "Migrated monolithic backend endpoints into containerized microservices on AWS ECS, slashing server infrastructure overhead by 28%.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseMetrics — Distributed APM Telemetry Dashboard",
      technologies: "Next.js, TypeScript, Go, ClickHouse, Apache Kafka",
      startDate: "2023",
      endDate: "2024",
      bullets: [
        "Constructed an open-source analytics dashboard processing 50M+ daily events with sub-second aggregate queries.",
        "Integrated real-time threshold alert notifications through Webhooks and Slack, earning 1,400+ stars on GitHub.",
      ],
    },
    {
      id: "proj-2",
      name: "FlowScript — Visual Workflow Automation Engine",
      technologies: "React, Node.js, WebAssembly, PostgreSQL",
      startDate: "2022",
      endDate: "2023",
      bullets: [
        "Designed a node-based drag-and-drop automation builder executing complex multi-step webhooks with zero cold-start lag.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science (Honors)",
      institution: "University of California, Berkeley",
      startDate: "2015",
      endDate: "2019",
      grade: "3.85 GPA",
      details: "Focus on Distributed Systems, Algorithms, and Software Architecture",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      provider: "Amazon Web Services",
    },
    {
      id: "cert-2",
      name: "Meta Certified Front-End Developer",
      provider: "Meta",
    },
  ],
  formatting: {
    fontFamily: "Inter",
    baseFontSize: 10,
    accentColor: "#2563EB", // Power Blue
    headingColor: "#0B132B", // Dark Navy
    bodyColor: "#1E293B", // Slate/Near Black
    pageSize: "A4",
    lineSpacing: 1.25,
    sectionSpacing: 10,
    textOverrides: {},
  },
};

export function loadResumeFromStorage(): Resume {
  if (typeof window === "undefined") {
    return DEFAULT_RESUME;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RESUME;
    const parsed = JSON.parse(raw);
    // Basic sanity checks
    if (!parsed || !parsed.personal || !parsed.formatting) {
      return DEFAULT_RESUME;
    }
    return parsed;
  } catch (err) {
    console.warn("Failed to load resume from localStorage, using default", err);
    return DEFAULT_RESUME;
  }
}

export function saveResumeToStorage(resume: Resume): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  } catch (err) {
    console.error("Failed to save resume to localStorage", err);
  }
}

export function clearResumeStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear resume storage", err);
  }
}
