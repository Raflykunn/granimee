"use client";
import Image from "next/image";

export const Loader = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Image
        src="/loader.gif"
        alt="loading"
        loading="eager"
        width={100}
        height={100}
      />
      <p className="text-primary text-center text-xs">Chotto matte...</p>
    </div>
  );
};
