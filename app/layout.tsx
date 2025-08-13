import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdulsamad Oladayo Yusuf portfolio",
  description: "Created by Abdulsamad Oladayo Yusuf",
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
