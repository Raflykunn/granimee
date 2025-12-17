"use client";
import { useAnime, useLatestAnime } from "@/hooks/use-anime";
import { IAnime } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { H3 } from "./ui/typography";
// {anime, isLoading = true}: {anime: IAnime[], isLoading: boolean}
export const List = () => {
  const {anime, isLoading} = useLatestAnime()

  console.log(anime)

   if (isLoading) {
    return (
      <div className="w-full mx-auto bg-card rounded-sm py-12 px-12 flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-48 h-64 rounded-sm" />
        ))}
      </div>
    );
  }

  return (
     <div className="z-20 overflow-hidden bg-background gap-8 my-4 mx-12 flex flex-col">
      <H3 text={"Update terbaru"} />
      {/* <div className="flex flex-wrap gap-4">
        {randomList.map((anime, index: number) => (
          <Link
            href={`/anime/${anime.id}`}
            className="relative group w-1/6 h-max flex flex-col gap-2"
            key={index}
          >
            <div className="absolute w-full aspect-[1/1.45] rounded-sm group-hover:bg-black/20 group-hover:backdrop-blur-sm flex justify-center items-center transition-all duration-500">
              <span className="p-4 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                <Play className="w-5 h-5" />
              </span>
            </div>
              <p className="absolute top-1 left-1 rounded-sm text-xs opacity-85 font-semibold p-2 bg-accent text-accent-foreground">
                HD
              </p>
              <p className="absolute top-1 right-1 rounded-sm opacity-85 text-xs font-semibold p-2 bg-border text-primary">
                {anime?.rating}
              </p>
            <Image
              alt={`${index}`}
              width={480}
              height={720}
              src={anime?.bannerImage || ""}
              className="object-cover w-full aspect-[1/1.45] rounded-sm"
            />
            <p className="ml-1 text-sm truncate w-full text-primary-foreground">
              {anime?.title}
            </p>
          </Link>
        ))}
      </div> */}
    </div>
  )
}

export const RandomList = ({apiUrl, header}: {apiUrl: string, header?:string}) => {
  const {anime, isLoading } = useAnime(apiUrl)

  if (isLoading) {
    return (
      <div className="w-full mx-auto bg-card rounded-sm py-12 px-12 flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-48 h-64 rounded-sm" />
        ))}
      </div>
    );
  }

  const randomList: IAnime[] = anime.sort(() => Math.random() - 0.5).slice(0, 10);

  return (
    <div className="z-20 overflow-hidden bg-background gap-8 my-4 mx-12 flex flex-col">
      <H3 text={header || ""} />
      <div className="flex flex-wrap gap-4">
        {randomList.map((anime, index: number) => (
          <Link
            href={`/anime/${anime.id}`}
            className="relative group w-1/6 h-max flex flex-col gap-2"
            key={index}
          >
            <div className="absolute w-full aspect-[1/1.45] rounded-sm group-hover:bg-black/20 group-hover:backdrop-blur-sm flex justify-center items-center transition-all duration-500">
              <span className="p-4 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                <Play className="w-5 h-5" />
              </span>
            </div>
              <p className="absolute top-1 left-1 rounded-sm text-xs opacity-85 font-semibold p-2 bg-accent text-accent-foreground">
                HD
              </p>
              <p className="absolute top-1 right-1 rounded-sm opacity-85 text-xs font-semibold p-2 bg-border text-primary">
                {anime?.rating}
              </p>
            <Image
              alt={`${index}`}
              width={480}
              height={720}
              src={anime?.bannerImage || ""}
              className="object-cover w-full aspect-[1/1.45] rounded-sm"
            />
            <p className="ml-1 text-sm truncate w-full text-primary-foreground">
              {anime?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
