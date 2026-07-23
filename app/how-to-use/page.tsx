import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { HowToUsePageContent } from "@/components/how-to-use/how-to-use-page";

const HOW_TO_USE_DESCRIPTION =
  "Install Harman UI in your project, customize components in the playground, copy production-ready code, and share designs with your team.";

export const metadata: Metadata = {
  title: "How to use",
  description: HOW_TO_USE_DESCRIPTION,
};

export default function HowToUsePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <HowToUsePageContent />
      </main>
    </div>
  );
}
