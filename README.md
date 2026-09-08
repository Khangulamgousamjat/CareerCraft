# 📄 CareerCraft — Strictly One-Page Resume Builder

A no-login, single-page (A4) resume builder where users fill out structured fields, see a live pixel-accurate preview, format typography & colors, and download pixel-identical exports in PDF, Word (DOCX), PNG, and JPG.

---

## ✨ Features

- **No Login Required**: Zero signup, accounts, or payment barriers. Jump directly into building.
- **Strictly Single-Page (A4)**: Real-time overflow detection stops multi-page spills with a live Page Usage meter and Auto-Fit engine.
- **Quad-Format Exports**:
  - **PDF**: Single-page A4 PDF matching on-screen design pixel-for-pixel using `html-to-image` and `jsPDF`.
  - **Word (DOCX)**: Real, editable structured Word document with genuine headings, colors, and bullet points using `docx`.
  - **PNG / JPG**: Ultra-crisp high-resolution raster print graphics (2.5x–3x pixel scale).
- **Continuous Live Preview**: Instant updates on the fixed-aspect A4 canvas as you type.
- **Local Persistence**: Debounced autosave (600ms) to browser `localStorage` with automatic restore.
- **Curated Formatting**: Scoped formatting toolbar (size, bold, italic, underline, alignment, color) + document-level design controls (Inter, Georgia, Garamond, Roboto, Merriweather).
- **Independent Resume Theme**: Website chrome supports Light/Dark mode while the A4 resume sheet remains pure white and print-ready.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Next.js 15 (App Router, `src/` directory)
- **Language**: TypeScript (strict types, zero `any`)
- **Styling**: Tailwind CSS + Custom CSS Variables design token system
- **Icons**: Lucide React
- **Export Engines**: `html-to-image`, `jspdf`, `docx`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 👨‍💻 Author & Repository

- **Created by**: **Gous Khan**
- **GitHub Profile**: [@Khangulamgousamjat](https://github.com/Khangulamgousamjat)
- **Repository**: [CareerCraft on GitHub](https://github.com/Khangulamgousamjat/CareerCraft.git)

```bash
git clone https://github.com/Khangulamgousamjat/CareerCraft.git
```

---

## 📄 License

MIT License.
