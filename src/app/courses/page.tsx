import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cursos | Powered by IA",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/cursos",
  },
};

export default function CoursesRedirectPage() {
  redirect("/cursos");
}
