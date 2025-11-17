import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import Head from "./head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HoraMed",
  description: "HoraMed - sua agenda médica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          expand={true}
          toastOptions={{
            classNames: {
              toast: "bg-white dark:bg-slate-950 dark:border-slate-800",
              info: "!text-slate-600",
              success: "!text-green-500",
              error: "!text-red-500",
              warning: "!text-orange.500",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
