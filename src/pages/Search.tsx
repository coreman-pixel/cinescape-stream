import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { tmdb, Genre } from "@/lib/tmdb";
import { Navbar } from "@/components/Navbar";
import { MovieCard, MovieCardSkeleton } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const genreId = searchParams.get("genre") || "";
  const category = searchParams.get("category") || "";
  const [query, setQuery] = useState(q);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(genreId);

  useEffect(() => { setQuery(q); }, [q]);
  useEffect(() => { setSelectedGenre(genreId); }, [genreId]);

  const { data: genreList } = useQuery({
    queryKey: ["genres"],
    queryFn: tmdb.genres,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["search", q, selectedGenre, category],
    queryFn: () => {
      if (q) return tmdb.search(q);
      if (category === "trending") return tmdb.trending("week");
      if (category === "popular") return tmdb.popular();
      if (category === "top_rated") return tmdb.topRated();
      if (selectedGenre) return tmdb.discover({ with_genres: selectedGenre });
      return tmdb.popular();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (query.trim()) params.q = query.trim();
    if (selectedGenre) params.genre = selectedGenre;
    setSearchParams(params);
  };

  const title = q
    ? `Results for "${q}"`
    : category === "trending"
    ? "🔥 Trending"
    : category === "popular"
    ? "🎬 Popular"
    : category === "top_rated"
    ? "⭐ Top Rated"
    : selectedGenre
    ? `Genre: ${genreList?.genres?.find((g) => String(g.id) === selectedGenre)?.name || "..."}`
    : "Browse Movies";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-[1440px] mx-auto px-4 md:px-6 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">{title}</h1>

          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="pl-10 bg-card border-border/50"
                />
              </div>
              <Button type="submit" className="gradient-bg text-primary-foreground hover:opacity-90">
                Search
              </Button>
            </form>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 border-border/50"
            >
              <Filter className="h-4 w-4" />
              Genres
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mb-8 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedGenre ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedGenre("");
                    setSearchParams(q ? { q } : {});
                  }}
                  className={!selectedGenre ? "gradient-bg text-primary-foreground" : "border-border/50"}
                >
                  All
                </Button>
                {genreList?.genres?.map((g) => (
                  <Button
                    key={g.id}
                    variant={selectedGenre === String(g.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedGenre(String(g.id));
                      const params: Record<string, string> = { genre: String(g.id) };
                      if (q) params.q = q;
                      setSearchParams(params);
                    }}
                    className={
                      selectedGenre === String(g.id)
                        ? "gradient-bg text-primary-foreground"
                        : "border-border/50"
                    }
                  >
                    {g.name}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 18 }).map((_, i) => <MovieCardSkeleton key={i} />)
            : data?.results?.map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
        </div>

        {!isLoading && data?.results?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
