import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BackendIP = process.env.BACKEND_IP ? process.env.BACKEND_IP : "http://localhost:3000";

// User tanpa relasi
export interface IUser {
  id: string
  email: string
  username?: string | null
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

// Anime tanpa relasi
export interface IAnime {
  id?: string
  title: string
  synopsis?: string | null
  coverImage?: string | null
  bannerImage?: string | null
  genre: string[]
  status: "ongoing" | "completed" | "upcoming"
  releaseDate: number 
  rating: number
}

// Episode tanpa relasi
export interface IEpisode {
  id: string
  animeId: string
  title: string
  episodeNum: number
  description?: string | null
  duration?: number | null // detik
  releaseDate?: Date | null
  videoUrl: string
  subtitleUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

// Watch History tanpa relasi
export interface IWatchHistory {
  id: string
  userId: string
  episodeId: string
  progress: number // detik terakhir ditonton
  updatedAt: Date
}

// User dengan riwayat tontonan
export interface IUserWithHistory extends IUser {
  watchHistories: IWatchHistoryWithEpisode[]
}

// Anime dengan episode
export interface IAnimeWithEpisodes extends IAnime {
  episodes: IEpisode[]
}

// Episode dengan anime & riwayat tontonan
export interface IEpisodeWithRelations extends IEpisode {
  anime: IAnime
  watchHistories: IWatchHistory[]
}

// Watch history dengan detail episode
export interface IWatchHistoryWithEpisode extends IWatchHistory {
  episode: IEpisode
}
