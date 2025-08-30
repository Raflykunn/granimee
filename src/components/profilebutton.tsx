import { useSession } from "@/lib/getSession";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
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
        <Link href={`/profile/${session?.user.user_metadata.id}`}>
          <Avatar>
            {/* <AvatarImage src={session?.user_metadata.avatar_url} /> */}
            <AvatarFallback>
              {session?.user.user_metadata?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div>
          <Link href={"auth/login"}>
            <Button variant={"outline"} className="">
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
