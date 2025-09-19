import { Outfit } from "next/font/google";
import "./globals.css";
import "./style.css";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppHeaderFrontEnd from "@/layout/AppHeaderFrontEnd";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            {children}
            <Toaster position="bottom-right" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
