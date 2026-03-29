import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Calendar } from "lucide-react";
import { tmdb, getBackdropUrl } from "@/lib/tmdb";
import { Navbar } from "@/components/Navbar";
import { MovieRow } from "@/components/MovieRow";

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data: movie } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => tmdb.movieDetail(movieId),
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
  ) || videos?.results?.[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Player */}
        <div className="relative w-full bg-black">
          {trailer ? (
            <div className="aspect-video max-h-[80vh] mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video max-h-[80vh] mx-auto flex items-center justify-center">
              <p className="text-muted-foreground">No video available</p>
            </div>
          )}
        </div>

        {/* Movie Info */}
        {movie && (
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to details
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {movie.release_date}
                </span>
              </div>
              <p className="text-foreground/80 max-w-3xl leading-relaxed">{movie.overview}</p>
            </motion.div>

            {similar?.results && similar.results.length > 0 && (
              <div className="mt-12">
                <MovieRow title="You Might Also Like" movies={similar.results} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
