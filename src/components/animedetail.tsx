"use client";
import { BackendIP, IAnimeWithEpisodes } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Clock, Home, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { H3 } from "./ui/typography";

export const AnimeDetail = ({ slug }: { slug: string }) => {
  const {
    data: anime,
    isLoading,
    isError,
  } = useQuery<IAnimeWithEpisodes>({
    queryKey: ["anime", slug],
    queryFn: async () => {
      const response = await fetch(`${BackendIP}/api/anime/${slug}`, {
        method: "GET",
      });
      const data = await response.json();
      // console.log(data)
      return data.anime;
    },
    enabled: !!slug,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log(anime)

  const duration = anime?.episodes?.map((ep) => ep.duration);

  if (isLoading)
    return (
      <div className="flex flex-col gap-4 px-12 py-30 mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <Skeleton className="w-1/5 h-[40vh] rounded-sm shadow-lg" />
          <Skeleton className="w-1/2 h-[70vh] rounded-sm shadow-lg" />
          <Skeleton className="w-1/4 h-[50vh] rounded-sm shadow-lg" />
        </div>
        <div>
          <Skeleton className="w-full h-[20vh] rounded-sm shadow-lg"/>
        </div>
      </div>
    );

  if (isError) return toast.error("Something went wrong :(");

  return (
    <div className="flex flex-col gap-12">
      <div className="relative md:shrink-0 max-h-[400px] h-[70vh] w-full">
        <Image
          src={anime?.bannerImage || ""}
          alt="cover"
          width={1280}
          height={720}
          className="absolute top-0 left-0 h-full w-full brightness-50 saturate-50 object-cover blur-xl"
        />
        <div className="absolute top-1/3 mx-auto z-10 w-full">
          <div className="flex flex-row md:flex-col justify-between px-14">
            <div className="flex gap-18">
              <Image
                src={anime?.bannerImage || ""}
                width={480}
                height={720}
                className="w-40 h-58 rounded-sm shadow-lg"
                alt="cover"
              />
              <div className="flex flex-col gap-3 w-3/5">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/home"
                        className="flex items-center gap-2 text-xs"
                      >
                        <Home className="w-4 h-4" /> Beranda
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/list-anime" className="text-xs">
                        Anime
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-xs">
                        {anime?.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="w-3/4">
                  <H3 text={anime?.title || ""} />
                </div>
                <div className="text-xs flex gap-6 mb-2 items-center">
                  <p className="font-semibold px-2 py-1 bg-accent text-accent-foreground rounded-sm">
                    HD
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <Clock className="w-5 h-5" /> 25 min
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    {anime?.releaseDate}
                  </p>
                </div>
                <Button
                  variant={"default"}
                  className="py-6 font-semibold mb-2 w-max"
                >
                  <Link
                    href={`/anime/${slug}/watch?episode=1`}
                    className="flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    <p className="">Mulai tonton</p>
                  </Link>
                </Button>
              </div>
              <div className="flex md:flex-col h-full bg-white/10 flex-row gap-6">
                <div className="flex flex-col gap-4 p-4">
                  <p className="text-sm">Tayang: {anime?.releaseDate}</p>
                  <p className="text-sm">Status: {anime?.status}</p>
                  <p className="text-sm">Duration: {anime?.releaseDate}</p>
                  <p className="text-sm">Rating: {anime?.rating}</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <p className="mb-2 text-sm">Genre:</p>
                    {(anime?.genre ?? [])
                      .join(", ")
                      .split(", ")
                      .map((g, index) => (
                        <Link
                          href={`/discover/genre/${g}`}
                          className="py-1.5 px-2 text-xs font-medium border border-slate-50/60 hover:border-slate-50/80 rounded-xl"
                          key={index}
                        >
                          {g}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-6 border-y border-border mx-12">
        <p className="text-xl font-bold text-primary">Sinopsis Anime</p>
         <p className="text-xs leading-5 max-w-3/5 font-light">{anime?.synopsis}</p>
      </div>
    </div>
  );
};
