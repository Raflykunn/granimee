import {
  BackendIP,
  IAnimeWithEpisodes,
  IHiAnimeCard,
  IHiAnimeDetail,
  IHiAnimeSpotlight,
  IHiAnimeStreamData,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_QUERY_OPTIONS = {
  retry: 3,
  retryDelay: 2000,
  refetchOnWindowFocus: false,
  staleTime: 720 * 60 * 1000,
};

export const useWatchEpisode = (episode_id: string) => {
  const {
    data: streamData,
    isLoading,
    isError,
  } = useQuery<IHiAnimeStreamData>({
    queryKey: ["watch", episode_id],
    queryFn: async () => {
      const response = await fetch(
        `${BackendIP}/watch?episodeId=${episode_id}&type=sub`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      return data;
    },
    ...DEFAULT_QUERY_OPTIONS,
  });

  return { streamData, isLoading, isError };
};

export const useDetailAnime = (slug: string) => {
  const {
    data: anime,
    isLoading,
    isError,
  } = useQuery<IHiAnimeDetail>({
    queryKey: ["detail", slug],
    queryFn: async () => {
      const response = await fetch(`${BackendIP}/info/${slug}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      return data;
    },
    ...DEFAULT_QUERY_OPTIONS,
  });
  return { anime, isLoading, isError };
};

export const useAnime = (apiUrl: string) => {
  const { data: anime = [], isLoading } = useQuery<IAnimeWithEpisodes[]>({
    queryKey: ["anime"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000${apiUrl}`, {
        method: "GET",
      });
      const data = await response.json();
      return data.anime;
    },
    retry: 3,
    retryDelay: 2000,
    refetchOnWindowFocus: false,
    staleTime: 720 * 60 * 1000,
  });

  return { anime, isLoading };
};

export const useLatestAnime = (page: number = 1) => {
  const {
    data: anime = [],
    isLoading,
    error,
  } = useQuery<IHiAnimeCard[]>({
    queryKey: ["latest", page],
    queryFn: async () => {
      const response = await fetch(
        `${BackendIP}/recent-episodes?page=${page}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      // console.log(data.data.spotlight);
      return data.results;
    },
    ...DEFAULT_QUERY_OPTIONS,
  });

  if (error) {
    console.log(error);
  }

  return { anime, isLoading, error };
};

export const usePopularSeasonAnime = () => {
  const {
    data: anime = [],
    isLoading,
    error,
  } = useQuery<IHiAnimeSpotlight[]>({
    queryKey: ["popular-season"],
    queryFn: async () => {
      const response = await fetch(`${BackendIP}/spotlight`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      // console.log(data.data.spotlight);
      return data;
    },
    ...DEFAULT_QUERY_OPTIONS,
  });

  if (error) {
    console.log(error);
  }

  return { anime, isLoading, error };
};
