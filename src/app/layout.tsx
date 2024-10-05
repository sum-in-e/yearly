import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanstackQueryProvider from "@/components/TanstackQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Yearly",
  description: "실현할 일을 기록하고 이뤄내세요!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackQueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="p-4">{children}</main>
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
