import { SiteHeader } from "@/components/site-header";
import { PlaygroundClient } from "@/components/playground/playground-client";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <SiteHeader />
      <main className="min-h-0 flex-1">
        <PlaygroundClient />
      </main>
    </div>
  );
}
