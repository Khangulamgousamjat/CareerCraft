import { toPng } from "html-to-image";
import { ExportOptions } from "./pdf";

/**
 * Exports the complete A4 resume node as a high-resolution print-quality PNG.
 */
export async function exportToPng(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const filename = options.filename || "Resume.png";

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2.5,
      backgroundColor: "#FFFFFF",
      cacheBust: true,
      skipFonts: false,
    });

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err: any) {
    console.error("PNG export failed:", err);
    throw new Error(err?.message || "Failed to generate PNG image.");
  }
}
