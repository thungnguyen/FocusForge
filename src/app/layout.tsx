import type { Metadata } from "next";
import { Outfit, Merriweather, Itim } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
});

const itim = Itim({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-itim",
});

export const metadata: Metadata = {
  title: "FocusForge — Monk Mode Digital Workbook",
  description: "A premium 60-day visual self-discipline and productivity workbook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${merriweather.variable} ${itim.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-100 font-sans text-stone-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
