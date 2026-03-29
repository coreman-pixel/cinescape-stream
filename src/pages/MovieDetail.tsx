import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, Clock, Calendar, Play, ArrowLeft } from "lucide-react";
import { tmdb, getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import { Navbar } from "@/components/Navbar";
import { CastCarousel } from "@/components/CastCarousel";
import { MovieRow } from "@/components/MovieRow";
import { Button } from "@/components/ui/button";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => tmdb.movieDetail(movieId),
    enabled: !!movieId,
  });

  const { data: credits } = useQuery({
    queryKey: ["credits", movieId],
    queryFn: () => tmdb.movieCredits(movieId),
    enabled: !!movieId,
  });

  const { data: videos } = useQuery({
    queryKey: ["videos", movieId],
    queryFn: () => tmdb.movieVideos(movieId),
    enabled: !!movieId,
  });

  const { data: similar } = useQuery({
    queryKey: ["similar", movieId],
    queryFn: () => tmdb.similar(movieId),
    enabled: !!movieId,
  });

  const trailer = videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="h-[60vh] bg-muted animate-pulse" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Backdrop */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 -mt-[30vh] relative z-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="shrink-0"
          >
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-48 md:w-64 rounded-xl shadow-2xl shadow-primary/10"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-muted-foreground italic mb-4">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="h-5 w-5 fill-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {movie.release_date}
              </span>
              {movie.runtime > 0 && (
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/search?genre=${g.id}`}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            <div className="flex gap-3">
              <Link to={`/watch/${movie.id}`}>
                <Button className="gradient-bg text-primary-foreground font-semibold gap-2 px-6 hover:opacity-90">
                  <Play className="h-5 w-5 fill-primary-foreground" /> Watch Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Trailer */}
        {trailer && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Official Trailer</h2>
            <div className="aspect-video max-w-3xl rounded-xl overflow-hidden glass">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Cast */}
        {credits?.cast && credits.cast.length > 0 && (
          <div className="mt-12">
            <CastCarousel cast={credits.cast} />
          </div>
        )}

        {/* Similar */}
        {similar?.results && similar.results.length > 0 && (
          <div className="mt-12 pb-16">
            <MovieRow title="Similar Movies" movies={similar.results} />
          </div>
        )}
      </div>
    </div>
  );
}
