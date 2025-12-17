"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/getSession";
import { supabase } from "@/lib/supabaseClient";
import { Archive, CalendarClock, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

// This is sample data.
const data = [
  {
    title: "Beranda",
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
    title: "Jadwal Tayang",
    url: "/schedule",
    icon: <CalendarClock className="w-5 h-5" />,
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navList, setNavList] = React.useState(data);
  const pathname = usePathname();
  const sessionData = useSession()
  
  const {session} = sessionData
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  React.useEffect(() => {
    setNavList((prev) =>
      prev.map((item) => {
        return { ...item, isActive: item.url === pathname };
      })
    );
  }, [pathname]);

  return (
    <Sidebar {...props} className="">
      <div className="">
        {/* <SidebarHeader>
          <div className="flex gap-4 items-center">
            <span className="w-1/3 bg-gray-400 h-[0.5px] rounded-sm"></span>
            <p className="text-xs text-gray-400 w-1/2">Navigation list</p>
            <span className="w-1/3 bg-gray-400 h-[0.5px] rounded-sm"></span>
          </div>
        </SidebarHeader> */}
        <SidebarContent>
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
        <SidebarRail />
      </div>
      {session?.user && <SidebarFooter className="border-t border-border"><Button onClick={handleLogout} variant={"secondary"} className="mx-6 mt-2 text-sm "><LogOut className="w-5 h-5"/>Logout</Button></SidebarFooter>}
    </Sidebar>
  );
}
