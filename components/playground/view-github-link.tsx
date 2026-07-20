import { ArrowUpRight } from "@/lib/icons";
import { GithubIcon } from "@/components/icons";

export function ViewGithubLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex h-10 cursor-pointer items-center gap-2 rounded-xl px-3.5 text-[13px] font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97] md:h-9"
    >
      <GithubIcon className="size-4" />
      View on GitHub
      <ArrowUpRight className="size-3.5" strokeWidth={2} />
    </a>
  );
}
