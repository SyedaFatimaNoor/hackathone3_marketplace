import type { Metadata } from "next";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import { CartProvider } from "@/context/CartContext";  
import { LanguageProvider } from "@/context/LanguageContext";  
import { Toaster } from 'sonner';  
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import ClerkAuthHandler from '@/components/ClerkAuthHandler';

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
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#2A254B',
            },
            elements: {
              formButtonPrimary: 'bg-[#2A254B] hover:bg-[#3A355B] text-white',
              card: 'shadow-2xl'
            }
          }}
          afterSignInUrl="/"
          afterSignUpUrl="/"
        >
          <ClerkAuthHandler />
          <LanguageProvider>
            <CartProvider>
                {children}
              <BackToTop />
              <Toaster richColors />
            </CartProvider>
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
