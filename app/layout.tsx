import type { Metadata } from "next";
import "./growthring.css";
import Providers from "./providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
