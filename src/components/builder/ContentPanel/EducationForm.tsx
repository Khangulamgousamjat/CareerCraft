"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { EducationItem } from "@/types/resume";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EducationForm() {
  const { resume, updateEducation, setFocusedFieldId } = useResume();
  const { education } = resume;

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      grade: "",
      details: "",
    };
    updateEducation([...education, newItem]);
  };

  const handleRemove = (index: number) => {
    updateEducation(education.filter((_, idx) => idx !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= education.length) return;
    const updated = [...education];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateEducation(updated);
  };

  const handleFieldChange = (index: number, field: keyof EducationItem, value: any) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    updateEducation(updated);
  };

  return (
    <div className="space-y-4">
      {education.map((edu, idx) => (
        <div
          key={edu.id}
          className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              #{idx + 1} {edu.degree || "Degree"} {edu.institution ? `— ${edu.institution}` : ""}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => handleMove(idx, "up")}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={idx === education.length - 1}
                onClick={() => handleMove(idx, "down")}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Degree & Major
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleFieldChange(idx, "degree", e.target.value)}
                onFocus={() => setFocusedFieldId(`education.${edu.id}`)}
                placeholder="e.g. B.S. in Computer Science"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Institution / University
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleFieldChange(idx, "institution", e.target.value)}
                onFocus={() => setFocusedFieldId(`education.${edu.id}`)}
                placeholder="e.g. UC Berkeley"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Graduation Year / Dates
              </label>
              <input
                type="text"
                value={edu.endDate || ""}
                onChange={(e) => handleFieldChange(idx, "endDate", e.target.value)}
                placeholder="e.g. 2019"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                GPA / Grade / Honors
              </label>
              <input
                type="text"
                value={edu.grade || ""}
                onChange={(e) => handleFieldChange(idx, "grade", e.target.value)}
                placeholder="e.g. 3.85 GPA or Cum Laude"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleAdd}
        className="w-full text-xs font-semibold py-2 cursor-pointer border-dashed"
        leftIcon={<Plus className="w-3.5 h-3.5" />}
      >
        Add Education
      </Button>
    </div>
  );
}
