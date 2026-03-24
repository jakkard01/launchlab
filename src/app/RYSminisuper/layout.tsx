import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/rys/favicon/rys-mini-market-cart.svg",
    shortcut: "/rys/favicon/rys-mini-market-cart.svg",
    apple: "/rys/favicon/rys-mini-market-apple-touch.svg",
  },
};

export default function RysMiniSuperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="rys-shell">{children}</div>;
}
