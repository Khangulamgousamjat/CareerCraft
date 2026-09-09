"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ZoomIn, ZoomOut, RotateCcw, Check, Circle, Square, RectangleVertical } from "lucide-react";
import { PhotoShape } from "@/types/resume";

interface PhotoCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  initialShape?: PhotoShape;
  onClose: () => void;
  onSaveCrop: (croppedDataUrl: string, shape: PhotoShape) => void;
}

export function PhotoCropModal({
  isOpen,
  imageSrc,
  initialShape = "circle",
  onClose,
  onSaveCrop,
}: PhotoCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [shape, setShape] = useState<PhotoShape>(initialShape);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Mask dimensions (visual crop window)
  const MASK_WIDTH = shape === "rectangle" ? 200 : 220;
  const MASK_HEIGHT = shape === "rectangle" ? 240 : 220;

  // Reset state on open or imageSrc change
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setShape(initialShape || "circle");
    }
  }, [isOpen, imageSrc, initialShape]);

  // Drag handlers (Mouse + Touch)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSave = useCallback(() => {
    const img = imageRef.current;
    if (!img) return;

    // Output target size for crisp headshot
    const TARGET_WIDTH = shape === "rectangle" ? 360 : 400;
    const TARGET_HEIGHT = shape === "rectangle" ? 432 : 400;

    const canvas = document.createElement("canvas");
    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

    // Apply clipping mask according to selected shape
    ctx.beginPath();
    if (shape === "circle") {
      ctx.arc(TARGET_WIDTH / 2, TARGET_HEIGHT / 2, TARGET_WIDTH / 2, 0, Math.PI * 2);
    } else if (shape === "rounded") {
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT, 54);
      } else {
        ctx.rect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      }
    } else {
      // Rectangle with subtle modern rounded corner
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT, 20);
      } else {
        ctx.rect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      }
    }
    ctx.closePath();
    ctx.clip();

    // Scale ratio from visual mask to export canvas
    const scaleFactorX = TARGET_WIDTH / MASK_WIDTH;
    const scaleFactorY = TARGET_HEIGHT / MASK_HEIGHT;

    ctx.save();
    ctx.translate(TARGET_WIDTH / 2 + position.x * scaleFactorX, TARGET_HEIGHT / 2 + position.y * scaleFactorY);
    ctx.scale(zoom, zoom);

    // Cover math: preserve natural aspect ratio
    const natW = img.naturalWidth || TARGET_WIDTH;
    const natH = img.naturalHeight || TARGET_HEIGHT;
    const coverScale = Math.max(TARGET_WIDTH / natW, TARGET_HEIGHT / natH);
    const drawW = natW * coverScale;
    const drawH = natH * coverScale;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    onSaveCrop(dataUrl, shape);
    onClose();
  }, [position, zoom, shape, onSaveCrop, onClose, MASK_HEIGHT, MASK_WIDTH]);

  if (!isOpen || !imageSrc) return null;

  // Visual cover calculations for preview
  const natW = naturalSize?.width || MASK_WIDTH;
  const natH = naturalSize?.height || MASK_HEIGHT;
  const previewCoverScale = Math.max(MASK_WIDTH / natW, MASK_HEIGHT / natH);
  const previewW = natW * previewCoverScale;
  const previewH = natH * previewCoverScale;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Your Profile Photo"
      description="Choose your photo shape, drag to position, and use the zoom slider."
      maxWidth="md"
    >
      <div className="flex flex-col items-center space-y-4 pt-1">
        {/* Shape Selector Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setShape("circle")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              shape === "circle"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Circle className="w-3.5 h-3.5" />
            <span>Circle</span>
          </button>
          <button
            type="button"
            onClick={() => setShape("rounded")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              shape === "rounded"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            <span>Rounded</span>
          </button>
          <button
            type="button"
            onClick={() => setShape("rectangle")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              shape === "rectangle"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <RectangleVertical className="w-3.5 h-3.5" />
            <span>Rectangle</span>
          </button>
        </div>

        {/* Interactive Crop Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-72 h-72 rounded-2xl bg-slate-950 border border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing select-none flex items-center justify-center touch-none shadow-inner"
        >
          {/* Loaded Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Crop source"
            draggable={false}
            onLoad={(e) => {
              setNaturalSize({
                width: e.currentTarget.naturalWidth,
                height: e.currentTarget.naturalHeight,
              });
            }}
            className="max-w-none pointer-events-none select-none transition-transform duration-75 ease-out"
            style={{
              width: `${previewW}px`,
              height: `${previewH}px`,
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          />

          {/* Guide Ring / Box with shadow mask */}
          <div
            className={`absolute pointer-events-none border-2 border-white/95 transition-all duration-200 ${
              shape === "circle"
                ? "rounded-full"
                : shape === "rounded"
                ? "rounded-2xl"
                : "rounded-md"
            }`}
            style={{
              width: `${MASK_WIDTH}px`,
              height: `${MASK_HEIGHT}px`,
              boxShadow: "0 0 0 9999px rgba(15, 23, 42, 0.75)",
            }}
          />
        </div>

        {/* Zoom Controls */}
        <div className="w-full max-w-xs space-y-1.5 px-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <ZoomOut className="w-3.5 h-3.5" /> Zoom
            </span>
            <span className="font-mono text-[11px] font-semibold">
              {Math.round(zoom * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPosition({ x: 0, y: 0 });
              }}
              title="Reset position and zoom"
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 w-full pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSave}
            className="cursor-pointer text-xs font-semibold"
            leftIcon={<Check className="w-3.5 h-3.5" />}
          >
            Save Photo
          </Button>
        </div>
      </div>
    </Modal>
  );
}
