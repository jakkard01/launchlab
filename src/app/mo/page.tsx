import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "RYS Mini Market",
  description: "Retiro en La Gloria, San Salvador.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MoPage() {
  redirect("/RYSminisuper");
}
