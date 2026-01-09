"use client";

import { usePopularSeasonAnime } from "@/hooks/use-anime";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

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

  const { anime, isLoading } = usePopularSeasonAnime();

  const imagesList = anime.map((item) => item.image).splice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(([prevPage]) => {
        const nextPage = (prevPage + 1) % (imagesList?.length || 1);
        return [nextPage, 1];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesList]);

  const paginate = (newDirection: number) => {
    setIndex(([prevPage]) => {
      const nextPage =
        (prevPage + newDirection + imagesList.length) % imagesList.length;
      return [nextPage, newDirection];
    });
  };

  if (isLoading)
    return (
      <div className="">
        <Skeleton className="w-[98%] mx-auto my-2 bg-card h-[35vh]" />
      </div>
    );

  return (
    <Card className="w-full overflow-hidden border-primary h-[35vh] md:h-[55vh] p-0 mx-auto relative rounded-xl">
      <div className="absolute bg-gradient-to-r from-17% from-background to-100% to-transparent w-full h-[35vh] md:h-[55vh] z-10"></div>
      <div className="absolute bg-gradient-to-l from-background/100  to-20% to-transparent w-full h-[35vh] md:h-[55vh] z-10"></div>
      <div className="absolute bg-gradient-to-t from-10% from-background/40 to-20% to-transparent w-full h-[35vh] md:h-[55vh] z-10"></div>

      <div className="relative rounded-xl overflow-hidden h-full">
        <div className="absolute md:bottom-8 bottom-2 right-8 flex gap-6 items-center z-20">
          <Button
            variant={"outline"}
            onClick={() => paginate(-1)}
            className="dark:bg-accent md:size-12 size-8 dark:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground border rounded-full cursor-pointer"
          >
            <ChevronLeft className="md:w-12 md:h-12 w-8 h-8" />
          </Button>
          <p className="text-xs md:text-base">
            {index + 1} / {imagesList.length}
          </p>
          <Button
            variant={"outline"}
            onClick={() => paginate(1)}
            className="dark:bg-accent dark:border-accent dark:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground border rounded-full cursor-pointer"
          >
            <ChevronRight className="w-12 h-12" />
          </Button>
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <div key={index} className="rounded-xl w-full h-full">
            <motion.div
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 -translate-y-1/2 xl:left-12 sm:left-8 left-5 max-w-lg md:w-3/5 w-1/2 line-clamp-2 truncate flex flex-col gap-3 z-20"
            >
              <p className="text-primary md:text-sm text-xs">
                #{index + 1} This Season
              </p>
              <p className="md:text-2xl text-lg font-bold">
                {anime[index]?.title}
              </p>
              <p className="text-xs md:inline-block line-clamp-2 hidden">
                {anime[index]?.other_data.description}
              </p>
              <div className="flex gap-2 items-center">
                <Link
                  href={`/anime/${anime[index].id}/watch?episode=1`}
                  className="font-semibold md:text-base px-5 py-3 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2 text-xs"
                >
                  <Play className="w-4 h-4" />
                  Watch Now
                </Link>
                <Link
                  href={`/anime/${anime[index].id}`}
                  className="font-semibold md:text-base px-5 py-3 bg-card border border-border text-foreground hover:text-accent-foreground rounded-full flex items-center justify-center gap-1 text-xs"
                >
                  Detail
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            <div className="relative rounded-xl w-full h-full">
              <motion.img
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                alt="image"
                className="absolute top-0 left-0 rounded-xl w-full h-full object-cover"
                src={imagesList[index] || ""}
              />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </Card>
  );
};
