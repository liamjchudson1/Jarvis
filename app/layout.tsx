import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service Generator | Free Preview — $9.99",
  description:
    "Generate a legally-structured Privacy Policy or Terms of Service in minutes. Answer 10 simple questions and get a professional document instantly. One-time $9.99 — no subscriptions.",
  keywords:
    "privacy policy generator, terms of service generator, terms and conditions generator, website privacy policy, app privacy policy, shopify privacy policy, free privacy policy",
  openGraph: {
    title: "Privacy Policy & Terms Generator — Get Yours in 5 Minutes",
    description:
      "Answer 10 questions. Get a professional Privacy Policy or Terms of Service document. One-time $9.99 payment — no subscriptions.",
    type: "website",
    url: "https://policygenerator.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Terms Generator",
    description: "Get a professional Privacy Policy or ToS doc in 5 minutes. $9.99 one-time.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
