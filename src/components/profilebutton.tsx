import { useSession } from "@/lib/getSession";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const ProfileButton = () => {
  const [isProfile, setIsProfile] = useState(false);

  const data = useSession();

  const { session } = data;

  useEffect(() => {
    if (session) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [session]);

  return (
    <div>
      {isProfile ? (
        <Link href={`/profile/${session?.user.id}`}>
          <Avatar>
            {session?.user.user_metadata?.picture ? (
              <AvatarImage src={session?.user.user_metadata?.picture} />
            ) : (
              <AvatarFallback>
                {session?.user.user_metadata?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      ) : (
        <div>
          <Link href={"/auth/login"}>
            <Button variant={"outline"} className="">
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
