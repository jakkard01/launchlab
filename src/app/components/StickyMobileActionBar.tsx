import Link from "next/link";

type StickyMobileActionBarProps = {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export default function StickyMobileActionBar({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: StickyMobileActionBarProps) {
  return (
    <div
      className="sticky-cta fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/85 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)] backdrop-blur md:hidden"
      data-fab-avoid
    >
      <div className="mx-auto flex w-full max-w-md gap-3">
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-emerald-300/60 bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
        >
          {primaryLabel}
        </a>
        <Link
          href={secondaryHref}
          className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/60"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
