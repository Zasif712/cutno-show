// app/layout.tsx
import React from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = { title: "CutNoShow", description: "" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <nav className="p-4 bg-white shadow flex space-x-4">
          <Link href="/" className="font-semibold hover:underline">Home</Link>
          <Link href="/dashboard" className="font-semibold hover:underline">Dashboard</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
