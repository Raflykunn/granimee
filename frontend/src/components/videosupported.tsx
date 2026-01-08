"use client";
import { saveWatchProgress } from "@/app/actions/watchHistory";
import dynamic from "next/dynamic";
import { APITypes, PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import { useCallback, useEffect, useRef } from "react";

// Define local interface if import fails or verify import
interface PlyrConfigurationProps extends PlyrProps {}

const Plyr = dynamic(() => import("plyr-react").then((p) => p.Plyr as any), {
  ssr: false,
});

export const VideoPlayer = ({
  src,
  subtitles,
  animeId,
  episodeId,
  episodeNumber,
  title,
  image,
  initialProgress = 0,
}: {
  src: string;
  subtitles: { lang: string; url: string }[];
  animeId?: string;
  episodeId?: string;
  episodeNumber?: number;
  title?: string;
  image?: string;
  initialProgress?: number;
}) => {
  const playerRef = useRef<APITypes>(null);
  // Stabilize saveProgress with useCallback to prevent effect re-firing
  const { saveProgress } = useWatchHistory({
    animeId,
    episodeId,
    episodeNumber,
    title,
    image,
  });

  const englishSubtitle = subtitles.filter((s) => s.lang === "English");

  const plyrOptions: PlyrConfigurationProps = {
    source: {
      type: "video" as "video",
      sources: [
        {
          src: src,
        },
      ],
      tracks: englishSubtitle.map((s) => ({
        src: `/api/proxy/subtitle?url=${encodeURIComponent(s.url)}`,
        kind: "subtitles" as const,
        srclang: s.lang,
        label: s.lang === "English" ? "English" : s.lang,
        default: s.lang === "English",
      })),
    },
    options: {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed"],
    },
  };

  useEffect(() => {
    const player = playerRef.current?.plyr;

    // Check if player exists for event listeners, but DON'T return early preventing interval
    if (player) {
      if (typeof player.once === "function") {
        player.once("ready", () => {
          if (initialProgress && initialProgress > 0) {
            player.currentTime = initialProgress;
          }
        });
      } else if (typeof player.on === "function") {
        player.on("ready", () => {
          if (initialProgress && initialProgress > 0) {
            player.currentTime = initialProgress;
          }
        });
      }
    }

    const interval = setInterval(() => {
      const currentPlayer = playerRef.current?.plyr;

      // Ensure player is still valid during interval execution
      if (
        currentPlayer &&
        currentPlayer.playing &&
        currentPlayer.currentTime > 0
      ) {
        saveProgress(currentPlayer.currentTime, currentPlayer.duration);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [initialProgress, saveProgress]);

  // Cast to any to avoid IntrinsicAttributes error with dynamic component ref
  const PlyrComponent = Plyr as any;

  return (
    <div className="w-full rounded-lg h-full">
      <PlyrComponent ref={playerRef} {...plyrOptions} />
    </div>
  );
};

// Hook for debounced saving or just saving logic
const useWatchHistory = ({
  animeId,
  episodeId,
  episodeNumber,
  title,
  image,
}: any) => {
  // Basic useCallback to stabilize the function reference
  const saveProgress = useCallback(
    async (progress: number, duration: number) => {
      if (!animeId || !episodeId) return;
      try {
        await saveWatchProgress(
          animeId,
          episodeId,
          episodeNumber,
          title,
          image,
          progress,
          duration
        );
      } catch (err) {
        console.error("Failed to call saveWatchProgress action:", err);
      }
    },
    [animeId, episodeId, episodeNumber, title, image]
  );

  return { saveProgress };
};
