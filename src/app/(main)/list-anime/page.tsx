"use client";
import { Button } from "@/components/ui/button";
import { H3, H4 } from "@/components/ui/typography";
import { useAnime } from "@/hooks/use-anime";
import Link from "next/link";

export default function Page() {
  const { anime } = useAnime("/api/list/anime");

  const grouped = anime.reduce((acc, item) => {
    const index = item.title.charAt(0).toUpperCase();
    if (!acc[index]) acc[index] = [];
    acc[index].push(item);
    return acc;
  }, {});

  const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const index = Object.keys(grouped).sort();

  console.log(index);

  return (
    <div className="w-full mx-12 my-30 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <H3 text="Daftar Anime" />
        <p className="text-sm">Total anime: {anime.length}</p>
        <div className="flex flex-wrap w-[90%] items-center gap-3">
          {list.map((item) => (
            <Link key={item} href={`list-anime#${item.toLowerCase()}`}>
              <Button className="text-xs" variant={"outline"} size={"sm"}>
                {item}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {index.map((item) => (
        <section
          id={item.toLowerCase()}
          key={item}
          className="my-4 flex flex-col gap-4"
        >
          <div className="border-b-2 border-ring w-[90%]">
            <H4 text={item} />
          </div>
          <ul className="flex justify-between flex-wrap gap-16">
            {grouped[item].map((item, index) => (
              <ul key={index}>
                <li className="list-disc ml-5">
                  <Link
                    className="text-sm hover:text-primary"
                    href={`/anime/${item.id}`}
                  >
                    {item.title}
                  </Link>
                </li>
              </ul>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
