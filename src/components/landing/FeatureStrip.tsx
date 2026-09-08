import React from "react";
import { UserX, FileCheck2, Download, ShieldCheck } from "lucide-react";

export function FeatureStrip() {
  const features = [
    {
      icon: <UserX className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "No Login Required",
      description: "Jump straight into building. No account setup, passwords, or paywalls ever.",
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "One-Page, Always",
      description: "Real-time overflow detection stops multi-page spills. Guaranteed 1-page A4 format.",
    },
    {
      icon: <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Export 4 Formats",
      description: "Pixel-accurate PDF, editable Word (DOCX), and crisp high-resolution PNG & JPG.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "100% Private & Local",
      description: "Continuous autosave directly to your browser. Your data never leaves your device.",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col p-5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
