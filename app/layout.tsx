import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast/toast-provider";

export const metadata: Metadata = {
  title: {
    default: "Cartly – Modern E-commerce Store",
    template: "%s | Cartly",
  },
  description:
    "Cartly is a modern e-commerce platform offering quality products, secure payments, fast checkout, and a seamless shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
