import type { Metadata } from "next";
import { inter, jetbrainsMono, openRunde, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Harman UI — Discover, customize & copy HeroUI components",
    template: "%s · Harman UI",
  },
  description:
    "An open-source UI kit documentation & playground built on HeroUI (React Aria) and Tailwind CSS v4. Browse components, tweak tokens live in OKLCH, and copy production-ready code.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${openRunde.variable} ${jetbrainsMono.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
