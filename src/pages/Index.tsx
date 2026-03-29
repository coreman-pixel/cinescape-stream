import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel, HeroSkeleton } from "@/components/HeroCarousel";
import { MovieRow } from "@/components/MovieRow";
import { GenreSidebar } from "@/components/GenreSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex gap-6 pb-16">
        <GenreSidebar />
        <div className="flex-1 space-y-10">
          <TrendingRow />
          <PopularRow />
          <TopRatedRow />
          <NowPlayingRow />
          <UpcomingRow />
        </div>
      </div>
    </div>
  );
};

function HeroSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending-hero"],
    queryFn: () => tmdb.trending("week"),
  });
  if (isLoading) return <HeroSkeleton />;
  return <HeroCarousel movies={data?.results || []} />;
}

function TrendingRow() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => tmdb.trending("day"),
  });
  return <MovieRow title="🔥 Trending Today" movies={data?.results || []} isLoading={isLoading} />;
}

function PopularRow() {
  const { data, isLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: () => tmdb.popular(),
  });
  return <MovieRow title="🎬 Popular" movies={data?.results || []} isLoading={isLoading} />;
}

function TopRatedRow() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-rated"],
    queryFn: () => tmdb.topRated(),
  });
  return <MovieRow title="⭐ Top Rated" movies={data?.results || []} isLoading={isLoading} />;
}

function NowPlayingRow() {
  const { data, isLoading } = useQuery({
    queryKey: ["now-playing"],
    queryFn: () => tmdb.nowPlaying(),
  });
  return <MovieRow title="🎥 Now Playing" movies={data?.results || []} isLoading={isLoading} />;
}

function UpcomingRow() {
  const { data, isLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => tmdb.upcoming(),
  });
  return <MovieRow title="📅 Upcoming" movies={data?.results || []} isLoading={isLoading} />;
}

export default Index;
