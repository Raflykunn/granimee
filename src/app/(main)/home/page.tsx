"use client";
import { List, TopList } from "@/components/animelist";
import { ImageSlider } from "@/components/imageslider";

export default function Home() {
  return (
    <div className="relative flex overflow-x-hidden gap-4 my-12 md:flex-row flex-col">
      <div className="flex max-w-3/4 w-full flex-col">
        <ImageSlider />
        <List />
      </div>
      <div className="flex max-w-1/4 w-full flex-col gap-4">
        <TopList />
      </div>
    </div>
  );
}
