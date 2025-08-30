"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Logged in user:", session?.user);
      if (session) router.push("/home");
    };
    getSession();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="custom-loader"></div>
      <p className="text-primary font-medium text-center text-sm">
        Sedang mengautentikasi...
      </p>
    </div>
  );
}
