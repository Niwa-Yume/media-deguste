import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { MotionConfig } from "framer-motion";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "La Déguste Le goût. L’art. Le temps.",
  description:
    "La Déguste, média digital genevois dédié à la gastronomie haut de gamme : artisans, vins, charcuterie, fromages, lieux d’exception.",
  metadataBase: new URL("https://la-deguste.example"),
  openGraph: {
    title: "La Déguste — Le goût. L’art. Le temps.",
    description:
      "Un média où le design, le goût et l’artisanat se rencontrent. Genève n’a jamais eu meilleur goût.",
    url: "https://la-deguste.example",
    siteName: "La Déguste",
    images: [{ url: "/image/logo.png", width: 1200, height: 630, alt: "La Déguste" }],
    type: "website",
  },
  icons: {
    icon: [{ url: "/image/logo.png", type: "image/png", sizes: "192x192" }],
    apple: "/image/logo.png",
    shortcut: "/image/logo.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
        {/* Lien d’évitement pour les lecteurs d’écran / clavier */}
        <a href="#contenu" className="skip-link">Passer au contenu principal</a>
        <MotionConfig reducedMotion="user">
          <LenisProvider>
            {children}
          </LenisProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
