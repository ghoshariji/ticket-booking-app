import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/provider";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
