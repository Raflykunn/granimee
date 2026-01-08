"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { Toaster } from "sonner";
import { KamiNavbar } from "./components/navbarkami";
import { KamiSidebar } from "./components/sidebarkami";

export default function UploadLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="mx-auto flex justify-center items-center relative">
        <div className="relative ">
          <KamiNavbar/>
        </div>
        <SidebarProvider>
          <KamiSidebar />
          <SidebarInset>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </div>
  );
}
