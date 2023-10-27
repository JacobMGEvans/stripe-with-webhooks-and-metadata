import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Stripe with Webhooks & Metadata",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-800 h-screen">
          <header className="flex justify-end p-5 pr-10">
            <UserButton />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
