"use client";

import Artplayer from "artplayer";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

// Extend Artplayer type to include hls property
interface CustomArtplayer extends Artplayer {
  hls?: Hls;
}

type PlayerProps = {
  url: string;
  subtitles?: {
    html: string;
    url: string;
    type?: string;
  }[];
  category?: {
    html: string;
    url: string;
  }[];
  className?: string;
};

export default function Player({
  url,
  subtitles = [],
  className,
}: PlayerProps) {
  const artRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Artplayer | null>(null);

  useEffect(() => {
    if (!artRef.current) return;

    const art = new Artplayer({
      container: artRef.current,
      url: url,
      setting: true,
      fullscreen: true,
      playbackRate: true,
      playsInline: true,
      pip: true,
      autoSize: true, // or specific aspect ratio
      theme: "#ffad00", // Customize theme color
      customType: {
        m3u8: function (video: HTMLVideoElement, url: string, art: Artplayer) {
          const customArt = art as CustomArtplayer;
          if (Hls.isSupported()) {
            if (customArt.hls) customArt.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            customArt.hls = hls;
            customArt.on("destroy", () => hls.destroy());
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            customArt.notice.show = "Unsupported playback format: m3u8";
          }
        },
      },
      subtitle: {
        url:
          subtitles.length > 0
            ? subtitles.find((s) => s.html.toLowerCase().includes("english"))
                ?.url || subtitles[0].url
            : "",
        encoding: "utf-8",
        style: {
          color: "#fff",
          marginBottom: "20px",
        },
      },
      plugins: [
        // Helper to add subtitle control in settings
        (art) => {
          if (subtitles.length > 0) {
            art.setting.add({
              html: "Subtitles",
              width: 250,
              tooltip: "English",
              selector: [
                {
                  html: "Off",
                  url: "",
                  default: false,
                },
                ...subtitles.map((sub, index) => ({
                  html: sub.html,
                  url: sub.url,
                  default: sub.html.toLowerCase().includes("english"), // Select English by default
                })),
              ],
              onSelect: (item: any) => {
                art.subtitle.switch(item.url, {
                  name: item.html,
                });
                return item.html;
              },
            });
          }

          // Quality handling via HLS events is complex,
          // typically hls.js handles auto quality.
          // Artplayer + Hls.js usually defaults to Auto.
          // We can add a quality selector if we want to manually control HLS levels,
          // but "Auto" is often desired.

          return {
            name: "customConfig",
          };
        },
      ],
    });

    playerRef.current = art;

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy(false);
      }
    };
  }, [url, subtitles]);

  return (
    <div
      ref={artRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
