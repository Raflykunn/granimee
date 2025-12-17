"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { BackendIP, IAnime } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea } from "./scroll-area";

export const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-black/50 backdrop-blur-xs bg-opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="relative z-10">
        <SearchBar />
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

export default function SearchBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1500);

  const clearSearch = () => {
    setQuery("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 481);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      const response = await fetch(
        `${BackendIP}/api/anime/search?q=${debouncedQuery}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data.anime;
    },
    enabled: !!debouncedQuery,
    refetchOnWindowFocus: false,
  });

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
          <div className="relative w-full">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              placeholder="Cari anime..."
              className="flex-1 w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-500"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
              <X className="w-5 text-white h-5" />  
              </button>
            )}
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="w-full top-10 absolute justify-center items-center px-5 py-6 bg-card border border-border rounded-b-sm">
          <div className="custom-loader" />
        </div>
      )}

      {isError && (
        <div className="w-full top-10 absolute justify-center items-center px-5 py-4 bg-card border border-border rounded-b-sm">
          <div className="text-sm text-primary font-semibold p-4">
            No animes found!
          </div>
        </div>
      )}

      {data && data.length > 0 && (
        <ScrollArea className="w-full absolute overflow-y-hidden max-h-60 bg-card border rounded-b-sm border-border px-5 py-4">
          <ul className="space-y-4">
            {data.map((anime: IAnime) => (
              <li key={anime.id} className="text-white text-sm">
                <Link href={`/anime/${anime.id}`} className="flex gap-6 items-center">
                <div className="relative rounded-xs overflow-hidden">
                  <Image src={anime.bannerImage || ""} width={100} height={100} alt={anime.title} className="w-12 h-20 object-cover"/>
                </div>
                <div className="flex flex-col gap-2">
                  <strong>{anime.title}</strong>
                  <p className="text-gray-400 text-xs">{anime.genre.join(", ")} | {anime.status}</p>
                </div>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
