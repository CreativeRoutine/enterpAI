import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EnterpAI App",
  description: "Translate like native speakers",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" className="bg-neutral-800 text-white h-full">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  h-full`}
        >
          {/* CUSTOM Layout */}

          {children}

          {/* END OF CUSTOM LAYOUT */}
          {/* <Toaster /> */}
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
