import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerCraft — Free, No-Login Single-Page Resume Builder",
  description:
    "Build a professional, strictly one-page resume in minutes. No sign-up, continuous live preview, and pixel-accurate export to PDF, Word (DOCX), PNG, and JPG.",
  keywords: ["resume builder", "free resume maker", "single page resume", "A4 resume", "export to PDF", "export to Word"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-blue-500/20 selection:text-blue-700 dark:selection:text-blue-300">
        {children}
      </body>
    </html>
  );
}
