"use client";
import { EpisodeDetail } from "@/components/episodedetail";
import { useParams, useSearchParams } from "next/navigation";

export default function WatchPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string;
  const episode = searchParams.get("ep");

  return (
    <div>
      <EpisodeDetail slug={slug} episodeNow={Number(episode)} />
    </div>
  );
}
