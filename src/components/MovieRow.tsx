import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MovieCard, MovieCardSkeleton } from "./MovieCard";
import { Movie } from "@/lib/tmdb";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

export function MovieRow({ title, movies, isLoading }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative group/row"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => scroll("left")} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => scroll("right")} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="min-w-[160px] md:min-w-[200px] snap-start">
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map((movie, i) => (
              <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start">
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
      </div>
    </motion.section>
  );
}
