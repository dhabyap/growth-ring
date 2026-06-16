import type { Metadata } from "next";
import "./growthring.css";

export const metadata: Metadata = {
  title: "GrowthRing",
  description: "Discovery network for active X users.",
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
