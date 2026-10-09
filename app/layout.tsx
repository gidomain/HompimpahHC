import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "H2C",
  description: "Raw energy. Future anarchy. Hardcore band from Bogor, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=UnifrakturCook:wght@700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-bone antialiased grain">
        {children}
      </body>
    </html>
  );
}