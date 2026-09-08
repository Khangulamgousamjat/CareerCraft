"use client";

import React, { useState, useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { PhotoCropModal } from "@/components/builder/PhotoCropModal";
import { Camera, Upload, Trash2, RefreshCw, AlertCircle } from "lucide-react";

export function PersonalInfoForm() {
  const { resume, updatePersonal, setFocusedFieldId } = useResume();
  const { personal } = resume;

  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileValidationAndOpen = (file: File) => {
    setErrorMessage(null);

    // Validate file type (JPG/JPEG, PNG only)
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a JPG or PNG image.");
      return;
    }

    // Validate file size (Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage("Image file exceeds 5MB limit. Please select a smaller photo.");
      return;
    }

    // Read and open crop modal
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setRawImageSrc(result);
        setIsCropOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileValidationAndOpen(file);
    }
    // Reset file input value so selecting the same file triggers change again
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileValidationAndOpen(file);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonal("photo", undefined);
    setErrorMessage(null);
  };

  const handleSaveCroppedPhoto = (dataUrl: string) => {
    updatePersonal("photo", { dataUrl });
    setRawImageSrc(null);
    setIsCropOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload & Crop Controls */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Circular Thumbnail / Upload Trigger */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative group w-20 h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-150 overflow-hidden shrink-0 shadow-2xs ${
              isDraggingOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/60 scale-105"
                : personal.photo?.dataUrl
                ? "border-blue-500/60 bg-white dark:bg-slate-900"
                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500"
            }`}
          >
            {personal.photo?.dataUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photo.dataUrl}
                  alt="Profile thumbnail"
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay for quick change */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <RefreshCw className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] font-semibold">Change</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-center text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 p-1">
                <Camera className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-medium leading-tight">Add Photo</span>
              </div>
            )}
          </div>

          {/* Photo Actions & Guidance */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Profile Photo (Optional)
              </span>
              {personal.photo?.dataUrl && (
                <span className="text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Photo Set
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              JPG or PNG, max 5MB. Circular cropped preview appears on your resume header and all exports.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold px-3 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
              >
                <Upload className="w-3 h-3" />
                <span>{personal.photo?.dataUrl ? "Change Photo" : "Upload Photo"}</span>
              </button>

              {personal.photo?.dataUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-xs font-medium px-2.5 py-1 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-2.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Crop Modal Dialog */}
      <PhotoCropModal
        isOpen={isCropOpen}
        imageSrc={rawImageSrc}
        onClose={() => {
          setIsCropOpen(false);
          setRawImageSrc(null);
        }}
        onSaveCrop={handleSaveCroppedPhoto}
      />

      {/* Inputs for Name and Title */}
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
