"use client";

import React from "react";
import { PersonalInfo, ResumeFormatting } from "@/types/resume";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

function LinkedinIcon({ className = "w-2.5 h-2.5 inline mr-1" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GithubIcon({ className = "w-2.5 h-2.5 inline mr-1" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface HeaderBlockProps {
  personal: PersonalInfo;
  formatting: ResumeFormatting;
  onSelectField?: (fieldId: string) => void;
}

export function HeaderBlock({ personal, formatting, onSelectField }: HeaderBlockProps) {
  const { accentColor, headingColor, bodyColor, textOverrides } = formatting;
  const nameOverride = textOverrides?.["personal.name"];
  const titleOverride = textOverrides?.["personal.title"];
  const hasPhoto = Boolean(personal.photo?.dataUrl);

  const items = [
    personal.phone && { text: personal.phone, icon: <Phone className="w-2.5 h-2.5 inline mr-1" /> },
    personal.email && { text: personal.email, icon: <Mail className="w-2.5 h-2.5 inline mr-1" /> },
    personal.location && { text: personal.location, icon: <MapPin className="w-2.5 h-2.5 inline mr-1" /> },
    personal.portfolio && { text: personal.portfolio, icon: <Globe className="w-2.5 h-2.5 inline mr-1" /> },
    personal.linkedin && { text: personal.linkedin, icon: <LinkedinIcon className="w-2.5 h-2.5 inline mr-1" /> },
    personal.github && { text: personal.github, icon: <GithubIcon className="w-2.5 h-2.5 inline mr-1" /> },
  ].filter(Boolean) as { text: string; icon: React.ReactNode }[];

  const nameElement = (
    <h1
      onClick={() => onSelectField?.("personal.name")}
      className="font-bold tracking-tight leading-none cursor-pointer transition-opacity hover:opacity-90"
      style={{
        color: nameOverride?.color || headingColor,
        fontSize: `${(formatting.baseFontSize || 10) * 1.85 + (nameOverride?.fontSizeDelta || 0)}pt`,
        fontWeight: nameOverride?.bold !== undefined ? (nameOverride.bold ? 800 : 400) : 800,
        fontStyle: nameOverride?.italic ? "italic" : "normal",
        textDecoration: nameOverride?.underline ? "underline" : "none",
        textAlign: hasPhoto ? (nameOverride?.alignment || "left") : (nameOverride?.alignment || "center"),
      }}
    >
      {personal.name || "Your Name"}
    </h1>
  );

  const titleElement = personal.title ? (
    <p
      onClick={() => onSelectField?.("personal.title")}
      className="font-semibold tracking-wide mt-1 cursor-pointer"
      style={{
        color: titleOverride?.color || accentColor,
        fontSize: `${(formatting.baseFontSize || 10) * 1.05 + (titleOverride?.fontSizeDelta || 0)}pt`,
        fontWeight: titleOverride?.bold !== undefined ? (titleOverride.bold ? 700 : 400) : 600,
        fontStyle: titleOverride?.italic ? "italic" : "normal",
        textDecoration: titleOverride?.underline ? "underline" : "none",
        textAlign: hasPhoto ? (titleOverride?.alignment || "left") : (titleOverride?.alignment || "center"),
      }}
    >
      {personal.title}
    </p>
  ) : null;

  const contactElement = items.length > 0 ? (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 ${
        hasPhoto ? "justify-start" : "justify-center"
      }`}
      style={{
        color: bodyColor,
        fontSize: `${(formatting.baseFontSize || 10) * 0.85}pt`,
      }}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="inline-flex items-center">
            {item.icon}
            {item.text}
          </span>
          {idx < items.length - 1 && <span className="opacity-40">•</span>}
        </React.Fragment>
      ))}
    </div>
  ) : null;

  return (
    <header
      className={`border-b pb-2.5 mb-2.5 ${hasPhoto ? "text-left" : "text-center"}`}
      style={{ borderColor: accentColor }}
    >
      {hasPhoto ? (
        /* Layout With Profile Photo */
        <div className="flex items-center gap-4">
          {/* Circular Headshot */}
          <div
            className="shrink-0 rounded-full overflow-hidden border-2 shadow-xs"
            style={{
              width: "78px",
              height: "78px",
              borderColor: accentColor,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personal.photo!.dataUrl}
              alt={personal.name || "Profile headshot"}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Candidate Text Block */}
          <div className="flex-1 min-w-0">
            {nameElement}
            {titleElement}
            {contactElement}
          </div>
        </div>
      ) : (
        /* Original Centered Layout (No Photo) - Exactly as before */
        <>
          {nameElement}
          {titleElement}
          {contactElement}
        </>
      )}
    </header>
  );
}
