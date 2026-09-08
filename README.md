<div align="center">

# 📄 CareerCraft

### The Precision Single-Page (A4) Resume Engine

[![GitHub stars](https://img.shields.io/github/stars/Khangulamgousamjat/CareerCraft?style=for-the-badge&logo=github&color=2563EB&labelColor=0B132B)](https://github.com/Khangulamgousamjat/CareerCraft/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=2563EB&labelColor=0B132B)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  A modern, zero-friction, client-side resume builder engineered strictly for <b>one-page A4 compliance</b>.<br />
  No login required. Continuous live preview. Pixel-accurate exports to <b>PDF, Word (DOCX), PNG, and JPG</b>.
</p>

---

### ⭐ Show Your Support
If you find CareerCraft useful or inspiring, please consider giving the repository a **Star**! It helps support ongoing development and feature additions.

[**⭐ Star CareerCraft on GitHub**](https://github.com/Khangulamgousamjat/CareerCraft)

---

</div>

## 🌟 Overview

Most resume builders either lock essential exports behind paywalls, force user registrations, or allow silent overflow into an awkward second page. 

**CareerCraft** solves this with a purpose-built digital engineering approach:
- **Strictly One Page**: Continuously measures rendered content against printable A4 bounds (1050px usable height) with real-time usage metrics and an intelligent **Auto-Fit engine**.
- **Quad-Format Exports**: One single source of truth rendered into print-quality PDF, structured editable Word (DOCX), and crisp high-resolution PNG & JPG graphics.
- **Zero Friction**: No accounts, no subscriptions, and 100% private. All resume data is auto-saved locally in your browser.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🛡️ **Zero Login & 100% Private** | Instant access. No signup, no passwords, no trackers. Your resume data never leaves your computer. |
| 📏 **Strict One-Page Enforcement** | Live Page Usage meter tracks content height against A4 printable limits. Auto-Fit steps down font sizes and spacing gracefully. |
| ⚡ **Continuous Live Preview** | Immediate visual feedback with <100ms perceived latency on a fixed 794 × 1123 px canvas with viewport zoom controls. |
| 🖨️ **Quad-Format Export Engine** | **PDF** (vector-accurate A4), **DOCX** (real editable Microsoft Word elements), **PNG** (2.5x print raster), and **JPG**. |
| 🎨 **Design System & Theme Isolation** | Sleek Light & Dark website chrome, while the resume document remains printable white and independent. |
| ✍️ **Focused Formatting Toolbar** | Clean form entry by default; toggle on-demand toolbar for font sizes, bold, italic, underline, alignment, and swatches. |
| 🔄 **Autosave & Local Persistence** | Debounced (600ms) persistence to `localStorage` with safety confirmation for clearing data. |

---

## 🏗️ Architecture & Single Source of Truth

CareerCraft unifies data entry, preview rendering, and export serialization under one single source of truth:

```
                      ┌───────────────────────────┐
                      │    Resume Data Model      │
                      │ (Strict TypeScript State) │
                      └─────────────┬─────────────┘
                                    │
                                    ▼
                      ┌───────────────────────────┐
                      │    A4 Resume Renderer     │
                      │  (Fixed 794 × 1123 px)    │
                      └──────┬──────┬──────┬──────┘
                             │      │      │      │
         ┌───────────────────┘      │      │      └───────────────────┐
         ▼                          ▼      ▼                          ▼
   Live Preview               PDF Export  PNG & JPG Export      DOCX Export
 (Scaled A4 Canvas)           (jsPDF +    (High-Res Canvas      (Structured
                             html2image)   Rasterization)        Paragraphs)
```

### Fixed Structure Order
To guarantee export fidelity and recruiter-grade presentation, sections follow an optimal, fixed architectural hierarchy:
1. **Candidate Header** — Name, Professional Title, Location, Phone, Email, Portfolio, LinkedIn, GitHub
2. **Professional Summary** — Concise executive elevator pitch with live word counter
3. **Technical Skills Matrix** — Categorized groupings with dynamic skill chip tags
4. **Work Experience** — Role, Company, Date range with "Present" support, and bulleted metrics
5. **Key Projects** — Project title, technology stack badges, and quantifiable outcomes
6. **Education** — Degree, Institution, Graduation date, Grade / GPA, and coursework details
7. **Certifications** — Credential name and issuing organization

---

## 🎨 Design Tokens & Typography

- **Brand Palette (Website Chrome)**:
  - **Light Mode**: Ice White (`#F7FAFF`), Power Blue (`#2563EB`), Royal Blue (`#1E40AF`), Dark Navy (`#0B132B`), Pure White (`#FFFFFF`).
  - **Dark Mode**: Dark Navy (`#0B132B`), Dark Blue surfaces (`#132238`), Power Blue (`#3B82F6`), Slate Muted (`#94A3B8`).
- **Document Typography**: Curated font pairings engineered for ATS readability:
  - `Inter` (Modern Clean Sans)
  - `Georgia` (Classic Editorial Serif)
  - `Garamond` (Distinguished Executive Serif)
  - `Roboto` (Neutral Technical Sans)
  - `Merriweather` (Warm Literary Serif)

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, zero `any`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Custom Properties Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Engine**: `html-to-image` + `jspdf`
- **DOCX Engine**: `docx`
- **Rasterization**: `html-to-image` (Canvas high-DPI pipeline)

---

## 👨‍💻 Author & Creator

<div align="center">

### **Gous Khan**
Full-Stack Software Developer & Open Source Enthusiast

[![GitHub Profile](https://img.shields.io/badge/GitHub-@Khangulamgousamjat-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Khangulamgousamjat)
[![Repository](https://img.shields.io/badge/Project_Repo-CareerCraft-2563EB?style=for-the-badge&logo=git&logoColor=white)](https://github.com/Khangulamgousamjat/CareerCraft)

---

### ⭐ Star the Project!
If CareerCraft helped you build an impressive resume, don't forget to **leave a star ⭐ on the repository**!

[**👉 Click here to Star CareerCraft on GitHub**](https://github.com/Khangulamgousamjat/CareerCraft)

</div>

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
