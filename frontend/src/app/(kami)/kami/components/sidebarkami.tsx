import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/getSession";
import { supabase } from "@/lib/supabaseClient";
import { ChevronDown, ChevronUp, Home, KeyRound, LogOut, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const data = [
  {
    title: "Dashboard",
    url: "/kami/dashboard",
    icon: <Home className="w-5 h-5" />,
    isActive: false,
  },
  {
    title: "Upload",
    url: "/list-anime",
    items: [
      {
        title: "Upload Anime",
        url: "/kami/upload/anime",
        isActive: false,
      },
      {
        title: "Upload Episode Anime",
        url: "/kami/upload/anime/episode",
        isActive: false,
      },
    ],
    icon: <Upload className="w-5 h-5" />,
    isActive: false,
  },
  {
    title: "Ganti password",
    url: "/kami/change-password",
    icon: <KeyRound className="w-5 h-5" />,
    isActive: false,
  },
];

export function KamiSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [navList, setNavList] = React.useState(data);
  const pathname = usePathname();
  const sessionData = useSession();

  const { session } = sessionData;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  React.useEffect(() => {
    setNavList((prev) =>
      prev.map((item) => {
        if (item.items)
          return {
            ...item,
            isActive: item.items.map((item) => item.url).includes(pathname),
          };
        return { ...item, isActive: item.url === pathname };
      })
    );
  }, [pathname]);

  return (
    <Sidebar {...props} className="">
      <div className="my-8 mx-4">
        <SidebarContent>
          <SidebarMenu className="flex flex-col gap-6">
            {navList.map((item) => (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      className="cursor-pointer p-6 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <span>{item.icon}</span>
                        <p>{item.title} </p>
                      </div>
                      {item.items && (
                        <div>
                          <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </div>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub className="flex flex-col gap-4 my-4 ml-8">
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <Link
                                href={item.url}
                                className="flex text-xs items-center gap-4"
                              >
                                {item.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </div>
      {session?.user && (
        <SidebarFooter className="border-t border-border">
          <Button
            onClick={handleLogout}
            variant={"secondary"}
            className="mx-6 mt-2 text-sm "
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
