import type { Metadata } from "next";
import { Wix_Madefor_Display, Tiro_Kannada } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../lib/i18n";
import { Navbar, Footer } from "../components/layout/GlobalNav";

const wixMadefor = Wix_Madefor_Display({
  variable: "--font-wix-madefor",
  subsets: ["latin"],
});

const tiroKannada = Tiro_Kannada({
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-tiro-kannada",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sawabona Motion Engine",
  description: "Next Generation Programmatic Video",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${wixMadefor.variable} ${tiroKannada.variable} antialiased selection:bg-[#9780FF] selection:text-white bg-[#0C0B0C] text-white font-sans`}>
        <I18nProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
