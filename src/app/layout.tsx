import "./globals.css";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import SWRConfigContext from "@/context/SWRConfigContext";

const openSana = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Listargram",
    template: "Listargram | %s",
  },
  description: "Listargram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={openSana.className} lang='en'>
      <body className='w-full max-w-6xl overflow-auto mx-auto'>
        <AuthContext>
          <header className='sticky top-0 shadow shadow-indigo-300'>
            <Navbar />
          </header>
          <SWRConfigContext>
            <main>{children}</main>
          </SWRConfigContext>
        </AuthContext>
        <div id='portal' />
      </body>
    </html>
  );
}
