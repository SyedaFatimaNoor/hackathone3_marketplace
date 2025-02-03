import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import { CartProvider } from "@/context/CartContext";  
import { LanguageProvider } from "@/context/LanguageContext";  
import { Toaster } from 'sonner';  

export const metadata: Metadata = {  
  title: "Avion - Your One-Stop E-Commerce Shop",  
  description: "Discover a wide range of premium products at Avion. Enjoy seamless shopping, competitive prices, and exceptional customer service.",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            {children}
            <BackToTop />
            <Toaster />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
