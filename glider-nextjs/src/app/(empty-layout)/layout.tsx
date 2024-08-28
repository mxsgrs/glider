import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next"
 
export const metadata: Metadata = {
  title: "Glider | Global logistics",
  description: "Welcome to your page.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}