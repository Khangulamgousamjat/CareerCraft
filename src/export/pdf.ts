import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

export interface ExportOptions {
  filename?: string;
  isOverflown?: boolean;
}

/**
 * Exports the fixed A4 resume node as a high-definition single-page PDF.
 * Captures at 2.5x pixel ratio for print sharpness and maps directly to 210mm × 297mm A4 bounds.
 */
export async function exportToPdf(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const filename = options.filename || "Resume.pdf";

  if (options.isOverflown) {
    throw new Error(
      "Your resume exceeds the one-page limit. Please reduce content or click Auto-Fit before downloading."
    );
  }

  try {
    // Generate high-resolution canvas from the DOM node
    const canvas = await toCanvas(element, {
      pixelRatio: 2.5,
      backgroundColor: "#FFFFFF",
      cacheBust: true,
      skipFonts: false,
    });

    // Create single-page A4 PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // A4 dimensions: 210mm × 297mm
    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

    pdf.save(filename);
  } catch (err: any) {
    console.error("PDF export failed:", err);
    throw new Error(err?.message || "Failed to generate PDF. Please try again.");
  }
}
