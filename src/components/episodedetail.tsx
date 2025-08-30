"use client";
import { useDetailAnime } from "@/hooks/use-anime";
import { Clock, Home, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ScrollArea } from "./ui/scroll-area";
import { H3 } from "./ui/typography";

export const EpisodeDetail = ({
  slug,
  episodeNow,
}: {
  slug: string;
  episodeNow: number;
}) => {

  const {anime: cachedData, isLoading} = useDetailAnime(slug)

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background/50">
        <div className="custom-loader"></div>
      </div>
    )
  }

  console.log(cachedData);

  const episode = cachedData?.episodes?.find(
    (ep) => ep.episodeNum === Number(episodeNow)
  );

  console.log(1 == episodeNow);

  return (
    <div>
      {/* <div className="absolute md:shrink-0 max-h-[720px] h-[80vh] w-full">
        <Image
          src={cachedData?.bannerImage || ""}
          alt="cover"
          width={1280}
          height={720}
          className="absolute top-0 left-0 h-full w-full brightness-50 saturate-50 object-cover blur-xl"
        />
      </div> */}
      <div className="max-w-7xl w-full mx-auto py-30 px-24 flex flex-col gap-6">
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
            <BreadcrumbItem className="text-xs">
                Anime
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs">
                {cachedData?.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex bg-card border border-border rounded-lg justify-between md:flex-row flex-col">
          <ScrollArea className="max-w-80 w-full rounded-tl-lg rounded-bl-lg bg-sidebar">
            <div className="flex flex-col">
              <p className="text-foreground mt-6 mb-4 mx-4 text-xs font-semibold">
                Daftar episode:
              </p>
              {cachedData?.episodes?.map((ep, index) => (
                <Link
                  key={index}
                  href={`/anime/${slug}/watch?episode=${ep.episodeNum}`}
                  className={`${
                    index + 1 == episodeNow
                      ? (index + 1) % 2 !== 0
                        ? "bg-border/40 border-r-4 border-primary"
                        : "bg-border border-r-4 border-primary"
                      : ""
                  } flex gap-6 items-center py-2 px-4 hover:text-primary`}
                >
                  <p
                    className={`${
                      index + 1 == episodeNow
                        ? "text-primary font-semibold"
                        : ""
                    } font-medium`}
                  >
                    {index + 1}
                  </p>
                  <p
                    className={`${
                      index + 1 == episodeNow
                        ? "text-primary font-semibold"
                        : ""
                    } text-xs font-medium truncate w-48`}
                  >
                    {ep.title}
                  </p>
                  <span
                    className={`${
                      index + 1 == episodeNow ? "block" : "hidden"
                    } p-2 text-sm rounded-full w-max bg-muted text-primary`}
                  >
                    <Play className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="w-full aspect-video">
            <video
              className="rounded-tr-lg rounded-br-lg w-full"
              controls
              src={episode?.videoUrl}
              width="640"
              height={"360"}
            />
          </div>
        </div>
        <div className="flex max-h-58 bg-card border border-primary rounded-lg justify-between">
          <div className="flex gap-8">
            <Image
              src={cachedData?.bannerImage || ""}
              width={480}
              height={720}
              className="w-40 h-58 rounded-tl-lg rounded-bl-lg shadow-lg"
              alt="cover"
            />
            <div className="flex flex-col gap-2 my-4 mr-4">
              <H3 text={cachedData?.title || ""} />
              <div className="text-xs flex gap-6 mb-2 items-center">
                <p className="font-semibold px-2 py-1 bg-accent text-accent-foreground rounded-sm">
                  HD
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <Clock className="w-5 h-5" /> 25 min
                </p>
                <p className="flex items-center gap-2 font-medium">
                  {cachedData?.releaseDate}
                </p>
              </div>
              <div className="max-w-lg max-h-24 overflow-y-auto">
                <p className="text-xs">
                  {episode?.description?.slice(0, 1000).toString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col h-58 rounded-tr-lg rounded-br-lg w-1/3 bg-white/10 flex-row gap-6">
            <div className="flex flex-col gap-4 p-4">
              <p className="text-xs">Tayang: {cachedData?.releaseDate}</p>
              <p className="text-xs">Status: {cachedData?.status}</p>
              <p className="text-xs">Duration: {cachedData?.releaseDate}</p>
              <p className="text-xs">Rating: {cachedData?.rating}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <p className="mb-2 text-xs">Genre:</p>
                {(cachedData?.genre ?? [])
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
  );
};
