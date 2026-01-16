"use client";
import React from "react";
import { ProfileButton } from "../profilebutton";
import SearchBar from "./search";
import { H4 } from "./typography";

const MobileNavbar = () => {
  return <></>;
};

const DekstopNavbar = () => {
  return (
    <div className="fixed top-0 z-50 mx-auto w-full bg-black/30 backdrop-blur-xl justify-center flex items-center px-8 py-3 border-b border-white/30">
      <div className="max-w-64 w-1/4">
        <H4 text="Granime" />
      </div>
      <div className="w-full flex justify-between items-center gap-4">
        <div className="w-2/3">
          <SearchBar />
        </div>
        <div className="w-1/3 flex justify-end gap-4 items-center">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return isMobile ? <MobileNavbar /> : <DekstopNavbar />;
};
