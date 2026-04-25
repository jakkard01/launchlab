type Section = {
  title: string;
  paragraphs: string[];
};

export default function LegalPageShell({
  eyebrow,
  title,
  description,
  sections,
  footerNote,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: Section[];
  footerNote: string;
}) {
  return (
    <main className="min-h-screen bg-[#07111a] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.36),rgba(7,17,26,0.12))] px-5 py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[2px] sm:px-7 sm:py-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">
            {description}
          </p>
        </header>

        <div className="grid gap-4">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(7,17,26,0.18),rgba(7,17,26,0.08))] px-5 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[1px] sm:px-6"
            >
              <h2 className="text-base font-semibold text-white">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-white/76 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-white/66 sm:px-6">
          {footerNote}
        </footer>
      </div>
    </main>
  );
}
