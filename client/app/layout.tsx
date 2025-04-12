import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { cn } from "@/lib/utils";

import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Providers from "@/components/Providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Skyline Publications",
  description: "This is Skyline publications website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const url = headers().get("x-url");
  
  const showHeaderFooter =
    !url?.includes("/login") && !url?.includes("/register");
  return (
    <html lang="en">
      <body
        className={cn(
          "lg:min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          {showHeaderFooter && <Header />}
          {children}
          <Toaster />
          {showHeaderFooter && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
