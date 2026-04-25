import type { Metadata } from 'next';
import LegalPageShell from '../components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description:
    'Aviso legal mínimo de Powered by IA: titularidad, uso del sitio, propiedad intelectual y contacto.',
};

export default function AvisoLegalPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Aviso legal"
      description="Este aviso deja publicada la información mínima para operar la web de Powered by IA con claridad y sin ruido."
      sections={[
        {
          title: 'Titular del sitio',
          paragraphs: [
            'Titular: Powered by IA.',
            'Contacto: poweredbyiaoficial@gmail.com.',
            'Finalidad: presentar servicios digitales, captar solicitudes y derivar conversaciones comerciales por WhatsApp o email.',
          ],
        },
        {
          title: 'Uso del sitio',
          paragraphs: [
            'El contenido del sitio tiene finalidad informativa y comercial. No sustituye una propuesta cerrada, un contrato ni asesoramiento especializado.',
            'El acceso y la navegación implican aceptar un uso razonable del contenido, sin manipular, copiar o explotar el material sin autorización.',
          ],
        },
        {
          title: 'Propiedad intelectual',
          paragraphs: [
            'Salvo indicación distinta, textos, estructura, capturas y elementos de marca pertenecen a Powered by IA o se usan con permiso.',
            'No se autoriza la reutilización total o parcial del contenido con fines comerciales sin consentimiento previo.',
          ],
        },
      ]}
      footerNote="Si detectas un error legal o de contacto, escríbenos a poweredbyiaoficial@gmail.com para revisarlo cuanto antes."
    />
  );
}
