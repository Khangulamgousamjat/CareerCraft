export const FONT_OPTIONS = [
  { id: "Inter", name: "Inter (Modern Clean Sans)", fontFamily: "'Inter', system-ui, sans-serif" },
  { id: "Times New Roman", name: "Times New Roman (Academic & Executive Serif)", fontFamily: "'Times New Roman', Times, Baskerville, Georgia, serif" },
  { id: "Calibri", name: "Calibri (Modern Corporate Sans)", fontFamily: "'Calibri', 'Segoe UI', Candara, Arial, sans-serif" },
  { id: "Arial", name: "Arial (Universal Clean Sans)", fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" },
  { id: "Georgia", name: "Georgia (Classic Editorial Serif)", fontFamily: "'Georgia', serif" },
  { id: "Garamond", name: "Garamond (Distinguished Book Serif)", fontFamily: "'Garamond', 'EB Garamond', 'Times New Roman', serif" },
  { id: "Cambria", name: "Cambria (Business & Technical Serif)", fontFamily: "Cambria, Georgia, serif" },
  { id: "Roboto", name: "Roboto (Neutral Technical Sans)", fontFamily: "'Roboto', sans-serif" },
  { id: "Merriweather", name: "Merriweather (Warm Editorial Serif)", fontFamily: "'Merriweather', serif" },
  { id: "Lato", name: "Lato (Balanced Modern Sans)", fontFamily: "'Lato', sans-serif" },
  { id: "Open Sans", name: "Open Sans (Highly Legible Sans)", fontFamily: "'Open Sans', sans-serif" },
  { id: "Trebuchet MS", name: "Trebuchet MS (Dynamic Clean Sans)", fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', sans-serif" },
];

export const SWATCH_COLORS = [
  { name: "Power Blue", hex: "#2563EB" },
  { name: "Royal Blue", hex: "#1E40AF" },
  { name: "Dark Navy", hex: "#0B132B" },
  { name: "Slate Near-Black", hex: "#1E293B" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Burgundy Crimson", hex: "#991B1B" },
  { name: "Cool Gray", hex: "#475569" },
  { name: "Pure Black", hex: "#000000" },
];

export function getFontFamilyCss(fontId: string): string {
  const match = FONT_OPTIONS.find((f) => f.id === fontId);
  return match ? match.fontFamily : "'Inter', sans-serif";
}
