"use client";
import { List } from "@/components/animelist";
import { ImageSlider } from "@/components/imageslider";

export default function Home() {

  return (
    <div className="relative flex overflow-hidden flex-col justify-center">
      <ImageSlider />
      <List/>
    </div>
  );
}
