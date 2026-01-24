import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Import the new Footer
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Vibe Culture",
  description: "Where the Underground Meets the Spotlight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            
            {/* The 'flex-grow' class on <main> pushes the footer to the bottom 
               of the viewport even if the page content is short. 
            */}
            <main className="flex-grow">
              {children}
            </main>

            <Footer /> 
          </div>
        </Providers>
      </body>
    </html>
  );
}