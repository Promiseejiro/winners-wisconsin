import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Winners Chapel · Video Hero",
  description: "Winners Chapel International - Building Lives Through Faith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jost.variable} antialiased bg-transparent`}>
        <Header />
        <main className="max-w-screen overflow-hidden">{children}</main>
        <div id="modal-root"></div>
        <Footer />
      </body>
    </html>
  );
}
