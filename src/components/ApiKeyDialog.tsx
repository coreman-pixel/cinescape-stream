import { useState } from "react";
import { motion } from "framer-motion";
import { Key, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setApiKey, getApiKey } from "@/lib/tmdb";

interface ApiKeyDialogProps {
  onKeySet: () => void;
}

export function ApiKeyDialog({ onKeySet }: ApiKeyDialogProps) {
  const [key, setKey] = useState(getApiKey());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      setApiKey(key.trim());
      onKeySet();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass rounded-2xl p-8"
      >
        <div className="gradient-bg p-3 rounded-xl w-fit mx-auto mb-6">
          <Key className="h-6 w-6 text-primary-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-center mb-2">TMDB API Key</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your TMDB API key to load movie data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your TMDB API key..."
            className="bg-secondary/50 border-border/50"
          />
          <Button type="submit" className="w-full gradient-bg text-primary-foreground font-semibold hover:opacity-90">
            Save & Continue
          </Button>
        </form>

        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Get a free API key from TMDB
          <ExternalLink className="h-3 w-3" />
        </a>
      </motion.div>
    </div>
  );
}
