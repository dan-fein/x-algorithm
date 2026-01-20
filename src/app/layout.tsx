import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "X Algorithm Decoded | How Posts Succeed or Fail",
  description: "A comprehensive technical analysis of the X (Twitter) recommendation algorithm. Understand the 19 engagement signals, scoring formulas, and filters that determine your post's reach.",
  keywords: ["X algorithm", "Twitter algorithm", "recommendation system", "engagement", "social media"],
  authors: [{ name: "Algorithm Analysis" }],
  openGraph: {
    title: "X Algorithm Decoded",
    description: "Technical breakdown of what makes posts succeed or fail on X",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} antialiased font-mono`}>
        {children}
      </body>
    </html>
  );
}
