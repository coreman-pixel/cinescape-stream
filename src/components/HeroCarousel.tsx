import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie, getBackdropUrl } from "@/lib/tmdb";

interface HeroCarouselProps {
  movies: Movie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const items = movies.slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % items.length), 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;
  const movie = items[current];

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
                <Star className="h-4 w-4 fill-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
              <span className="text-sm text-muted-foreground">
                {movie.release_date?.split("-")[0]}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {movie.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-6 max-w-lg">
              {movie.overview}
            </p>

            <div className="flex gap-3">
              <Link to={`/watch/${movie.id}`}>
                <Button className="gradient-bg text-primary-foreground font-semibold gap-2 px-6 h-11 hover:opacity-90 transition-opacity">
                  <Play className="h-5 w-5 fill-primary-foreground" />
                  Watch Now
                </Button>
              </Link>
              <Link to={`/movie/${movie.id}`}>
                <Button variant="outline" className="gap-2 h-11 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60">
                  <Info className="h-5 w-5" />
                  Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 gradient-bg" : "w-4 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-card/30 backdrop-blur-sm hover:bg-card/60 hidden md:flex"
        onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-card/30 backdrop-blur-sm hover:bg-card/60 hidden md:flex"
        onClick={() => setCurrent((c) => (c + 1) % items.length)}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full h-[70vh] md:h-[80vh] bg-muted animate-pulse flex items-end p-12">
      <div className="space-y-4 max-w-lg">
        <div className="h-4 w-20 bg-muted-foreground/20 rounded" />
        <div className="h-12 w-96 bg-muted-foreground/20 rounded" />
        <div className="h-4 w-80 bg-muted-foreground/20 rounded" />
        <div className="h-11 w-40 bg-muted-foreground/20 rounded-md" />
      </div>
    </div>
  );
}
