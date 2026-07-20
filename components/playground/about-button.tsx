import Link from "next/link";

export function AboutButton() {
  return (
    <Link
      href="/about"
      className="flex h-10 cursor-pointer items-center rounded-xl px-3.5 text-[13px] font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97] md:h-9"
    >
      About
    </Link>
  );
}
