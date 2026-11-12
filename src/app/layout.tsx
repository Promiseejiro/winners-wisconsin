import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ChurchSettingsProvider } from "@/providers/church-settings-provider";

export const metadata: Metadata = {
  title: "Winners Chapel · Video Hero",
  description: "Winners Chapel International - Building Lives Through Faith",
};

const fontVariables: CSSProperties = {
  "--font-inter": "Arial, Helvetica, sans-serif",
  "--font-cormorant": "Georgia, 'Times New Roman', serif",
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={fontVariables} className="antialiased bg-transparent">
        <ChurchSettingsProvider>
          <Header />
          <main className="max-w-screen overflow-hidden">{children}</main>
          <div id="modal-root" />
          <Footer />
        </ChurchSettingsProvider>
      </body>
    </html>
  );
}
