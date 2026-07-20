import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Harman UI is an open-source interface kit for discovering, customizing and copying HeroUI components.",
};

export default function AboutRoute() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <SiteHeader />
      <AboutPage />
    </div>
  );
}
