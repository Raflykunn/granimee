"use client";
import {
  useDetailAnime,
  useLatestAnime,
  usePopularAnime,
} from "@/hooks/use-anime";
import { AnimeItem } from "@/lib/utils";
import { ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { H3, H4 } from "./ui/typography";

export const List = ({
  anime,
  isLoading,
}: {
  anime?: AnimeItem[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="w-full mx-auto bg-card rounded-sm py-12 px-12 flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full aspect-[1/1.45] h-auto flex-auto rounded-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="z-20 overflow-hidden bg-background gap-8 flex flex-col">
      <div className="flex flex-wrap gap-6">
        {anime?.map((anime, index: number) => (
          <Link
            href={`/anime/${anime.id}`}
            className="relative group max-w-48 md:w-40 w-28 aspect-[1/1.45] flex-auto h-auto flex flex-col gap-2"
            key={anime.id}
          >
            <div className="absolute w-full aspect-[1/1.45] rounded-sm group-hover:bg-black/30 group-hover:backdrop-blur-xs flex justify-center items-center transition-all duration-500">
              <span className="p-4 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                <Play className="w-5 h-5" />
              </span>
            </div>
            <p className="absolute bottom-8 left-1 rounded-sm text-xs opacity-85 font-bold p-2 bg-primary text-primary-foreground">
              {anime.episodes.eps} Episodes
            </p>
            <p className="absolute top-1 right-1 rounded-sm text-[9px] font-semibold p-2 bg-accent text-accent-foreground">
              {anime.type}
            </p>
            {/* <p className="absolute top-1 right-1 rounded-sm opacity-85 text-xs font-semibold p-2 bg-border text-primary">
              {anime?.}
            </p> */}
            <Image
              alt={`${index}`}
              width={640}
              height={960}
              src={anime?.poster || ""}
              className="object-cover w-full aspect-[1/1.45] rounded-sm"
            />
            <p className="ml-1 text-sm truncate w-full text-white">
              {anime?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const LatestList = () => {
  const { anime, isLoading, error } = useLatestAnime();

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
    <div className="z-20 overflow-hidden bg-transparent gap-8 md:my-12 my-8 md:mx-12 mx-4 flex flex-col">
      <div className="flex items-center justify-between">
        <H3 text={"Latest Episode"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
        {anime?.map((anime, index: number) => (
          <Link
            href={`/anime/${anime.id}/watch?ep=${anime.episodes}`}
            className="relative group rounded-lg hover:-translate-y-2 transition-all duration-300 hover:shadow-sm h-auto flex flex-col gap-2"
            key={index}
          >
            <div className="absolute w-full rounded-lg aspect-[1/1.45] group-hover:bg-black/30 group-hover:backdrop-blur-xs flex justify-center items-center transition-all duration-500">
              <span className="p-4 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                <Play className="w-5 h-5" />
              </span>
            </div>
            <div className="absolute w-full max-h-24 h-full bottom-0 justify-center px-3 rounded-br-lg rounded-bl-lg bg-black/30 backdrop-blur-sm flex flex-col gap-4">
              <p className="md:text-sm text-xs text-left max-w-4/5 line-clamp-2 font-semibold">
                {anime?.title}
              </p>
              <div className="flex items-center justify-between">
                <p className="rounded-sm text-[9px] font-semibold p-2 bg-accent text-accent-foreground">
                  Episode {anime.episodes}
                </p>
                <p className="text-[9px] font-bold">{anime.type}</p>
              </div>
            </div>

            {/* <p className="absolute top-1 right-1 rounded-sm opacity-85 text-xs font-semibold p-2 bg-border text-primary">
              {anime?.}
            </p> */}
            <Image
              alt={`${index}`}
              width={640}
              height={960}
              src={anime?.image || ""}
              className="object-cover w-full aspect-[1/1.45] rounded-lg"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const RelatedList = ({
  slug,
  header,
}: {
  slug: string;
  header?: string;
}) => {
  const { anime, isLoading, isError } = useDetailAnime(slug);

  const relatedAnime = anime?.recommendations.slice(0, 4);

  if (isError) {
    toast.error("Terjadi kesalahan saat pengambilan data :(");
  }

  if (isLoading) {
    return (
      <div className="w-full mx-auto bg-card rounded-sm py-12 px-12 flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-48 h-64 rounded-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="z-20 overflow-hidden bg-background gap-8 md:my-12 my-8 md:mx-12 mx-4 flex flex-col">
      <div className="flex items-center justify-between">
        <H3 text={"Recommended for you"} />
        <Link
          href="/latest"
          className="text-foreground text-xs flex items-center"
        >
          View more <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex flex-wrap gap-6">
        {relatedAnime?.map((anime, index: number) => (
          <Link
            href={`/anime/${anime.id}`}
            className="relative group max-w-full md:w-40 w-28 aspect-[1/1.45] flex-auto h-auto flex flex-col gap-2"
            key={index}
          >
            <div className="absolute w-full aspect-[1/1.45] rounded-sm group-hover:bg-black/30 group-hover:backdrop-blur-xs flex justify-center items-center transition-all duration-500">
              <span className="p-4 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                <Play className="w-5 h-5" />
              </span>
            </div>
            <p className="absolute bottom-8 left-1 rounded-sm text-xs opacity-85 font-bold p-2 bg-primary text-primary-foreground">
              Episode {anime.episodes}
            </p>
            <p className="absolute top-1 right-1 rounded-sm text-[9px] font-semibold p-2 bg-accent text-accent-foreground">
              {anime.type}
            </p>
            {/* <p className="absolute top-1 right-1 rounded-sm opacity-85 text-xs font-semibold p-2 bg-border text-primary">
              {anime?.}
            </p> */}
            <Image
              alt={`${index}`}
              width={640}
              height={960}
              src={anime?.image || ""}
              className="object-cover w-full aspect-[1/1.45] rounded-sm"
            />
            <p className="ml-1 text-sm truncate w-full text-white">
              {anime?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const TopList = () => {
  const { anime, isLoading } = usePopularAnime();
  const [selected, setSelected] = useState("today");
  const topToday = anime?.today;
  const topWeek = anime?.week;
  const topMonth = anime?.month;

  const animes =
    selected === "today"
      ? anime?.today.slice(0, 10)
      : selected === "week"
      ? anime?.week.slice(0, 10)
      : anime?.month.slice(0, 10);

  if (isLoading) {
    return (
      <div className="w-full mx-auto bg-card rounded-sm py-12 px-12 flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-48 h-64 rounded" />
        ))}
      </div>
    );
  }

  return (
    <Card className="flex bg-white/5 flex-col gap-6 py-6">
      <CardHeader className="text-primary">
        <H4 text={"Top Airing"} />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {animes?.map((anime, index) => (
          <Link
            key={index}
            href={`/anime/${anime.id}`}
            className={`flex gap-4 items-center pb-4 ${
              index < animes?.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <p className="text-lg text-accent-foreground font-bold">
              {index < 9 ? `0${index + 1}` : index + 1}
            </p>
            <Image
              alt={`${index}`}
              width={480}
              height={720}
              src={anime?.poster || ""}
              className="object-cover w-12 aspect-square rounded-full"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm line-clamp-2 max-w-28 w-full">
                {anime?.title}
              </p>
              {/* <span className="text-xs px-2 py-1 bg-accent text-accent-foreground font-semibold rounded-full w-max">
                {anime?.episodes.eps}
              </span> */}
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
