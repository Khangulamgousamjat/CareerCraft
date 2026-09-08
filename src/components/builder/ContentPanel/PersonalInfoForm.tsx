"use client";

import React from "react";
import { useResume } from "@/context/ResumeContext";

export function PersonalInfoForm() {
  const { resume, updatePersonal, setFocusedFieldId } = useResume();
  const { personal } = resume;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={personal.name}
            onChange={(e) => updatePersonal("name", e.target.value)}
            onFocus={() => setFocusedFieldId("personal.name")}
            placeholder="e.g. Alex Morgan"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Professional Title *
          </label>
          <input
            type="text"
            value={personal.title}
            onChange={(e) => updatePersonal("title", e.target.value)}
            onFocus={() => setFocusedFieldId("personal.title")}
            placeholder="e.g. Senior Full-Stack Engineer"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
            placeholder="alex.morgan@example.com"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
            placeholder="+1 (555) 234-5678"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Location
          </label>
          <input
            type="text"
            value={personal.location || ""}
            onChange={(e) => updatePersonal("location", e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Portfolio / Website
          </label>
          <input
            type="text"
            value={personal.portfolio || ""}
            onChange={(e) => updatePersonal("portfolio", e.target.value)}
            placeholder="alexmorgan.io"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={personal.linkedin || ""}
            onChange={(e) => updatePersonal("linkedin", e.target.value)}
            placeholder="linkedin.com/in/alexmorgan"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            GitHub Username / URL
          </label>
          <input
            type="text"
            value={personal.github || ""}
            onChange={(e) => updatePersonal("github", e.target.value)}
            placeholder="github.com/alexmorgan"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
