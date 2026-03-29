import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { Movie, getImageUrl } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/movie/${movie.id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl glass-hover aspect-[2/3]">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-semibold">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="gradient-bg p-3 rounded-full shadow-lg shadow-primary/30">
              <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
            </div>
          </div>

          {/* Title at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-sm font-semibold text-foreground line-clamp-2">{movie.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {movie.release_date?.split("-")[0]}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="aspect-[2/3] rounded-xl bg-muted animate-pulse" />
  );
}
