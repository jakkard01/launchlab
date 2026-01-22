import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Powered by IA',
  description: 'Información legal sobre el uso de datos y cookies en Powered by IA.',
  robots: {
    index: false, // Recomendado al principio para evitar indexar contenido legal boilerplate
    follow: true,
  },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen w-full px-6 py-32 max-w-4xl mx-auto text-slate-300">
      <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* Efecto de luz decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <header className="mb-10 border-b border-white/10 pb-8 relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-cyan-400 font-mono text-sm">
            Última actualización: Noviembre 2025
          </p>
        </header>
        
        <div className="space-y-8 text-sm md:text-base leading-relaxed font-light relative z-10">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-500">01.</span> Introducción
            </h2>
            <p>
              Bienvenido a <strong>Powered by IA</strong> (&quot;nosotros&quot;, &quot;nuestro&quot;). Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
              Esta política explica cómo tratamos la información cuando visitas nuestra web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-500">02.</span> Uso de Cookies
            </h2>
            <p className="mb-4">
              Utilizamos cookies propias y de terceros para mejorar la experiencia de navegación.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400 marker:text-cyan-500">
              <li><strong>Esenciales:</strong> Necesarias para que la web funcione correctamente.</li>
              <li><strong>Analíticas:</strong> Nos ayudan a entender qué contenido te gusta más (Google Analytics, Vercel Analytics).</li>
              <li><strong>Marketing:</strong> (A futuro) Para mostrarte anuncios relevantes si implementamos Ads.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-500">03.</span> Recopilación de Datos
            </h2>
            <p>
              Actualmente, no tenemos bases de datos de usuarios registrados. Si nos contactas por email o formularios, 
              usaremos tus datos (nombre, correo) <strong>únicamente</strong> para responderte. No vendemos tu información a terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-500">04.</span> Tus Derechos (RGPD)
            </h2>
            <p>
              Cumpliendo con la normativa europea, tienes derecho a acceder, rectificar, limitar o eliminar tus datos. 
              Para ejercer estos derechos, simplemente escríbenos.
            </p>
          </section>

          <section className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
            <div>
              <h3 className="text-white font-bold mb-1">Contacto Legal</h3>
              <p className="text-xs text-slate-400">Alcalá de Henares, Madrid, España.</p>
            </div>
            <a 
              href="mailto:poweredbyiaoficial@gmail.com" 
              className="text-cyan-400 hover:text-white transition-colors text-sm font-bold border border-cyan-500/30 px-4 py-2 rounded-full hover:bg-cyan-950/50 hover:border-cyan-400"
            >
              poweredbyiaoficial@gmail.com
            </a>
          </section>

        </div>
      </div>
    </main>
  );
}
