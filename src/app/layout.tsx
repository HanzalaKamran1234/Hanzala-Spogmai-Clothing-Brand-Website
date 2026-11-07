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
  title: "SPOGMAI — WEAR THE LEGACY | Official Store",
  description: "Refined luxury menswear where timeless sophistication meets modern character. Pure raw silk prince coats, Irish linen kurtas, Italian wool suiting, and bespoke tailoring in Pakistan.",
  keywords: "SPOGMAI, spogmai.store, men's clothing Pakistan, luxury menswear, bespoke prince coat, Pakistani mens fashion, raw silk kurta, Italian wool tuxedo, RJ Shopping Mall Gulshan-e-Jamal",
  openGraph: {
    title: "SPOGMAI — WEAR THE LEGACY",
    description: "Discover timeless style. Explore the collection. Handcrafted in Pakistan with pure natural silks, worsted wools, and generational tailoring.",
    type: "website",
    locale: "en_PK",
    url: "https://spogmai.store",
    siteName: "SPOGMAI",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-white min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
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
