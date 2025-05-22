import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProgressBar from "./components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Longtai Auto Rwanda",
  description:
    "Longtai Auto is a company that specialized in car sales in rwanda",
  icons: {
    icon: "/longtaiico.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Longtai Auto is Rwanda's trusted destination for quality car sales. Find affordable new and used vehicles, expert service, and unbeatable deals tailored to your needs."
        />
        <meta
          name="google-site-verification"
          content="VEuFtkOQlQ_46YEYNo0EjQEN7e00NYO7QVrmvRtiAKg"
        />
        <link rel="shortcut icon" href="longtai.png" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/assets/longtaiafc.png" />

        <meta
          name="keywords"
          content="Longtai Auto, car sales Rwanda, used cars Rwanda, buy cars Kigali, auto dealership Rwanda"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Orbitron:wght@400..900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/app/styles/nprogress.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
