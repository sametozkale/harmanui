import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Harman UI is an open-source interface kit for discovering, customizing and copying HeroUI components.",
};

export default function AboutPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <SiteHeader />
      <main className="min-h-0 flex-1" />
    </div>
  );
}
