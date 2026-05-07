import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SonnerProvider } from "@/components/providers/sonner-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ACK St Paul's Parish South C | Nairobi, Kenya",
  description: "A modern Anglican church in South C, Nairobi. Join us for worship, spiritual growth, and community engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ackimage.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
        <SonnerProvider />
      </body>
    </html>
  );
}
