import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Powered by IA",
  description:
    "Agenda una llamada o escribe por WhatsApp Business para conocer nuestros servicios.",
};

const whatsappLink =
  "https://wa.me/34911528753?text=Hola%2C%20vengo%20desde%20poweredbyia.com.%20Quiero%20info%20de%20servicios%20y%20una%20demo.";
const email = "poweredbyiaoficial@gmail.com";

type ContactPageProps = {
  searchParams?: { source?: string };
};

const allowedSources = ["pricing", "portfolio", "demos", "services"] as const;

export default function ContactPage({ searchParams }: ContactPageProps) {
  const source =
    searchParams?.source && allowedSources.includes(searchParams.source as (typeof allowedSources)[number])
      ? searchParams.source
      : "contact";
  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-cyan-400/30 bg-black/70 p-10 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">
          Contacto
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Conversemos sobre tu próximo sistema IA
        </h1>
        <p className="mt-4 text-base text-slate-300">
          Respuesta en menos de 24 horas hábiles. Coordinamos una llamada breve
          para entender objetivos y proponer un roadmap claro.
        </p>

        <ContactForm source={source} />

        <div className="mt-10 flex flex-col gap-4">
          <a
            href={whatsappLink}
            className="rounded-full bg-emerald-400 px-6 py-4 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir WhatsApp Business"
          >
            WhatsApp Business (principal)
          </a>
          <a
            href={`mailto:${email}`}
            className="rounded-full border border-white/20 px-6 py-4 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
            aria-label="Enviar email"
          >
            {email}
          </a>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
          poweredbyia.com
        </p>
      </section>
    </main>
  );
}
