import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { tmdb, Genre } from "@/lib/tmdb";
import { Film, ChevronRight } from "lucide-react";

export function GenreSidebar() {
  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: tmdb.genres,
  });

  const genres = data?.genres || [];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden lg:block w-56 shrink-0"
    >
      <div className="sticky top-20 glass rounded-xl p-4">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Film className="h-4 w-4 text-primary" />
          Genres
        </h3>
        <div className="space-y-0.5">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/search?genre=${genre.id}`}
                className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors group"
              >
                <span>{genre.name}</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
