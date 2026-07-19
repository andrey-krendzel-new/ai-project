import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Research Agent",
  description: "Modern AI research assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}