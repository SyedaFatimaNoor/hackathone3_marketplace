import BackToTop from "@/components/BackToTop";
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";  
import { LanguageProvider } from "@/context/LanguageContext";  
import { Toaster } from 'sonner';  
import { ClerkProvider } from "@clerk/nextjs"

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
    <ClerkProvider>
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <LanguageProvider>
          <CartProvider>  
            {children}
            <Toaster /> 
          </CartProvider>
        </LanguageProvider>
        <BackToTop />
      </body>
    </html>
    </ClerkProvider>
  );
}