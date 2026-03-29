import type { Metadata } from 'next';
import LegalPageShell from '../components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Política de cookies de Powered by IA: cookies técnicas mínimas y ausencia de analítica en esta versión.',
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Política de cookies"
      description="La versión actual del sitio no usa analítica, publicidad ni seguimiento de terceros."
      sections={[
        {
          title: 'Qué cookies usa esta versión',
          paragraphs: [
            'En esta implementación no activamos cookies analíticas ni publicitarias.',
            'Solo podrían existir cookies técnicas mínimas si una funcionalidad futura las necesitara para operar de forma básica y segura.',
          ],
        },
        {
          title: 'Consentimiento',
          paragraphs: [
            'Como no hay cookies no exentas ni medición de terceros, no mostramos un banner de consentimiento en esta versión.',
            'Si en el futuro añadimos analítica, píxeles o herramientas equivalentes, se incorporará la capa de consentimiento antes de activarlas.',
          ],
        },
      ]}
      footerNote="Si quieres una explicación más detallada de la configuración técnica, escríbenos y la revisamos contigo."
    />
  );
}
