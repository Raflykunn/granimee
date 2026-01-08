"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { H4 } from "@/components/ui/typography";
import { useSession } from "@/lib/getSession";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const KamiNavbar = () => {
  const signOut = async() => {
    await supabase.auth.signOut()
  }

  const { session } = useSession();

  return (
    <div className="fixed z-50 top-0 mx-auto w-full bg-sidebar justify-between flex items-center px-12 py-4 border-b border-ring">
      <div className="max-w-64 w-1/4">
        <Link href={'/home'}>
          <H4 text="Granime" />
        </Link>
      </div>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Admin</span>
                <span className="truncate text-xs">{session?.user.email}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                 <button onClick={signOut} className="text-red-400 font-semibold cursor-pointer">Logout</button>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
