import './globals.css';

export const metadata = {
  title: 'Powered by IA',
  description: 'App web personal con perfil e IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
