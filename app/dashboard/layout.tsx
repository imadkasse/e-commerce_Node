import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/dashboard/context/sidebarCont";
import Index from "@/components/dashboard/Index";
import NavBar from "@/components/dashboard/NavBar";
import SideBar from "@/components/dashboard/SideBar";
import AdminProvider from "@/components/dashboard/context/useAdmin";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AdminProvider>
            <NavBar />
            <div className="flex" suppressHydrationWarning>
              <SideBar />
              {children}
            </div>
          </AdminProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
