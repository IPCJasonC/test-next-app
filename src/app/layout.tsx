import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northland Composites Production Order Tracker",
  description: "Internal web application for tracking production orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ fontFamily: '"Inter", "Segoe UI", sans-serif' }}>
      <body className="min-h-full flex flex-col bg-[#F0F4F1]">
        <nav className="bg-[#1A4D2E] text-white p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold">Northland Composites</h1>
            <p className="text-sm">Production Order Tracker</p>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
