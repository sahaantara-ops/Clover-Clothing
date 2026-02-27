import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
import TopBar from "@/components/TopBar/TopBar";


const poppins = Rubik({
  weight: ['300','400','500','600','700','800','900'],
  subsets: ["latin"],
});



export const metadata = {
  metadataBase: new URL("https://clover-clothing.vercel.app"),

  title: {
    default: "Clover-Clothing",
    template: "%s | Clover Clothing",
  },

  description:
    "Discover high-quality products at Clover Clothing. Shop the latest collections with fast delivery and secure checkout.",

  applicationName: "Clover Clothing",

  keywords: [
    "ecommerce",
    "online store",
    "buy products online",
    "best deals",
    "shop online"
  ],

  authors: [{ name: "Your Company Name" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",

  icons: {
    icon: "https://ibb.co.com/NdqY0XGp",
    shortcut: "https://ibb.co.com/NdqY0XGp",
    apple: "https://ibb.co.com/NdqY0XGp",
  },

  openGraph: {
    type: "website",
    url: "https://clover-clothing.vercel.app",
    siteName: "Clover Clothing",
    title: "Clover Clothing – Premium Online Shopping",
    description:
      "Shop premium products with secure checkout and fast delivery.",
    images: [
      {
        url: "https://ibb.co.com/ycR0QJcr", // homepage preview
        width: 1200,
        height: 630,
        alt: "Your Store Homepage Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Clover Clothing – Premium Online Shopping",
    description:
      "Discover amazing products at unbeatable prices.",
    images: ["https://ibb.co.com/ycR0QJcr"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  category: "ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased bg-gray-200`}>
        <header className=" md:w-full gap-0 mx-auto">
          <TopBar/>
          <Navbar />
        </header>

        <main  className="px-5 py-2 md:w-11/12 mx-auto min-h-[calc(100vh-330px)]">
          {children}
        </main>
        

        

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}