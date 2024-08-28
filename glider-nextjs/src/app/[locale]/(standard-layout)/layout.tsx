import { Inter } from "next/font/google"
import NavBar from "./nav-bar"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>
          <div className="max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
