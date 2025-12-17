"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/getSession";
import { ImageUp } from "lucide-react";
import { useState } from "react";
export const ProfileDetail = ({ id }: { id: string }) => {
  const [showEdit, setShowEdit] = useState(false);
  const { session, loading } = useSession();
  console.log(session);
  console.log(id);

  return (
    <div className="flex flex-col w-1/3 gap-6">
      <div className="flex flex-col justify-center items-center relative gap-6">
        <Avatar className="w-[200px] h-[200px]">
          {session?.user.user_metadata?.picture ? (
            <AvatarImage
              className="w-[200px] h-[200px]"
              width={480}
              height={480}
              src={session?.user.user_metadata?.picture}
            />
          ) : (
            <AvatarFallback>
              {session?.user.user_metadata?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <Button
          variant={"secondary"}
          className="text-sm aspect-square absolute bottom-0 right-0"
        >
          <ImageUp className="w-5 h-5" />
        </Button>
      </div>
      {!showEdit ? (
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setShowEdit(!showEdit)}
        >
          Edit Profile
        </Button>
      ) : (
          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm">Username</p>
              <Input placeholder="Username" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Email</p>
              <Input
                placeholder="Email"
                className="w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button type="submit" className="text-sm" onClick={() => setShowEdit(!showEdit)}>Simpan</Button>
              <Button type="submit" className="text-sm" variant={"outline"} onClick={() => setShowEdit(!showEdit)}>Batal</Button>
            </div>
          </form>
      )}
    </div>
  );
};
