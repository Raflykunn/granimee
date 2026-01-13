import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BackendIP = process.env.BACKEND_IP
  ? process.env.BACKEND_IP
  : "https://yumaapi.vercel.app";

// User tanpa relasi
export interface IUser {
  id?: string;
  email?: string;
  username?: string | null;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// Anime tanpa relasi
export interface IAnime {
  id?: string;
  title: string;
  synopsis?: string | null;
  coverImage?: string | null;
  bannerImage?: string | null;
  genre: string[];
  status: "ongoing" | "completed" | "upcoming";
  releaseDate: number;
  rating: number;
}

// Episode tanpa relasi
export interface IEpisode {
  id: string;
  animeId: string;
  title: string;
  episodeNum: number;
  duration: string;
  releaseDate?: Date | null;
  videoUrl: string;
  subtitleUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Watch History tanpa relasi
export interface IWatchHistory {
  id: string;
  userId: string;
  episodeId: string;
  progress: number; // detik terakhir ditonton
  updatedAt: Date;
}

// User dengan riwayat tontonan
export interface IUserWithHistory extends IUser {
  watchHistories: IWatchHistoryWithEpisode[];
}

// Anime dengan episode
export interface IAnimeWithEpisodes extends IAnime {
  episode: IEpisode[];
}

// Episode dengan anime & riwayat tontonan
export interface IEpisodeWithRelations extends IEpisode {
  anime: IAnime;
  watchHistories: IWatchHistory[];
}

// Watch history dengan detail episode
export interface IWatchHistoryWithEpisode extends IWatchHistory {
  episode: IEpisode;
}

// HIANIME API

export interface IHiAnimeStreamData {
  headers: {
    Referer: string;
  };
  intro: {
    end: number;
    start: number;
  };
  outro: {
    end: number;
    start: number;
  };
  previews: {
    type: string;
    url: string;
  }[];
  sources: {
    isM3U8: boolean;
    quality: string;
    url: string;
  }[];
  subtitles: {
    lang: string;
    url: string;
  }[];
}

export interface IHiAnimeEpisode {
  id: string;
  is_dubbed: boolean;
  is_filler: boolean;
  is_subbed: boolean;
  number: number;
  title: string;
  url: string;
}

export interface IHiAnimeCard {
  dub: number;
  duration: string;
  episodes: number;
  id: string;
  image: string;
  japanese_title: string;
  nsfw: boolean;
  other_data?: Record<string, unknown>;
  sub: number;
  title: string;
  type: string;
  url: string;
}

export interface IHiAnimeDetail {
  aired: string;
  anilist_id: string;
  cover: string;
  description: string;
  dub: number;
  duration: string;
  episodes: IHiAnimeEpisode[];
  genres: string[];
  has_dub: boolean;
  has_sub: boolean;
  id: string;
  image: string;
  japanese_title: string;
  mal_id: string;
  mal_score: string;
  premiered: string;
  producers: string[];
  recommendations: IHiAnimeCard[];
  status: string;
  studios: string[];
  sub: number;
  sub_or_dub: string;
  title: string;
  total_episodes: number;
  type: string;
  url: string;
}

export interface IHiAnimeRecentEpisode {
  current_page: number;
  has_next_page: boolean;
  results: IHiAnimeCard[];
}

export interface IHiAnimeSpotlight {
  dub: number;
  duration: string;
  episodes: number;
  id: string;
  image: string;
  japanese_title: string;
  nsfw: boolean;
  other_data: {
    description: string;
    rank: string;
    releaseDate: string;
  };
  sub: number;
  title: string;
  type: string;
  url: string;
}

export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

export interface AnimeItem {
  title: string;
  alternativeTitle: string;
  id: string;
  poster: string; // URL
  episodes: Episodes;
  type: string;
  duration: string;
}

export interface Episodes {
  sub: number;
  dub: number;
  eps: number;
}

export interface AnimeListResponse {
  status: boolean;
  data: AnimeListData;
}

export interface AnimeListData {
  pageInfo: PageInfo;
  response: AnimeItem[];
}

export interface TopAnimeData {
  today: AnimeItem[];
  week: AnimeItem[];
  month: AnimeItem[];
}

// Root response
export interface TopAnimeResponse {
  status: boolean;
  data: TopAnimeData;
}
