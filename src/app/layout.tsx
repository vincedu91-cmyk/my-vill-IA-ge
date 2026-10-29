import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My vill[IA]ge",
  description: "Le village des agents IA : la Direction MKD au travail dans son quartier 3D d'îles flottantes.",
  manifest: "/brand/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f2f0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${roboto.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
