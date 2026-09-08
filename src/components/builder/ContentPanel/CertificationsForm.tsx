"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";
import { CertificationItem } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CertificationsForm() {
  const { resume, updateCertifications, setFocusedFieldId } = useResume();
  const { certifications } = resume;

  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: "",
      provider: "",
    };
    updateCertifications([...certifications, newItem]);
  };

  const handleRemove = (index: number) => {
    updateCertifications(certifications.filter((_, idx) => idx !== index));
  };

  const handleFieldChange = (index: number, field: keyof CertificationItem, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateCertifications(updated);
  };

  return (
    <div className="space-y-3">
      {certifications.map((cert, idx) => (
        <div
          key={cert.id}
          className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              #{idx + 1} {cert.name || "New Certification"}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              title="Delete certification"
              className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                Certification Title
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleFieldChange(idx, "name", e.target.value)}
                onFocus={() => setFocusedFieldId(`certifications.${cert.id}`)}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                Issuing Organization
              </label>
              <input
                type="text"
                value={cert.provider || ""}
                onChange={(e) => handleFieldChange(idx, "provider", e.target.value)}
                placeholder="e.g. Amazon Web Services"
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
        Add Certification
      </Button>
    </div>
  );
}
