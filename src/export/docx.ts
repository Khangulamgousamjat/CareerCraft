import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  ImageRun,
} from "docx";
import { Resume } from "@/types/resume";

export interface DocxExportOptions {
  filename?: string;
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generates an editable, structured Microsoft Word (.docx) document
 * from the Resume data model, preserving headings, colors, fonts, and bullet lists.
 */
export async function exportToDocx(
  resume: Resume,
  options: DocxExportOptions = {}
): Promise<void> {
  const filename = options.filename || "Resume.docx";
  const { personal, summary, skills, experience, projects, education, certifications, formatting } =
    resume;

  // Clean hex colors (docx requires hex without '#')
  const cleanHex = (hex?: string, fallback = "000000") => {
    if (!hex) return fallback;
    return hex.replace("#", "");
  };

  const accentHex = cleanHex(formatting.accentColor, "2563EB");
  const headingHex = cleanHex(formatting.headingColor, "0B132B");
  const bodyHex = cleanHex(formatting.bodyColor, "1E293B");
  const font = formatting.fontFamily || "Inter";
  // docx sizes are in half-points (e.g. 10pt = 20)
  const baseSize = Math.round((formatting.baseFontSize || 10) * 2);

  const paragraphs: Paragraph[] = [];

  // Helper for Section Headings
  const createSectionHeading = (title: string): Paragraph => {
    return new Paragraph({
      spacing: { before: 180, after: 80 },
      border: {
        bottom: {
          color: accentHex,
          space: 2,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          font,
          bold: true,
          size: Math.round(baseSize * 0.95),
          color: headingHex,
        }),
      ],
    });
  };

  // 1. Header: Profile Photo (if present)
  const hasPhoto = Boolean(personal.photo?.dataUrl);
  const textAlignment = hasPhoto ? AlignmentType.LEFT : AlignmentType.CENTER;
  const bodyAlign =
    (formatting.bodyAlignment || "justify") === "justify"
      ? AlignmentType.JUSTIFIED
      : AlignmentType.LEFT;

  // 1. Header: Profile Photo (if present, aligned to the right side)
  if (personal.photo?.dataUrl) {
    try {
      const photoBytes = dataUrlToUint8Array(personal.photo.dataUrl);
      const isRect = personal.photo.shape === "rectangle";
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { after: 40 },
          children: [
            new ImageRun({
              data: photoBytes,
              type: "png",
              transformation: {
                width: isRect ? 70 : 75,
                height: isRect ? 84 : 75,
              },
            }),
          ],
        })
      );
    } catch (err) {
      console.warn("Failed to embed photo in DOCX:", err);
    }
  }

  // Candidate Name
  paragraphs.push(
    new Paragraph({
      alignment: textAlignment,
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: personal.name || "Your Name",
          font,
          bold: true,
          size: Math.round(baseSize * 1.8),
          color: headingHex,
        }),
      ],
    })
  );

  // Candidate Title
  if (personal.title) {
    paragraphs.push(
      new Paragraph({
        alignment: textAlignment,
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: personal.title,
            font,
            bold: true,
            size: Math.round(baseSize * 1.05),
            color: accentHex,
          }),
        ],
      })
    );
  }

  // Contact Info Row
  const contactParts = [
    personal.phone,
    personal.email,
    personal.location,
    personal.portfolio,
    personal.linkedin,
    personal.github,
  ].filter(Boolean) as string[];

  if (contactParts.length > 0) {
    paragraphs.push(
      new Paragraph({
        alignment: textAlignment,
        spacing: { after: 120 },
        border: {
          bottom: {
            color: accentHex,
            space: 4,
            style: BorderStyle.SINGLE,
            size: 8,
          },
        },
        children: [
          new TextRun({
            text: contactParts.join("  •  "),
            font,
            size: Math.round(baseSize * 0.85),
            color: bodyHex,
          }),
        ],
      })
    );
  }

  // 2. Professional Summary
  if (summary) {
    paragraphs.push(createSectionHeading("Professional Summary"));
    paragraphs.push(
      new Paragraph({
        alignment: bodyAlign,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: summary,
            font,
            size: baseSize,
            color: bodyHex,
          }),
        ],
      })
    );
  }

  // 3. Technical Skills
  const activeSkills = skills.filter((s) => s.category && s.items.length > 0);
  if (activeSkills.length > 0) {
    paragraphs.push(createSectionHeading("Technical Skills"));
    activeSkills.forEach((cat) => {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${cat.category}: `,
              font,
              bold: true,
              size: Math.round(baseSize * 0.95),
              color: headingHex,
            }),
            new TextRun({
              text: cat.items.join(", "),
              font,
              size: Math.round(baseSize * 0.95),
              color: bodyHex,
            }),
          ],
        })
      );
    });
  }

  // 4. Work Experience
  const activeExp = experience.filter((e) => e.position || e.company);
  if (activeExp.length > 0) {
    paragraphs.push(createSectionHeading("Work Experience"));
    activeExp.forEach((item) => {
      const dates =
        item.startDate || item.endDate
          ? ` (${item.startDate}${item.startDate && item.endDate ? " – " : ""}${item.endDate})`
          : "";

      paragraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 30 },
          children: [
            new TextRun({
              text: item.position || "Position",
              font,
              bold: true,
              size: baseSize,
              color: headingHex,
            }),
            item.company
              ? new TextRun({
                  text: `  |  ${item.company}`,
                  font,
                  bold: true,
                  size: baseSize,
                  color: accentHex,
                })
              : new TextRun(""),
            new TextRun({
              text: dates,
              font,
              italics: true,
              size: Math.round(baseSize * 0.85),
              color: "64748B",
            }),
          ],
        })
      );

      // Bullets
      if (item.bullets && item.bullets.length > 0) {
        item.bullets
          .filter((b) => b.trim().length > 0)
          .forEach((bullet) => {
            paragraphs.push(
              new Paragraph({
                bullet: { level: 0 },
                alignment: bodyAlign,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: bullet,
                    font,
                    size: Math.round(baseSize * 0.92),
                    color: bodyHex,
                  }),
                ],
              })
            );
          });
      }
    });
  }

  // 5. Key Projects
  const activeProjects = projects.filter((p) => p.name);
  if (activeProjects.length > 0) {
    paragraphs.push(createSectionHeading("Key Projects"));
    activeProjects.forEach((proj) => {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 80, after: 30 },
          children: [
            new TextRun({
              text: proj.name,
              font,
              bold: true,
              size: baseSize,
              color: headingHex,
            }),
            proj.technologies
              ? new TextRun({
                  text: `  (${proj.technologies})`,
                  font,
                  italics: true,
                  size: Math.round(baseSize * 0.88),
                  color: accentHex,
                })
              : new TextRun(""),
          ],
        })
      );

      if (proj.bullets && proj.bullets.length > 0) {
        proj.bullets
          .filter((b) => b.trim().length > 0)
          .forEach((bullet) => {
            paragraphs.push(
              new Paragraph({
                bullet: { level: 0 },
                alignment: bodyAlign,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: bullet,
                    font,
                    size: Math.round(baseSize * 0.92),
                    color: bodyHex,
                  }),
                ],
              })
            );
          });
      }
    });
  }

  // 6. Education
  const activeEdu = education.filter((e) => e.degree || e.institution);
  if (activeEdu.length > 0) {
    paragraphs.push(createSectionHeading("Education"));
    activeEdu.forEach((edu) => {
      const parts = [
        edu.institution && `— ${edu.institution}`,
        edu.grade && `(${edu.grade})`,
        (edu.startDate || edu.endDate) &&
          `[${edu.startDate}${edu.startDate && edu.endDate ? " – " : ""}${edu.endDate}]`,
      ].filter(Boolean);

      paragraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({
              text: edu.degree || "Degree",
              font,
              bold: true,
              size: baseSize,
              color: headingHex,
            }),
            new TextRun({
              text: parts.length > 0 ? `  ${parts.join("  ")}` : "",
              font,
              size: Math.round(baseSize * 0.9),
              color: bodyHex,
            }),
          ],
        })
      );
      if (edu.details) {
        paragraphs.push(
          new Paragraph({
            alignment: bodyAlign,
            spacing: { after: 30 },
            children: [
              new TextRun({
                text: edu.details,
                font,
                size: Math.round(baseSize * 0.88),
                color: bodyHex,
              }),
            ],
          })
        );
      }
    });
  }

  // 7. Certifications
  const activeCerts = certifications.filter((c) => c.name);
  if (activeCerts.length > 0) {
    paragraphs.push(createSectionHeading("Certifications"));
    activeCerts.forEach((cert) => {
      paragraphs.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: cert.name,
              font,
              bold: true,
              size: Math.round(baseSize * 0.92),
              color: headingHex,
            }),
            cert.provider
              ? new TextRun({
                  text: `  (${cert.provider})`,
                  font,
                  size: Math.round(baseSize * 0.92),
                  color: accentHex,
                })
              : new TextRun(""),
          ],
        })
      );
    });
  }

  // Create the Document with A4 margins
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906, // A4 in twips
              height: 16838,
            },
            margin: {
              top: convertInchesToTwip(0.4),
              bottom: convertInchesToTwip(0.4),
              left: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err: any) {
    console.error("DOCX generation failed:", err);
    throw new Error(err?.message || "Failed to generate Word document.");
  }
}
