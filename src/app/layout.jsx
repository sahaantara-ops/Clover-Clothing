import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
import TopBar from "@/components/TopBar/TopBar";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { CartProvider } from "../Context/CartContext";

const rubik = Rubik({
  weight: ["300","400","500","600","700","800","900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${rubik.className} antialiased bg-gray-200`}>

        <NextAuthProvider>

          {/* Cart context available to entire app */}
          <CartProvider>

            <header className="md:w-full mx-auto">
              <TopBar />
              <Navbar />
            </header>

            <main className="px-5 py-2 md:w-11/12 mx-auto min-h-[calc(100vh-330px)]">
              {children}
            </main>

            <Footer />

          </CartProvider>

        </NextAuthProvider>

      </body>
    </html>
  );
}