"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Camera } from "lucide-react";

interface PhotoCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onSaveCrop: (croppedDataUrl: string) => void;
}

export function PhotoCropModal({
  isOpen,
  imageSrc,
  onClose,
  onSaveCrop,
}: PhotoCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Mask dimensions
  const MASK_SIZE = 220; // Size of circular crop window in px

  // Reset state on open or imageSrc change
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

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

    // Output target size for crisp 1:1 circular headshot
    const TARGET_SIZE = 400;
    const canvas = document.createElement("canvas");
    canvas.width = TARGET_SIZE;
    canvas.height = TARGET_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and create circular clipping mask
    ctx.clearRect(0, 0, TARGET_SIZE, TARGET_SIZE);
    ctx.beginPath();
    ctx.arc(TARGET_SIZE / 2, TARGET_SIZE / 2, TARGET_SIZE / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // The mask center is at (MASK_SIZE/2, MASK_SIZE/2)
    // Scale ratio from preview mask to canvas
    const scaleFactor = TARGET_SIZE / MASK_SIZE;

    // Center coordinates
    const centerX = TARGET_SIZE / 2;
    const centerY = TARGET_SIZE / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.translate(position.x * scaleFactor, position.y * scaleFactor);
    ctx.scale(zoom * scaleFactor, zoom * scaleFactor);

    // Draw the image centered at offset
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawWidth = MASK_SIZE;
    let drawHeight = MASK_SIZE;
    if (imgAspect > 1) {
      drawWidth = MASK_SIZE * imgAspect;
    } else {
      drawHeight = MASK_SIZE / imgAspect;
    }

    ctx.drawImage(
      img,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    onSaveCrop(dataUrl);
    onClose();
  }, [position, zoom, onSaveCrop, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Your Profile Photo"
      description="Drag to reposition and use the slider to zoom into your circular headshot."
      maxWidth="md"
    >
      <div className="flex flex-col items-center space-y-4 pt-1">
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
          className="relative w-72 h-72 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing select-none flex items-center justify-center touch-none shadow-inner"
        >
          {/* Loaded Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Crop source"
            draggable={false}
            className="max-w-none pointer-events-none transition-transform duration-75 ease-out"
            style={{
              width: `${MASK_SIZE}px`,
              height: `${MASK_SIZE}px`,
              objectFit: "cover",
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          />

          {/* Dark Vignette Overlay with Circular Cutout */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle 110px at center, transparent 110px, rgba(15, 23, 42, 0.75) 111px)",
            }}
          />

          {/* Circular Visual Guide Ring */}
          <div
            className="absolute rounded-full pointer-events-none border-2 border-white/80 shadow-sm"
            style={{
              width: `${MASK_SIZE}px`,
              height: `${MASK_SIZE}px`,
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
