"use client";

import SocialLinks from "./SocialLinks";
import { siteConfig } from "../../lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-16 w-full border-t border-white/10 bg-black/60 px-4 py-10 text-sm text-slate-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-white">{siteConfig.brand}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
            Sistemas IA listos para vender y escalar
          </p>
        </div>
        <SocialLinks
          source="footer"
          className="flex flex-wrap items-center gap-4"
          linkClassName="text-sm font-semibold text-slate-300 hover:text-white transition"
        />
      </div>
      <div className="mx-auto mt-6 w-full max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {siteConfig.brand}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
