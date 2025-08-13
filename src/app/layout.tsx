import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Sora, JetBrains_Mono, Lora, Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-robotomono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sniper Post Prompt gpt-5",
  description: "Application de partage et stylisation de prompts avec export PNG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${sora.variable} ${jetbrains.variable} ${lora.variable} ${outfit.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
