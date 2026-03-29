import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Bookmark, Clock, Film, User, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "watchlist", label: "Watchlist", icon: Bookmark },
  { id: "history", label: "History", icon: Clock },
] as const;

export default function Profile() {
  const [activeTab, setActiveTab] = useState<string>("favorites");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-[1440px] mx-auto px-4 md:px-6 pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="gradient-bg p-4 rounded-full">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-display text-2xl font-bold text-foreground">Movie Lover</h1>
            <p className="text-sm text-muted-foreground">Sign in to sync your favorites & watchlist</p>
          </div>
          <div className="md:ml-auto">
            <Link to="/auth">
              <Button className="gradient-bg text-primary-foreground hover:opacity-90">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "gradient-bg text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="glass p-6 rounded-full mb-4">
            <Film className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No {activeTab} yet
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Sign in and start exploring movies to build your {activeTab}.
          </p>
          <Link to="/">
            <Button variant="outline" className="border-border/50 gap-2">
              Browse Movies
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
