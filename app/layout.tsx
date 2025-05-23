import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Lexend_Deca } from "next/font/google";
import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";




const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})



export const metadata: Metadata = {
  title: "DressMauPays",
  description: "post all issues in your locality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={inter.variable}>
      <body
      >
        <Navbar/>
   {children}

       <Footer/>
      </body>
    </html>
  );
}
