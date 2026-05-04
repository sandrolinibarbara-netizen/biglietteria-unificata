import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Menu from "@/app/_components/Menu";
import Footer from "@/app/_components/Footer";

const poppins = Poppins({
  weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ],
  subsets: ["latin-ext"],
});


export const metadata: Metadata = {
  title: "Musei Civici di Cremona",
  description: "Biglietteria unificata per i Musei Civici di Cremona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-black">
      <body
        className={`${poppins.className} antialiased`}
      >
      <Menu/>
        {children}
      <Footer/>
      </body>
    </html>
  );
}
