"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-black/50 backdrop-blur-xs bg-opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="relative z-10">
        <SearchBar/>
      </div>
    </div>
  ) : (
    <button
      onClick={() => setIsOpen(true)}
      className="p-3 text-white bg-[#094abe] rounded-lg text-sm hover:bg-[#0f59cb] transition-all cursor-pointer"
    >
      <Search className="w-5 h-5" />
    </button>
  );
};

export default function SearchBar(
 ) {
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 481);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div
      className={`relative rounded-lg border py-1 w-full border-border flex flex-col items-center z-2`}
    >
      <div className="w-full py-2 px-5 flex items-center">
        <form
          className="flex items-center w-full h-full gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="">
            <Search className="w-5 text-white h-5" />
          </div>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Cari anime..."
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-gray-500"
          />
        </form>
      </div>

    </div>
  );
}
