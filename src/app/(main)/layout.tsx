"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function AnimeDetailPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <div className="flex justify-center items-center">
          <Navbar />
        </div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
