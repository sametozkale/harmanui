import Link from "next/link";
import { GITHUB_REPO, KIT_NAME } from "@/lib/registry/registry";
import { Reveal } from "@/components/landing/reveal";

const LABEL = "text-[11px] font-medium uppercase tracking-[0.22em] text-[#8b8b85]";

const PILLARS = [
  {
    index: "01",
    title: "The playground",
    body: "Every component rendered live under your hand. Type, color, radius, shadow and motion respond the moment you move them — the preview is the product.",
  },
  {
    index: "02",
    title: "Color in OKLCH",
    body: "Color measured the way eyes measure it. Equal lightness reads as equal lightness — in the picker, in the swatch, and in the emitted code.",
  },
  {
    index: "03",
    title: "Honest code",
    body: "The TSX you copy is the artifact you shaped. Nothing is exported, translated or approximated — the render and the code are one.",
  },
  {
    index: "04",
    title: "A readable registry",
    body: "Components, tokens and variants described as plain data. One command installs the kit; your tools and agents can read the rest.",
  },
] as const;

const FOUNDATIONS = [
  {
    name: "React Aria",
    body: "Accessibility as the foundation, not a patch applied later.",
  },
  {
    name: "Tailwind CSS v4",
    body: "Tokens compiled at build time, not computed at runtime.",
  },
  {
    name: "OKLCH",
    body: "One perceptual color space, from picker to production.",
  },
  {
    name: "MIT License",
    body: "Open source, permissive. No terms to outgrow.",
  },
] as const;

const NOTES = [
  {
    date: "06 · 2026",
    title: "Defaults are decisions",
    excerpt: "Every default in a component library is a choice someone made without you.",
  },
  {
    date: "05 · 2026",
    title: "The preview is the source",
    excerpt: "When the render and the code are one artifact, review becomes seeing.",
  },
  {
    date: "04 · 2026",
    title: "Color you can reason about",
    excerpt: "Why every swatch, track and token in the kit speaks native oklch().",
  },
] as const;

export function AboutPage() {
  return (
    <main className="lp min-h-0 flex-1 overflow-y-auto bg-[#1a1a1a] text-[#f0efeb] antialiased">
      <section className="px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1120px] pb-32 pt-16 sm:pb-44 sm:pt-24 lg:pt-28">
          <p className={`lp-rise ${LABEL}`}>Harman — an open-source interface kit</p>

          <h1
            className="font-title lp-rise mt-9 max-w-[16ch] text-[42px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[64px] lg:text-[84px]"
            style={{ animationDelay: "90ms" }}
          >
            Interfaces are decisions. Make them where you can{" "}
            <span className="text-[#0090ff]">see them.</span>
          </h1>

          <p
            className="lp-rise mt-9 max-w-[520px] text-[16px] leading-[1.65] text-[#a3a39c] sm:text-[17px]"
            style={{ animationDelay: "180ms" }}
          >
            Every token — type, color, space, shadow, motion — sits in the open
            and moves under your hand. The code leaves exactly as it renders.
          </p>

          <div className="lp-rise mt-11" style={{ animationDelay: "270ms" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-md bg-[#f0efeb] px-6 py-3.5 text-[14px] font-medium text-[#1a1a1a] transition-opacity hover:opacity-80"
            >
              Enter the playground
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1120px] py-28 sm:py-40">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <Reveal>
              <p className={LABEL}>The problem</p>
            </Reveal>

            <div className="max-w-[620px] space-y-8">
              <Reveal>
                <p className="text-[17px] leading-[1.65] text-[#a3a39c] sm:text-[19px]">
                  The cost of producing an interface has collapsed. A screen
                  that once took a team a sprint now takes a sentence.
                  Production is no longer the constraint.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-[17px] leading-[1.65] text-[#a3a39c] sm:text-[19px]">
                  Judgement is. Component libraries answered repetition and
                  stopped — a thousand decisions shipped as defaults, hidden
                  behind an import. You inherit another team&rsquo;s taste and
                  call it a system.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="font-title text-[22px] font-medium leading-[1.35] tracking-[-0.01em] text-[#f0efeb] sm:text-[26px]">
                  A decision you cannot see is not yours.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1120px] py-28 sm:py-40">
          <Reveal>
            <p className={LABEL}>The kit</p>
          </Reveal>

          <div className="mt-12">
            {PILLARS.map((pillar, index) => (
              <Reveal key={pillar.index} delay={index * 60}>
                <div className="grid gap-3 border-t border-white/10 py-10 last:border-b sm:grid-cols-[72px_minmax(0,300px)_minmax(0,1fr)] sm:items-baseline">
                  <span className="font-geist-mono text-[12px] text-[#8b8b85]">
                    {pillar.index}
                  </span>
                  <h2 className="font-title text-[20px] font-medium tracking-[-0.01em] sm:text-[22px]">
                    {pillar.title}
                  </h2>
                  <p className="max-w-[480px] text-[15px] leading-[1.65] text-[#a3a39c]">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1120px] py-28 sm:py-40">
          <Reveal>
            <p className={LABEL}>Foundations</p>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDATIONS.map((foundation, index) => (
              <Reveal key={foundation.name} delay={index * 60}>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-title text-[16px] font-medium">{foundation.name}</p>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[#a3a39c]">
                    {foundation.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1120px] py-28 sm:py-40">
          <Reveal>
            <p className={LABEL}>Notes</p>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-3">
            {NOTES.map((note, index) => (
              <Reveal key={note.title} delay={index * 60}>
                <article className="border-t border-white/10 pt-6">
                  <p className="font-geist-mono text-[12px] text-[#8b8b85]">{note.date}</p>
                  <h3 className="font-title mt-4 text-[18px] font-medium tracking-[-0.01em]">
                    {note.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-[#a3a39c]">
                    {note.excerpt}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[1120px] py-32 sm:py-48">
          <Reveal>
            <h2 className="font-title max-w-[20ch] text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[48px]">
              A system is a set of decisions. Start making yours.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 rounded-md bg-[#f0efeb] px-6 py-3.5 text-[14px] font-medium text-[#1a1a1a] transition-opacity hover:opacity-80"
              >
                Open the playground
                <span aria-hidden>→</span>
              </Link>
              <code className="font-geist-mono text-[13px] text-[#8b8b85]">
                $ npx {KIT_NAME} init
              </code>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 py-10 text-[13px] text-[#8b8b85] sm:flex-row sm:items-center sm:justify-between">
          <p>Harman UI — MIT licensed. Built on React Aria and Tailwind CSS v4.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="transition-colors hover:text-[#f0efeb]">
              Playground
            </Link>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-[#f0efeb]"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
