export const FONT_OPTIONS = [
  { id: "Inter", name: "Inter (Modern Clean Sans)", fontFamily: "'Inter', sans-serif" },
  { id: "Georgia", name: "Georgia (Classic Serif)", fontFamily: "'Georgia', serif" },
  { id: "Garamond", name: "Garamond (Editorial Serif)", fontFamily: "'Garamond', 'Times New Roman', serif" },
  { id: "Roboto", name: "Roboto (Neutral Technical Sans)", fontFamily: "'Roboto', sans-serif" },
  { id: "Merriweather", name: "Merriweather (Warm Serif)", fontFamily: "'Merriweather', serif" },
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
