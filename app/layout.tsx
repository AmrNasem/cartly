import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartly – Modern E-commerce Store",
  description:
    "Cartly is a modern e-commerce platform offering quality products, secure payments, fast checkout, and a seamless shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
