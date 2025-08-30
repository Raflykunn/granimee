import { BackendIP, IAnimeWithEpisodes } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useDetailAnime = (slug: string) => {
    const { data: anime, isLoading } = useQuery<IAnimeWithEpisodes>({
    queryKey: ["detail", slug],
    queryFn: async () => {
      const response = await fetch(`${BackendIP}/api/anime/${slug}`, {
        method: "GET",
      });
      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
   return { anime, isLoading }
}

export const useRecomAnime = () => {
    const { data: anime = [], isLoading } = useQuery({
    queryKey: ["recommended"],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/seasons/now`);
      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { anime, isLoading }
}

export const useAnime = (apiUrl: string) => {
    const { data: anime = [], isLoading } = useQuery<IAnimeWithEpisodes[]>({
    queryKey: ["anime"],
    queryFn: async () => {
      const response = await fetch(`${BackendIP}${apiUrl}`, {
        method: "GET"
      });
      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { anime, isLoading }
}