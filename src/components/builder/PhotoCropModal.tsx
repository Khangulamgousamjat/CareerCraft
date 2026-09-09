"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Check,
  Circle,
  Square,
  RectangleVertical,
  Maximize2,
  Minimize2,
  RefreshCw,
} from "lucide-react";
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
  initialShape = "rectangle",
  onClose,
  onSaveCrop,
}: PhotoCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [flipH, setFlipH] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [shape, setShape] = useState<PhotoShape>(initialShape);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Touch pinch-to-zoom tracking
  const touchDistanceRef = useRef<number | null>(null);

  // Natural aspect ratio
  const natW = naturalSize?.width || 300;
  const natH = naturalSize?.height || 300;
  const isRotated90 = rotation === 90 || rotation === 270;
  const effectiveNatW = isRotated90 ? natH : natW;
  const effectiveNatH = isRotated90 ? natW : natH;

  // Mask dimensions (visual crop window)
  let MASK_WIDTH = 220;
  let MASK_HEIGHT = 275; // Standard vertical portrait ~4:5 ratio

  if (shape === "circle" || shape === "rounded") {
    MASK_WIDTH = 230;
    MASK_HEIGHT = 230;
  } else if (shape === "original") {
    const aspect = effectiveNatW / effectiveNatH;
    if (aspect <= 1) {
      MASK_HEIGHT = 270;
      MASK_WIDTH = Math.max(140, Math.min(270, Math.round(270 * aspect)));
    } else {
      MASK_WIDTH = 270;
      MASK_HEIGHT = Math.max(140, Math.min(270, Math.round(270 / aspect)));
    }
  }

  // Base scale calculation: Fits the entire photo inside the crop frame by default
  const fitScale = Math.min(MASK_WIDTH / effectiveNatW, MASK_HEIGHT / effectiveNatH);
  const coverScale = Math.max(MASK_WIDTH / effectiveNatW, MASK_HEIGHT / effectiveNatH);

  // Base preview dimensions
  const previewBaseW = natW * fitScale;
  const previewBaseH = natH * fitScale;

  // Reset state on open or imageSrc change
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setFlipH(false);
      setShape(initialShape || "rectangle");
    }
  }, [isOpen, imageSrc, initialShape]);

  // Drag handlers (Mouse)
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

  // Touch handlers (1 finger drag, 2 finger pinch-to-zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      touchDistanceRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.hypot(dx, dy);
      const ratio = newDistance / touchDistanceRef.current;
      setZoom((prev) => Math.min(3.0, Math.max(0.2, Math.round(prev * ratio * 100) / 100)));
      touchDistanceRef.current = newDistance;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistanceRef.current = null;
  };

  // Mouse wheel zoom inside viewport
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    setZoom((prev) => Math.min(3.0, Math.max(0.2, Math.round((prev + delta) * 100) / 100)));
  };

  // Quick preset helpers
  const handleFitEntirePhoto = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleFillFrame = () => {
    const ratio = fitScale > 0 ? coverScale / fitScale : 1.25;
    setZoom(Math.round(ratio * 100) / 100);
    setPosition({ x: 0, y: 0 });
  };

  const handleRotateCw = () => {
    setRotation((prev) => ((prev + 90) % 360 as 0 | 90 | 180 | 270));
    setPosition({ x: 0, y: 0 });
  };

  const handleRotateCcw = () => {
    setRotation((prev) => (((prev - 90 + 360) % 360) as 0 | 90 | 180 | 270));
    setPosition({ x: 0, y: 0 });
  };

  const handleFlip = () => {
    setFlipH((prev) => !prev);
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    setFlipH(false);
  };

  // Canvas export
  const handleSave = useCallback(() => {
    const img = imageRef.current;
    if (!img) return;

    // High resolution output (2x super-sampled for crisp retina / print quality)
    const TARGET_WIDTH = MASK_WIDTH * 2;
    const TARGET_HEIGHT = MASK_HEIGHT * 2;

    const canvas = document.createElement("canvas");
    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

    // 1. Clipping Mask
    ctx.beginPath();
    if (shape === "circle") {
      ctx.arc(
        TARGET_WIDTH / 2,
        TARGET_HEIGHT / 2,
        Math.min(TARGET_WIDTH, TARGET_HEIGHT) / 2,
        0,
        Math.PI * 2
      );
    } else if (shape === "rounded") {
      const radius = Math.min(TARGET_WIDTH, TARGET_HEIGHT) * 0.16;
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT, radius);
      } else {
        ctx.rect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      }
    } else {
      // Rectangle with subtle modern rounded corner
      const radius = 20;
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT, radius);
      } else {
        ctx.rect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      }
    }
    ctx.closePath();
    ctx.clip();

    // 2. High-res transformation
    const scaleRatio = 2; // Preview to Canvas ratio

    ctx.save();
    ctx.translate(TARGET_WIDTH / 2, TARGET_HEIGHT / 2);
    ctx.translate(position.x * scaleRatio, position.y * scaleRatio);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom * (flipH ? -1 : 1), zoom);

    const canvasDrawW = previewBaseW * scaleRatio;
    const canvasDrawH = previewBaseH * scaleRatio;

    ctx.drawImage(img, -canvasDrawW / 2, -canvasDrawH / 2, canvasDrawW, canvasDrawH);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    onSaveCrop(dataUrl, shape);
    onClose();
  }, [
    MASK_WIDTH,
    MASK_HEIGHT,
    shape,
    position,
    rotation,
    flipH,
    zoom,
    previewBaseW,
    previewBaseH,
    onSaveCrop,
    onClose,
  ]);

  if (!isOpen || !imageSrc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit & Crop Photo"
      description="Drag to reposition, rotate 90°, or adjust zoom. Fits entire photo by default."
      maxWidth="md"
    >
      <div className="flex flex-col items-center space-y-3.5 pt-1">
        {/* Top Controls: Shape Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs w-full max-w-sm">
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
            <span>Rectangle (Portrait)</span>
          </button>

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
        </div>

        {/* Interactive Mobile-Style Crop Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="relative w-full max-w-[340px] h-[330px] rounded-2xl bg-slate-950 border border-slate-700/80 overflow-hidden cursor-grab active:cursor-grabbing select-none flex items-center justify-center touch-none shadow-2xl"
        >
          {/* Loaded & Transformed Image */}
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${
                zoom * (flipH ? -1 : 1)
              }, ${zoom})`,
              transformOrigin: "center center",
            }}
            className="absolute pointer-events-none select-none transition-transform duration-75 ease-out"
          >
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
              style={{
                width: `${previewBaseW}px`,
                height: `${previewBaseH}px`,
                maxWidth: "none",
              }}
              className="pointer-events-none select-none block"
            />
          </div>

          {/* Guide Cutout Box with 3x3 Grid & Corner Brackets */}
          <div
            className={`absolute pointer-events-none border-2 border-white shadow-2xl transition-all duration-200 ${
              shape === "circle"
                ? "rounded-full"
                : shape === "rounded"
                ? "rounded-2xl"
                : "rounded-lg"
            }`}
            style={{
              width: `${MASK_WIDTH}px`,
              height: `${MASK_HEIGHT}px`,
              boxShadow: "0 0 0 9999px rgba(10, 15, 30, 0.78)",
            }}
          >
            {/* 3x3 Rule-of-Thirds Grid Lines */}
            {shape !== "circle" && (
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-35">
                <div className="border-r border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-r border-b border-white/40" />
                <div className="border-b border-white/40" />
                <div className="border-r border-white/40" />
                <div className="border-r border-white/40" />
                <div />
              </div>
            )}

            {/* Mobile Corner Brackets (Thick accents like mobile cameras) */}
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-white pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-white pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-white pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-white pointer-events-none" />
          </div>

          {/* Quick Fit / Fill Overlay Buttons inside viewport */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white">
              <button
                type="button"
                onClick={handleFitEntirePhoto}
                title="Fit whole photo inside crop frame"
                className="hover:text-blue-400 font-semibold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              >
                Fit Photo
              </button>
              <span className="opacity-40">|</span>
              <button
                type="button"
                onClick={handleFillFrame}
                title="Zoom to fill frame"
                className="hover:text-blue-400 font-semibold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              >
                Fill Frame
              </button>
            </div>

            {/* Rotation indicator badge */}
            {rotation !== 0 && (
              <span className="text-[10px] font-mono bg-blue-600/80 text-white px-2 py-0.5 rounded-md backdrop-blur-md">
                {rotation}°
              </span>
            )}
          </div>
        </div>

        {/* Editing Tools: Rotate 90°, Flip, Zoom Controls */}
        <div className="w-full max-w-sm space-y-2.5 px-1">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleRotateCcw}
                title="Rotate 90° counter-clockwise"
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>-90°</span>
              </button>

              <button
                type="button"
                onClick={handleRotateCw}
                title="Rotate 90° clockwise"
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>+90°</span>
              </button>

              <button
                type="button"
                onClick={handleFlip}
                title="Flip horizontally"
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  flipH
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Flip
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              title="Reset position, rotation, and zoom"
              className="text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Zoom Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <ZoomOut className="w-3.5 h-3.5" /> Zoom Scale
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.02"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <ZoomIn className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 w-full pt-2.5 border-t border-slate-100 dark:border-slate-800">
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
            Apply & Save Photo
          </Button>
        </div>
      </div>
    </Modal>
  );
}
