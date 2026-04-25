import type { Metadata } from 'next';
import LegalPageShell from '../components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Política de privacidad mínima de Powered by IA: datos tratados, finalidad, base y derechos.',
};

export default function PrivacidadPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Política de privacidad"
      description="Esta política resume cómo tratamos los datos que llegan por WhatsApp, email o navegación básica en la web."
      sections={[
        {
          title: 'Datos que podemos recibir',
          paragraphs: [
            'Podemos recibir datos de contacto y contenido del mensaje si escribes por WhatsApp o email.',
            'No hay formularios complejos ni captación automatizada avanzada en esta fase del sitio.',
          ],
        },
        {
          title: 'Para qué se usan',
          paragraphs: [
            'Usamos esos datos para responder solicitudes, preparar presupuestos y continuar una conversación comercial si lo pides.',
            'No vendemos los datos a terceros ni los usamos para fines distintos de la gestión del contacto y la relación comercial.',
          ],
        },
        {
          title: 'Conservación y derechos',
          paragraphs: [
            'Conservamos la información el tiempo necesario para responder y dar seguimiento al contacto, o el tiempo exigido por la ley si existe una relación contractual.',
            'Puedes pedir acceso, rectificación, supresión u oposición escribiendo a poweredbyiaoficial@gmail.com.',
          ],
        },
      ]}
      footerNote="Si en el futuro se añade una captación más avanzada, esta política se actualizará para reflejarlo con precisión."
    />
  );
}
