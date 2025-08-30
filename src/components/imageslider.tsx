"use client";

import { useAnime } from "@/hooks/use-anime";
import { IAnime } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { H1 } from "./ui/typography";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const ImageSlider = () => {
  const [[index, direction], setIndex] = useState([1, 0]);

  const { anime: data, isLoading } = useAnime('/api/list/anime')

  console.log(data);

  const anime: IAnime[] = data || [];

  console.log(anime);
  const imagesList = anime.map((item) => item.coverImage).splice(0, 10);
  console.log(imagesList);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(([prevPage]) => {
        const nextPage = (prevPage + 1) % (imagesList?.length || 1);
        return [nextPage, 1]; 
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesList]);

  console.log(index);

  const paginate = (newDirection: number) => {
    setIndex(([prevPage]) => {
      const nextPage =
        (prevPage + newDirection + imagesList.length) % imagesList.length;
      return [nextPage, newDirection];
    });
  };

  if (isLoading) return (
    <div className="">
      <Skeleton className="w-[98%] mx-auto my-2 bg-card xl:h-[400px] max-h-[640px]"/>
    </div>
  );

  return (
    <div className="w-full mx-auto relative">
      <div className="absolute bg-gradient-to-r from-20% from-background to-100% to-transparent w-full h-[75vh] max-h-[640px] z-10"></div>
      <div className="absolute bg-gradient-to-l from-background/100  to-20% to-transparent w-full h-[75vh] max-h-[640px] z-10"></div>
      <div className="absolute bg-gradient-to-t from-10% from-background/40 to-20% to-transparent w-full h-[75vh] max-h-[640px] z-10"></div>

      <div className="relative overflow-hidden h-[75vh] max-h-[640px]">
        <div className="absolute bottom-10 right-12 flex gap-6 items-center z-20">
          <Button variant={"outline"} onClick={() => paginate(-1)} className="bg-accent cursor-pointer">
            <ChevronLeft className="w-12 h-12" />
          </Button>
          <p className="">
            {index + 1} / {imagesList.length}
          </p>
          <Button variant={"outline"} onClick={() => paginate(1)} className="bg-accent cursor-pointer">
            <ChevronRight className="w-12 h-12" />
          </Button>
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <div key={index}>
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute top-30 xl:left-12 sm:left-8 max-w-lg w-full flex flex-col gap-3 z-20"
            >
              <p className="text-primary text-lg">#{index + 1} Banyak Ditonton</p>
              <H1 text={anime[index]?.title} />
              <div className="flex gap-5 items-center">
                <Button variant={"outline"} className="flex gap-2 cursor-pointer text-primary px-3 py-1">
                  <Star className="w-5 h-5" /> {anime[index].rating}
                </Button>
                <button className="cursor-pointer px-2 py-1 bg-accent text-accent-foreground rounded-md">
                  TV
                </button>
                <p>{anime[index].genre.join(", ")}</p>
              </div>
              <p className="text-sm line-clamp-3 overflow-hidden text-ellipsis">
                {anime[index]?.synopsis}
              </p>
              <div className="flex gap-2 items-center">
                <Link
                  href={`/anime/${anime[index].id}/watch?episode=1`}
                  className="font-semibold px-5 py-3 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Nonton Sekarang
                </Link>
                <Link
                  href={`/anime/${anime[index].id}`}
                  className="font-semibold px-5 py-3 bg-card border border-border text-foreground hover:text-accent-foreground rounded-full flex items-center justify-center gap-1 text-sm"
                >
                  Detail
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            <div className="relative">
              <motion.img
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                alt="image"
                className="absolute top-0 left-0 w-full object-cover"
                src={imagesList[index] || ""}
              />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};
