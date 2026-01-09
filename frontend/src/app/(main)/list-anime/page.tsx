"use client";
import { List } from "@/components/animelist";
import { Button } from "@/components/ui/button";
import { useAnime } from "@/hooks/use-anime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [letter, setLetter] = useState("all");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAnime(page, letter);
  const totalPages = data?.pageInfo.totalPages;
  const anime = data?.response;

  const handleLetter = (item: string) => {
    setPage(1);
    setLetter(item.toLocaleLowerCase());
  };

  const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  list.splice(0, 0, "All", "0-9");
  return (
    <div className="w-full flex flex-col md:my-12 my-8 mx-auto md:px-12 px-4 gap-12 overflow-x-hidden">
      <div className="flex flex-wrap items-center gap-4">
        {list.map((item, index) => (
          <Button
            onClick={() => handleLetter(item)}
            key={index}
            className={`text-xs max-w-12 border hover:border-accent-foreground w-full h-auto shadow-none aspect-square flex-auto ${
              letter === item.toLocaleLowerCase()
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
            variant={"ghost"}
            size={"sm"}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setPage(page - 1)}
          className={`${
            page === totalPages ? "hidden" : "block"
          } text-center shadow-none`}
          size={"icon"}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <p className="text-sm font-semibold">Page {page}</p>
        <Button
          onClick={() => setPage(page + 1)}
          className={`${
            page === totalPages ? "hidden" : "block"
          } text-center shadow-none`}
          size={"icon"}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <List anime={anime} isLoading={isLoading} />
    </div>
  );
}
