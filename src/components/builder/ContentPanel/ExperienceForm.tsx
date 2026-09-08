"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { ExperienceItem } from "@/types/resume";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ExperienceForm() {
  const { resume, updateExperience, setFocusedFieldId } = useResume();
  const { experience } = resume;

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "Present",
      bullets: [""],
    };
    updateExperience([...experience, newItem]);
  };

  const handleRemove = (index: number) => {
    updateExperience(experience.filter((_, idx) => idx !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= experience.length) return;
    const updated = [...experience];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateExperience(updated);
  };

  const handleFieldChange = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    updateExperience(updated);
  };

  const handleBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const updated = [...experience];
    const newBullets = [...updated[expIndex].bullets];
    newBullets[bulletIndex] = value;
    updated[expIndex] = { ...updated[expIndex], bullets: newBullets };
    updateExperience(updated);
  };

  const handleAddBullet = (expIndex: number) => {
    const updated = [...experience];
    updated[expIndex] = {
      ...updated[expIndex],
      bullets: [...updated[expIndex].bullets, ""],
    };
    updateExperience(updated);
  };

  const handleRemoveBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...experience];
    const newBullets = updated[expIndex].bullets.filter((_, idx) => idx !== bulletIndex);
    updated[expIndex] = { ...updated[expIndex], bullets: newBullets };
    updateExperience(updated);
  };

  return (
    <div className="space-y-4">
      {experience.map((item, idx) => (
        <div
          key={item.id}
          className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
        >
          {/* Card Header with reorder and delete controls */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              #{idx + 1} {item.position || "New Role"} {item.company ? `at ${item.company}` : ""}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMove(idx, "up")}
                title="Move up"
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={idx === experience.length - 1}
                onClick={() => handleMove(idx, "down")}
                title="Move down"
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                title="Delete experience entry"
                className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Position & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Job Title / Position
              </label>
              <input
                type="text"
                value={item.position}
                onChange={(e) => handleFieldChange(idx, "position", e.target.value)}
                onFocus={() => setFocusedFieldId(`experience.${item.id}`)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={item.company}
                onChange={(e) => handleFieldChange(idx, "company", e.target.value)}
                onFocus={() => setFocusedFieldId(`experience.${item.id}`)}
                placeholder="e.g. Acme Corp"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={item.startDate}
                onChange={(e) => handleFieldChange(idx, "startDate", e.target.value)}
                placeholder="e.g. 2021 or Jan 2021"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  End Date
                </label>
                <button
                  type="button"
                  onClick={() =>
                    handleFieldChange(
                      idx,
                      "endDate",
                      item.endDate === "Present" ? "" : "Present"
                    )
                  }
                  className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                >
                  {item.endDate === "Present" ? "Specify Year" : "Set Present"}
                </button>
              </div>
              <input
                type="text"
                value={item.endDate}
                onChange={(e) => handleFieldChange(idx, "endDate", e.target.value)}
                placeholder="e.g. Present or 2023"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Bullet Points */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Key Responsibilities & Measurable Impact (1–3 bullets recommended)
            </label>
            <div className="space-y-1.5">
              {item.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-1.5">
                  <span className="text-slate-400 mt-1 text-xs">•</span>
                  <textarea
                    rows={2}
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)}
                    placeholder="Describe impact with action verbs and quantifiable results (e.g. Accelerated API response by 35%)..."
                    className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-snug"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx, bIdx)}
                    title="Delete bullet point"
                    className="p-1 text-slate-400 hover:text-red-500 cursor-pointer mt-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddBullet(idx)}
              className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add bullet
            </button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleAddExperience}
        className="w-full text-xs font-semibold py-2 cursor-pointer border-dashed"
        leftIcon={<Plus className="w-3.5 h-3.5" />}
      >
        Add Work Experience
      </Button>
    </div>
  );
}
