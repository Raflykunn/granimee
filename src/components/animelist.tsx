"use client";
import { useAnime, useDetailAnime, useLatestAnime } from "@/hooks/use-anime";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { H3, H4 } from "./ui/typography";
// {anime, isLoading = true}: {anime: IAnime[], isLoading: boolean}
export const List = () => {
  const { anime, isLoading, error } = useLatestAnime();

  console.log(anime);
  console.log(error);

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
      <div className="flex flex-wrap gap-4">
        {anime?.map((anime, index: number) => (
          <Link
            href={`/anime/${anime.id}`}
            className="relative group w-1/5 h-max flex flex-col gap-2"
            key={index}
          >
            <div className="absolute w-full aspect-[1/1.45] rounded-sm group-hover:bg-black/20 group-hover:backdrop-blur-sm flex justify-center items-center transition-all duration-500">
              <span className="p-4 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                <Play className="w-5 h-5" />
              </span>
            </div>
            <p className="absolute top-1 left-1 rounded-sm text-xs opacity-85 font-semibold p-2 bg-accent text-accent-foreground">
              {anime.episodes}
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
            <p className="ml-1 text-sm truncate w-full text-primary-foreground">
              {anime?.title}
            </p>
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
    <div className="z-20 overflow-hidden bg-background gap-8 my-4 mx-12 flex flex-col">
      <H3 text={header || ""} />
      <div className="flex flex-wrap gap-4">
        {relatedAnime?.map((anime, index: number) => (
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
              {anime.type}
            </p>
            <Image
              alt={`${index}`}
              width={480}
              height={720}
              src={anime?.image || ""}
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

export const TopList = () => {
  const { anime: animes, isLoading } = useAnime("/api/list/anime");

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
    <Card className="flex flex-col gap-6 py-6 border-y border-l border-ring rounded-md">
      <CardHeader className="text-primary">
        <H4 text={"Paling Popular"} />
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
              src={anime?.bannerImage || ""}
              className="object-cover w-12 aspect-square rounded-full"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm">{anime?.title}</p>
              <span className="text-xs px-2 py-1 bg-accent text-accent-foreground font-semibold rounded-full w-max">
                {anime?.rating}
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
