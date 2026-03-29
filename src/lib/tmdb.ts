const TMDB_API_KEY = ""; // Will be set via UI
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size: string = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : "/placeholder.svg";

export const getBackdropUrl = (path: string | null) =>
  path ? `${IMG_BASE}/original${path}` : "/placeholder.svg";

// Store API key in localStorage for client-side use
export const setApiKey = (key: string) => localStorage.setItem("tmdb_api_key", key);
export const getApiKey = () => localStorage.getItem("tmdb_api_key") || TMDB_API_KEY;

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("TMDB API key not set");
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", apiKey);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
  return res.json();
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  adult: boolean;
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  budget: number;
  revenue: number;
  status: string;
  homepage: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface PagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const tmdb = {
  trending: (timeWindow: "day" | "week" = "week") =>
    tmdbFetch<PagedResponse<Movie>>(`/trending/movie/${timeWindow}`),
  popular: (page = 1) =>
    tmdbFetch<PagedResponse<Movie>>("/movie/popular", { page: String(page) }),
  topRated: (page = 1) =>
    tmdbFetch<PagedResponse<Movie>>("/movie/top_rated", { page: String(page) }),
  nowPlaying: (page = 1) =>
    tmdbFetch<PagedResponse<Movie>>("/movie/now_playing", { page: String(page) }),
  upcoming: (page = 1) =>
    tmdbFetch<PagedResponse<Movie>>("/movie/upcoming", { page: String(page) }),
  movieDetail: (id: number) =>
    tmdbFetch<MovieDetail>(`/movie/${id}`),
  movieCredits: (id: number) =>
    tmdbFetch<{ cast: Cast[] }>(`/movie/${id}/credits`),
  movieVideos: (id: number) =>
    tmdbFetch<{ results: Video[] }>(`/movie/${id}/videos`),
  similar: (id: number) =>
    tmdbFetch<PagedResponse<Movie>>(`/movie/${id}/similar`),
  search: (query: string, page = 1) =>
    tmdbFetch<PagedResponse<Movie>>("/search/movie", { query, page: String(page) }),
  genres: () =>
    tmdbFetch<{ genres: Genre[] }>("/genre/movie/list"),
  discover: (params: Record<string, string>) =>
    tmdbFetch<PagedResponse<Movie>>("/discover/movie", params),
};
