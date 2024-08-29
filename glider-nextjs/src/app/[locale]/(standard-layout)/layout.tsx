import { Inter } from "next/font/google"
import NavBar from "./nav-bar"
import "@/app/globals.css"

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          <main>
            <div className="max-w-screen-2xl mx-auto">
              {children}
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
