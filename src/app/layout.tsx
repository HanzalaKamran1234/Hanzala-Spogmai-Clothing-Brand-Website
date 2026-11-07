import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { SearchModal } from "@/components/ui/SearchModal";
import { Toast } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SPOGMAI — Premium Men's Clothing & Sartorial E-Commerce",
  description: "Refined menswear where timeless sophistication meets modern character. Pure raw silk prince coats, Irish linen kurtas, Italian wool suiting, and bespoke tailoring in Pakistan.",
  keywords: "SPOGMAI, men's clothing Pakistan, luxury menswear, bespoke prince coat, Pakistani mens fashion, raw silk kurta, Italian wool tuxedo, cash on delivery menswear",
  openGraph: {
    title: "SPOGMAI — WEAR THE LEGACY",
    description: "Crafted for Men. Designed to Last. Discover refined menswear where timeless sophistication meets modern character.",
    type: "website",
    locale: "en_PK",
    url: "https://spogmai.com",
    siteName: "SPOGMAI Menswear",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
