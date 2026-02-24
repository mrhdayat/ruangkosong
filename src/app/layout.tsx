import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/* ── Typography System ─────────────────────────────────────────
   Display: Space Grotesk Light (300) — geometric, thin, monumental
   Body:    Cormorant Garamond Regular (400) — classic serif, editorial
──────────────────────────────────────────────────────────────── */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

/* ── SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Museum Ruang Kosong — Keheningan yang Berbicara",
  description:
    "Museum seni kontemporer yang percaya bahwa ruang kosong adalah elemen seni paling kuat. Sebuah pengalaman digital yang kontemplatif dan imersif.",
  keywords: [
    "museum seni kontemporer",
    "contemporary art",
    "galeri seni",
    "ruang kosong",
    "negative space",
    "minimalis",
  ],
  openGraph: {
    title: "Museum Ruang Kosong",
    description:
      "Keheningan yang Berbicara — Ruang kosong adalah elemen seni yang paling kuat.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
