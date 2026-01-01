"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { Toaster } from "sonner";

export default function AnimeDetailPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <ReactQueryProvider>
        <div className="flex justify-center items-center">
          <Navbar />
        </div>
        <SidebarProvider className="">
          <AppSidebar />
          <SidebarInset className="my-12 mx-4">{children}</SidebarInset>
          <Toaster />
        </SidebarProvider>
        <Footer />
      </ReactQueryProvider>
    </div>
  );
}
