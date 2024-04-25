import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Commune-Wasm",
  description: "Commune-wasm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full mx-auto flex flex-col bg-white dark:bg-gray-900">
        <Provider>
          <main className="flex flex-col flex-1 w-full">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
