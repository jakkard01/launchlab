import type { Metadata } from "next";
import MainContent from "./components/MainContent";

export const metadata: Metadata = {
  title: "Powered by IA | Sistemas comerciales con foco en captación y conversión",
  description:
    "Creamos sistemas comerciales, demos y activos digitales para negocios que quieren captar mejor, responder con más orden y convertir más.",
};

export default function HomePage() {
  return <MainContent />;
}
