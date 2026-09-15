import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["400", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // TODO: update to the real production domain once known
  metadataBase: new URL("https://pyxis-landing.vercel.app"),
  title: "Pyxis — Recomponemos empresas y construimos las que operan sin personas",
  description:
    "Pyxis Labs recompone empresas existentes para hacerlas más eficientes y potentes sin cambiar su tamaño. Pyxis Ventures construye empresas que operan sin personas: Hermes, el Zero Man Wholesaler, es la primera.",
  openGraph: {
    title: "Pyxis — Recomponemos empresas y construimos las que operan sin personas",
    description:
      "Pyxis Labs recompone empresas existentes para hacerlas más eficientes y potentes sin cambiar su tamaño. Pyxis Ventures construye empresas que operan sin personas: Hermes, el Zero Man Wholesaler, es la primera.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pyxis — Recomponemos empresas y construimos las que operan sin personas",
    description:
      "Pyxis Labs recompone empresas existentes para hacerlas más eficientes y potentes sin cambiar su tamaño. Pyxis Ventures construye empresas que operan sin personas: Hermes, el Zero Man Wholesaler, es la primera.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-pyxis-bg font-display text-pyxis-fg antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
