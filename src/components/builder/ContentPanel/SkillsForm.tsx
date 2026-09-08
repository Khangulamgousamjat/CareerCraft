"use client";

import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { SkillCategory } from "@/types/resume";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SkillsForm() {
  const { resume, updateSkills } = useResume();
  const { skills } = resume;
  const [newTagInputs, setNewTagInputs] = useState<Record<string, string>>({});

  const handleAddCategory = () => {
    const newId = `skill-${Date.now()}`;
    const newCategory: SkillCategory = {
      id: newId,
      category: "Tools & Technologies",
      items: [],
    };
    updateSkills([...skills, newCategory]);
  };

  const handleRemoveCategory = (index: number) => {
    const updated = skills.filter((_, idx) => idx !== index);
    updateSkills(updated);
  };

  const handleCategoryNameChange = (index: number, name: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], category: name };
    updateSkills(updated);
  };

  const handleAddTag = (categoryIndex: number) => {
    const catId = skills[categoryIndex].id || `${categoryIndex}`;
    const tagText = (newTagInputs[catId] || "").trim();
    if (!tagText) return;

    const updated = [...skills];
    const currentItems = updated[categoryIndex].items || [];
    if (!currentItems.includes(tagText)) {
      updated[categoryIndex] = {
        ...updated[categoryIndex],
        items: [...currentItems, tagText],
      };
      updateSkills(updated);
    }
    setNewTagInputs((prev) => ({ ...prev, [catId]: "" }));
  };

  const handleRemoveTag = (categoryIndex: number, tagIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex] = {
      ...updated[categoryIndex],
      items: updated[categoryIndex].items.filter((_, idx) => idx !== tagIndex),
    };
    updateSkills(updated);
  };

  return (
    <div className="space-y-4">
      {skills.map((category, catIdx) => {
        const catId = category.id || `${catIdx}`;
        return (
          <div
            key={catId}
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={category.category}
                onChange={(e) => handleCategoryNameChange(catIdx, e.target.value)}
                placeholder="Category Name (e.g. Languages, Cloud)"
                className="text-xs font-semibold px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(catIdx)}
                title="Remove category"
                className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap gap-1.5 min-h-6">
              {category.items.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md shadow-2xs"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(catIdx, itemIdx)}
                    className="text-slate-400 hover:text-red-500 p-0.5 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Tag Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInputs[catId] || ""}
                onChange={(e) =>
                  setNewTagInputs((prev) => ({ ...prev, [catId]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(catIdx);
                  }
                }}
                placeholder="Type skill & press Enter (e.g. React, Docker)"
                className="text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleAddTag(catIdx)}
                className="text-xs px-2 py-1 h-auto"
              >
                Add
              </Button>
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleAddCategory}
        className="w-full text-xs font-semibold py-2 cursor-pointer border-dashed"
        leftIcon={<Plus className="w-3.5 h-3.5" />}
      >
        Add Skill Category
      </Button>
    </div>
  );
}
