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
 * Intelligently and tastefully calculates safe step-down adjustments to bring
 * overflown content back under 100% without breaking visual harmony.
 */
export function getAutoFitFormatting(current: ResumeFormatting): ResumeFormatting {
  const currentSize = current.baseFontSize || 10;
  const currentSectionSpacing = current.sectionSpacing ?? 10;
  const currentLineSpacing = current.lineSpacing ?? 1.25;

  // Reduce font size safely (minimum 8.5pt)
  const newSize = Math.max(8.5, Math.round((currentSize - 0.5) * 10) / 10);
  // Reduce section spacing safely (minimum 6px)
  const newSpacing = Math.max(6, currentSectionSpacing - 2);
  // Reduce line spacing safely (minimum 1.15)
  const newLineSpacing = Math.max(1.15, Math.round((currentLineSpacing - 0.05) * 100) / 100);

  return {
    ...current,
    baseFontSize: newSize,
    sectionSpacing: newSpacing,
    lineSpacing: newLineSpacing,
  };
}
