import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Homepage",
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
