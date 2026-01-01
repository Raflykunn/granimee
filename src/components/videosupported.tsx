"use client";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

export const VideoPlayer = ({
  src,
  subtitles,
}: {
  src: string;
  subtitles: { lang: string; url: string }[];
}) => {
  const plyrOptions = {
    source: {
      type: "video",
      sources: [
        {
          src: src,
        },
      ],
      tracks: subtitles.map((s) => ({
        src: `/api/proxy/subtitle?url=${encodeURIComponent(s.url)}`,
        kind: "subtitles",
        srclang: s.lang,
        label: s.lang === "en" ? "English" : s.lang, // You might want a more robust mapping for labels
        default: s.lang === "en", // Set English as default if available
      })),
    },
    options: {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions", // Tombol Toggle Subtitle
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed"],
    },
  };

  return (
    <div className="w-full h-full">
      <Plyr {...plyrOptions} />
    </div>
  );
};
