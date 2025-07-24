import type { Metadata } from "next";
import { Plus_Jakarta_Sans as PlusJakartaSansFont } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ClientLayoutWrapper from "@/components/layout/LayoutWrapper";

const plusJakartaSans = PlusJakartaSansFont({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airban Homes | Premium Doors & Real Estate Solutions",
  description:
    "Discover the best in real estate and premium door solutions with Airban Homes. Buy, rent, or upgrade your space with trusted property experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0e4783" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${plusJakartaSans.className} antialiased bg-airbanBlue animate-fade min-h-screen flex flex-col`}
      >
        <>
          <Header />
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <Footer />
        </>
      </body>
    </html>
  );
}
