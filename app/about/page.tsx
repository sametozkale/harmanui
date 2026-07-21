import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { AboutPageContent } from "@/components/about/about-page";

const ABOUT_DESCRIPTION =
  "Harman UI is an open-source interface kit for discovering, customizing and copying HeroUI components.";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
};

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <AboutPageContent />
      </main>
    </div>
  );
}
