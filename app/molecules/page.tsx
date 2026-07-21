import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { MoleculesComingSoon } from "@/components/molecules/coming-soon";

export const metadata: Metadata = {
  title: "Molecules",
  description: "Composed UI patterns for Harman UI. Coming soon.",
};

export default function MoleculesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <MoleculesComingSoon />
      </main>
    </div>
  );
}
