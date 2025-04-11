import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"; // см. ниже

export const metadata: Metadata = {
  title: "Dominum",
  description: "Crypto Meta dApp Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
