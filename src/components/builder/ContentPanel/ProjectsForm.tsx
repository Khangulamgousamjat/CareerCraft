"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { ProjectItem } from "@/types/resume";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProjectsForm() {
  const { resume, updateProjects, setFocusedFieldId } = useResume();
  const { projects } = resume;

  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: "",
      technologies: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    };
    updateProjects([...projects, newItem]);
  };

  const handleRemove = (index: number) => {
    updateProjects(projects.filter((_, idx) => idx !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateProjects(updated);
  };

  const handleFieldChange = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateProjects(updated);
  };

  const handleBulletChange = (projIndex: number, bulletIndex: number, value: string) => {
    const updated = [...projects];
    const newBullets = [...updated[projIndex].bullets];
    newBullets[bulletIndex] = value;
    updated[projIndex] = { ...updated[projIndex], bullets: newBullets };
    updateProjects(updated);
  };

  const handleAddBullet = (projIndex: number) => {
    const updated = [...projects];
    updated[projIndex] = {
      ...updated[projIndex],
      bullets: [...updated[projIndex].bullets, ""],
    };
    updateProjects(updated);
  };

  const handleRemoveBullet = (projIndex: number, bulletIndex: number) => {
    const updated = [...projects];
    const newBullets = updated[projIndex].bullets.filter((_, idx) => idx !== bulletIndex);
    updated[projIndex] = { ...updated[projIndex], bullets: newBullets };
    updateProjects(updated);
  };

  return (
    <div className="space-y-4">
      {projects.map((proj, idx) => (
        <div
          key={proj.id}
          className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
        >
          {/* Card Top */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              #{idx + 1} {proj.name || "New Project"}
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
                disabled={idx === projects.length - 1}
                onClick={() => handleMove(idx, "down")}
                title="Move down"
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                title="Delete project"
                className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Project Name & Tech Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => handleFieldChange(idx, "name", e.target.value)}
                onFocus={() => setFocusedFieldId(`projects.${proj.id}`)}
                placeholder="e.g. PulseMetrics"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Technologies Used
              </label>
              <input
                type="text"
                value={proj.technologies || ""}
                onChange={(e) => handleFieldChange(idx, "technologies", e.target.value)}
                placeholder="e.g. Next.js, Go, Kafka"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Bullets */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Project Description & Outcomes
            </label>
            <div className="space-y-1.5">
              {proj.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-1.5">
                  <span className="text-slate-400 mt-1 text-xs">•</span>
                  <textarea
                    rows={2}
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)}
                    placeholder="Describe what you engineered, key technical problems solved, and scale..."
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
        onClick={handleAdd}
        className="w-full text-xs font-semibold py-2 cursor-pointer border-dashed"
        leftIcon={<Plus className="w-3.5 h-3.5" />}
      >
        Add Key Project
      </Button>
    </div>
  );
}
