import { getAllWatchHistory } from "@/app/actions/watchHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const WatchHistory = async () => {
  const history = await getAllWatchHistory();
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="border-b border-border py-2">
        <p className="text-sm font-semibold">Watch History</p>
      </div>

      <div className="flex flex-col gap-4">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven't watched any anime yet.
          </p>
        ) : (
          <ScrollArea className="w-full h-[500px] rounded-lg bg-background border border-border">
            <div className="flex flex-col">
              {history.map((item: any, index) => (
                <Link
                  key={item.id}
                  href={`/anime/${item.anime_id}/watch?ep=${item.episode_number}`}
                  className={`w-full aspect-[1/0.3] flex gap-4 relative group-hover:-scale-y-110 group-hover:-translate-y-1 items-center ${
                    index === 1 || index === history.length - 1
                      ? "rounded-tr-md rounded-tl-md"
                      : "rounded-none"
                  } hover:bg-accent/50 transition-colors group`}
                >
                  <div className="w-full h-full absolute top-0 left-0 bg-linear-to-r from-15% from-background/60 to-100% to-transparent"></div>
                  <div className="w-full h-full absolute top-0 left-0 bg-linear-to-l from-background to-20% to-transparent"></div>
                  <div className="absolute w-full h-full top-0 left-0 rounded-sm group-hover:bg-black/30 group-hover:backdrop-blur-xs flex justify-end items-center transition-all duration-500">
                    <span className="p-4 mr-8 rounded-full bg-muted text-muted-foreground hidden group-hover:block">
                      <Play className="w-5 h-5" />
                    </span>
                  </div>
                  <div
                    className={`w-full aspect-[1/0.3]  ${
                      index === 1 || index === history.length - 1
                        ? "rounded-tr-md rounded-tl-md"
                        : "rounded-none"
                    } overflow-hidden`}
                  >
                    {item.image ? (
                      <Image
                        loading="eager"
                        width={720}
                        height={1080}
                        src={item.image}
                        alt={item.title || "Episode"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-primary"
                      style={{
                        width: `${(item.progress / item.duration) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="absolute bottom-1/2 translate-y-1/2 left-6 flex flex-col gap-2 overflow-hidden">
                    <p className="text-base font-medium truncate">
                      {item.title || `Episode ${item.episode_number}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Episode {item.episode_number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(item.progress / 60)}m /{" "}
                      {Math.floor(item.duration / 60)}m
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
