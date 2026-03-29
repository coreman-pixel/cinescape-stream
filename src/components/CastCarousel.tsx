import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cast, getImageUrl } from "@/lib/tmdb";

interface CastCarouselProps {
  cast: Cast[];
}

export function CastCarousel({ cast }: CastCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!cast.length) return null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-foreground">Cast</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => scroll("left")} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => scroll("right")} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {cast.slice(0, 20).map((person, i) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="min-w-[120px] text-center group"
          >
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-muted mb-2 ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
              {person.profile_path ? (
                <img
                  src={getImageUrl(person.profile_path, "w185")}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-foreground line-clamp-1">{person.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{person.character}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
