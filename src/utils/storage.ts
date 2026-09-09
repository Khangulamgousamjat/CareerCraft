import { Resume } from "@/types/resume";

export const STORAGE_KEY = "careercraft_resume_v1";

export const DEFAULT_RESUME: Resume = {
  personal: {
    name: "Rohit Sharma",
    title: "Lead Technical Architect & Engineering Lead",
    phone: "+91 98200 45264",
    email: "rohit.sharma@techlead.io",
    linkedin: "linkedin.com/in/rohitsharma-tech",
    github: "github.com/rohitsharma-lead",
    portfolio: "rohitsharma.dev",
    location: "Mumbai, India",
  },
  summary:
    "Strategic Lead Technical Architect and Engineering Captain with 8+ years of experience spearheading distributed cloud systems, high-throughput microservices, and high-performance engineering squads. Renowned for calm leadership under high pressure, architecting fault-tolerant distributed systems handling 150M+ real-time events with 99.999% availability, and driving high-impact technical roadmaps from conception to global scale.",
  skills: [
    {
      id: "skill-1",
      category: "Architecture & Systems",
      items: ["Distributed Systems", "Cloud Microservices", "High Availability", "Event-Driven Systems", "Scalability", "System Resilience"],
    },
    {
      id: "skill-2",
      category: "Languages & Frameworks",
      items: ["TypeScript", "Python", "Go", "Java", "SQL", "Next.js / React", "Node.js"],
    },
    {
      id: "skill-3",
      category: "Cloud & Infrastructure",
      items: ["AWS (EKS, ECS, Lambda)", "Docker & Kubernetes", "Apache Kafka", "PostgreSQL", "Redis", "Terraform"],
    },
    {
      id: "skill-4",
      category: "Engineering Leadership",
      items: ["Squad Mentorship", "High-Pressure Delivery", "Agile Captaincy", "CI/CD & DevOps", "Performance Optimization", "Root Cause Analysis"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Mumbai TechWorks",
      position: "Lead Technical Architect & Engineering Captain",
      startDate: "2021",
      endDate: "Present",
      bullets: [
        "Architected and captained the delivery of a mission-critical distributed platform scaling to 150M+ active users during peak global events with 99.999% uptime.",
        "Led a cross-functional squad of 15+ senior engineers, driving 5 major enterprise releases on schedule with record zero-defect production deliveries.",
        "Pioneered adaptive caching and event-driven streaming using Kafka & Redis, slashing P99 API latency by 45% and saving $480K in annual cloud infrastructure costs.",
      ],
    },
    {
      id: "exp-2",
      company: "Apex Cloud Solutions",
      position: "Senior Full-Stack & Systems Engineer",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "Engineered high-concurrency payment gateway infrastructure processing ₹250Cr+ in monthly transactions with automated fraud-detection telemetry.",
        "Introduced automated CI/CD deployment pipelines and automated load testing, reducing engineering delivery cycle time from 3 weeks to 4 days.",
        "Mentored junior and mid-level developers in cloud-native paradigms, clean code patterns, and distributed fault tolerance.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Hitman — High-Concurrency Distributed Stream Engine",
      technologies: "Go, Apache Kafka, Redis, ClickHouse, Docker",
      startDate: "2023",
      endDate: "2024",
      bullets: [
        "Constructed an open-source real-time event pipeline processing 264K+ events/sec with sub-5ms latency and zero dropped packets.",
        "Featured on GitHub trending with 2,400+ stars; adopted by 10+ enterprise teams for real-time telemetry and monitoring.",
      ],
    },
    {
      id: "proj-2",
      name: "CenturyOps — Automated SRE Incident Playbook Platform",
      technologies: "Next.js, TypeScript, Node.js, Python, AWS",
      startDate: "2022",
      endDate: "2023",
      bullets: [
        "Engineered automated root-cause diagnosis engine that decreased Mean Time to Recovery (MTTR) by 62% during high-traffic surges.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science & Engineering",
      institution: "University of Mumbai",
      startDate: "2014",
      endDate: "2018",
      grade: "First Class with Distinction (8.9 CGPA)",
      details: "Specialization in Distributed Algorithms, Software Architecture, and Database Systems",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Professional",
      provider: "Amazon Web Services",
    },
    {
      id: "cert-2",
      name: "Google Cloud Certified Professional Cloud Architect",
      provider: "Google Cloud",
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
    bodyAlignment: "justify",
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
