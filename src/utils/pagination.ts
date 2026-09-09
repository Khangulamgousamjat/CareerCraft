import { ResumeFormatting } from "@/types/resume";

export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
export const A4_PAGE_PADDING_Y_PX = 48; // 24px top, 24px bottom
export const A4_USABLE_HEIGHT_PX = A4_HEIGHT_PX - A4_PAGE_PADDING_Y_PX;

export type PageUsageStatus = "normal" | "warning" | "overflow";

export interface PageUsageResult {
  percentage: number;
  status: PageUsageStatus;
  isOverflown: boolean;
  message?: string;
}

export function calculatePageUsage(contentHeight: number): PageUsageResult {
  const usable = A4_USABLE_HEIGHT_PX;
  const rawRatio = contentHeight / usable;
  const percentage = Math.min(Math.round(rawRatio * 100), 160);

  if (percentage <= 94) {
    return {
      percentage,
      status: "normal",
      isOverflown: false,
    };
  } else if (percentage <= 100) {
    return {
      percentage,
      status: "warning",
      isOverflown: false,
      message: "Near single-page capacity (95–100%). Consider reviewing spacing.",
    };
  } else {
    return {
      percentage,
      status: "overflow",
      isOverflown: true,
      message:
        "Your content exceeds the one-page limit. Shorten your content, or reduce font size / spacing to fit.",
    };
  }
}

/**
 * Intelligently analyzes the whole page usage and calculates optimal
 * typography, line spacing, and section margins to gracefully fill
 * exactly 1 full A4 page (~95% capacity) without leaving excessive
 * empty space at the bottom or overflowing onto a second page.
 */
export function getAutoFitFormatting(
  current: ResumeFormatting,
  contentHeight?: number,
  usableHeight: number = A4_USABLE_HEIGHT_PX
): ResumeFormatting {
  const currentSize = current.baseFontSize || 10;
  const currentSectionSpacing = current.sectionSpacing ?? 10;
  const currentLineSpacing = current.lineSpacing ?? 1.25;

  // Target 95% of usable height so content fills the page gracefully without overflowing
  const TARGET_HEIGHT = usableHeight * 0.95; // ~1021px

  // If content height is unavailable, use standard professional defaults
  if (!contentHeight || contentHeight <= 0) {
    return {
      ...current,
      baseFontSize: 10,
      sectionSpacing: 10,
      lineSpacing: 1.25,
    };
  }

  const currentUsageRatio = contentHeight / TARGET_HEIGHT;

  // If already right at the sweet spot (93% - 97%), gentle polish
  if (currentUsageRatio >= 0.93 && currentUsageRatio <= 0.97) {
    return current;
  }

  // Expansion (> 1) or compression (< 1) factor
  const scale = TARGET_HEIGHT / contentHeight;

  // Distribute adjustment proportionally:
  // Font size has the biggest impact on line height and bullet wrapping.
  const targetSize = currentSize * Math.pow(scale, 0.44);
  const targetLineSpacing = currentLineSpacing * Math.pow(scale, 0.22);
  const targetSectionSpacing = currentSectionSpacing * Math.pow(scale, 0.52);

  // Clamp within safe, readable typography standards
  // Snap baseFontSize to clean 0.5pt steps between 8.5pt and 12.0pt
  const newSize = Math.min(12, Math.max(8.5, Math.round(targetSize * 2) / 2));
  // Snap lineSpacing to 0.05 steps between 1.15 and 1.50
  const newLineSpacing = Math.min(1.5, Math.max(1.15, Math.round(targetLineSpacing * 20) / 20));
  // Section spacing between 6px and 22px
  const newSpacing = Math.min(22, Math.max(6, Math.round(targetSectionSpacing)));

  return {
    ...current,
    baseFontSize: newSize,
    sectionSpacing: newSpacing,
    lineSpacing: newLineSpacing,
  };
}
