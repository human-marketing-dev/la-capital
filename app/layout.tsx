import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import "./globals.css";

/* Display = Oswald (condensed industrial headlines, matches the compressed
   wordmark). Body = Barlow (sturdy humanist sans). Both are Google-Font
   substitutions for La Capital's unconfirmed official typeface — flag to client.
   Self-hosted via next/font (no external request, no layout shift). */
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Capital — Sellos hidráulicos, neumáticos y retenes",
    template: "%s · La Capital",
  },
  description:
    "El sello que tu equipo necesita: lo tenemos o lo fabricamos. +40,000 sellos en inventario de marcas premium, listos para enviar, con asesoría técnica. Sellos hidráulicos, neumáticos, retenes y O-rings.",
  metadataBase: new URL("https://selloslacapital.com"),
  openGraph: {
    title: "La Capital — Sellos hidráulicos, neumáticos y retenes",
    description:
      "El sello que tu equipo necesita: lo tenemos o lo fabricamos. +40,000 sellos en inventario, con asesoría técnica. Soluciones para la industria.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${oswald.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
