import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live Football",
  description: "Exibe informações de partidas de futebol ao vivo do mundo inteiro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
