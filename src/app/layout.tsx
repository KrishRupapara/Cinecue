import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Cine Cue",
  description: "The best movies list for cinephiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(GeistSans.className, "relative h-full antialiased")}>
        <main className="relative flex flex-col min-h-screen overflow-x-hidden bg-bg_primary">
          <Navbar />
          <div className="flex-1 flex-grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
