"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Archive, CalendarClock, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.
const data = [
  {
    title: "Home",
    url: "/home",
    icon: <Home className="w-5 h-5" />,
    isActive: false,
  },
  {
    title: "A-Z List",
    url: "/list-anime",
    icon: <Archive className="w-5 h-5" />,
    isActive: false,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: <CalendarClock className="w-5 h-5" />,
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navList, setNavList] = React.useState(data);
  const pathname = usePathname();

  React.useEffect(() => {
    setNavList((prev) =>
      prev.map((item) => {
        return { ...item, isActive: item.url === pathname };
      })
    );
  }, [pathname]);

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      {...props}
      className="relative"
    >
      <SidebarContent className="flex flex-col justify-center items-center px-4">
        <SidebarTrigger />
        <SidebarMenu className="flex flex-col gap-6">
          {navList.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="p-6"
              >
                <Link href={item.url} className="flex items-center gap-4">
                  {item.icon} {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
