

# 🎬 Movie Streaming Site — FlixVault

## Overview
A dark-themed movie streaming site inspired by the reference, powered by TMDB API, with user accounts, favorites/watchlist, and smooth animations. Modern dark theme with purple/blue gradient accents.

## Design
- **Theme**: Dark background (#0B0F1A), with purple-blue gradient accents
- **Typography**: Inter for body, bold display font for headings
- **Cards**: Glassmorphism movie cards with hover scale + glow effects
- **Animations**: Fade-in on scroll, hover scale on cards, smooth page transitions, skeleton loading states

## Pages & Features

### 1. Homepage
- **Hero carousel** — auto-sliding featured movies with backdrop images, title, rating, and "Watch Now" CTA
- **Movie grid sections** — Trending, Popular, Top Rated, categorized rows
- **Sticky navbar** — Logo, category links (Bollywood, Hollywood, Web Series, Netflix), search icon, user avatar
- **Genre sidebar** — Collapsible genre list with movie counts (like the reference)

### 2. Movie Detail Page
- Backdrop image with overlay gradient
- Title, year, rating, runtime, genres, overview
- Embedded YouTube trailer player
- Cast carousel
- Similar movies section

### 3. Search & Filters
- Full-screen search overlay with instant results
- Filter by genre, year, language, rating
- Responsive grid results

### 4. Video Player Page
- Embedded player (trailer/demo — using TMDB trailer links)
- Movie info sidebar

### 5. Auth Pages (Login / Signup)
- Lovable Cloud auth with email/password + Google
- Clean dark-themed auth forms

### 6. User Profile / Watchlist
- Favorites grid
- Watchlist grid
- Watch history

## Tech
- **TMDB API** for movie data (free, requires API key stored as secret)
- **Lovable Cloud** for auth, user profiles, favorites & watchlist tables
- **Framer Motion** for page transitions and scroll animations
- **React Router** for navigation
- **TanStack Query** for data fetching & caching

