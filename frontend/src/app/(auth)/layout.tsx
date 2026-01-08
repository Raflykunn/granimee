import { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Login | Granime",
  description: "Platform streaming anime tercepat dan terbaik",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
        <div className="">
          {children}
          <Toaster className="dark"/>
          </div>
  );
}
