"use client";
import { useDetailAnime, useWatchEpisode } from "@/hooks/use-anime";
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
import { VideoPlayer } from "./videosupported";

export const EpisodeDetail = ({
  slug,
  episodeNow,
}: {
  slug: string;
  episodeNow: number;
}) => {
  const { anime, isLoading: isLoadingDetail } = useDetailAnime(slug);
  const episodeId = anime ? anime?.episodes[episodeNow - 1]?.id : "";
  const { streamData, isLoading } = useWatchEpisode(episodeId);
  const episodeListData = anime?.episodes;
  // console.log(episodeData)

  if (isLoading || isLoadingDetail) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background/50">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl w-full mx-auto py-30 px-24 flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/home"
                className="flex items-center gap-2 text-xs"
              >
                <Home className="w-4 h-4" /> Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-xs">Anime</BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* <BreadcrumbItem>
              <BreadcrumbLink className="text-xs" href={`/anime/${slug}/watch?episode=${episodeNow}`}>
                {episodeData?.}
              </BreadcrumbLink>
            </BreadcrumbItem> */}
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs">
                <p>Episode {episodeNow}</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex bg-card border border-border rounded-lg justify-between md:flex-row flex-col">
          <ScrollArea className="max-w-80 aspect-video w-full rounded-tl-lg rounded-bl-lg bg-sidebar">
            <div className="flex flex-col">
              <p className="text-foreground border-b-2 mt-6 pb-4 mx-4 text-xs font-semibold">
                Episode List:
              </p>
              {episodeListData?.map((ep, index) => (
                <Link
                  key={index}
                  href={`/anime/${slug}/watch?ep=${index + 1}`}
                  className={`${
                    index + 1 == episodeNow
                      ? (index + 1) % 2 !== 0
                        ? "bg-border/40 border-r-12 border-primary"
                        : "bg-border border-r-12 border-primary"
                      : ""
                  } flex gap-3 items-center py-4 px-4 hover:text-primary`}
                >
                  <p
                    className={`${
                      index + 1 == episodeNow
                        ? "text-primary font-semibold"
                        : ""
                    } font-medium w-5`}
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
            <VideoPlayer
              subtitles={streamData?.subtitles || []}
              src={streamData?.sources[0]?.url || ""}
            />
          </div>
        </div>
        <div className="flex max-h-58 bg-card border border-primary rounded-lg justify-between">
          <div className="flex gap-8">
            <Image
              priority
              src={anime?.image || ""}
              width={480}
              height={720}
              className="w-40 h-58 rounded-tl-lg rounded-bl-lg shadow-lg"
              alt="cover"
            />
            <div className="flex flex-col gap-2 my-4 mr-4">
              <H3
                text={
                  episodeListData ? episodeListData[episodeNow - 1]?.title : ""
                }
              />
              <div className="text-xs flex gap-6 mb-2 items-center">
                <p className="font-semibold px-2 py-1 bg-accent text-accent-foreground rounded-sm">
                  {anime?.type}
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <Clock className="w-5 h-5" /> {anime?.duration}
                </p>
                <p className="flex items-center gap-2 font-medium">
                  {anime?.status}
                </p>
              </div>
              <div className="max-w-lg max-h-24 overflow-y-auto"></div>
            </div>
          </div>
          <div className="flex md:flex-col h-58 rounded-tr-lg rounded-br-lg w-1/3 bg-white/10 flex-row gap-6">
            <div className="flex flex-col gap-4 p-4">
              <p className="text-xs">Aired: {anime?.aired}</p>
              <p className="text-xs">Status: {anime?.status}</p>
              <p className="text-xs">Duration: {anime?.duration}</p>
              <p className="text-xs">Rating: {anime?.mal_score}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <p className="mb-2 text-xs">Genre:</p>
                {(anime?.genres ?? [])
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
