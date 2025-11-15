// src/pages/Home.tsx
import React, { useCallback, useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import toast from "react-hot-toast";
import { messages } from "../constants/messages/generalMessages";
import { handleApiError } from "../lib/utils/handleApiError";
import type { Movie } from "../types/dto/Movie";
import { SearchBar } from "../components/searchBar";
import { MovieCard } from "../components/MovieCard";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      toast.error(messages.ERROR.PROVIDE_QUERY);
      return;
    }
    setLoading(true);
    try {
      const res = await movieApi.fetchMovies(query);
      toast.success(res.data.message);
      setMovies(res.data.data.movies);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await movieApi.getFavorites();
      if (!res.data.success) {
        toast.error(res.data.message || messages.ERROR.INTERNAL_ERROR);
        return;
      }
      setFavorites(res.data.data);
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  const toggleFavorite = async (movie: Movie) => {
    const isFav = favorites.some((m) => m.imdbID === movie.imdbID);
    try {
      if (isFav) {
        const res = await movieApi.removeFavorite(movie.imdbID);
        toast.success(res.data.message);
        setFavorites((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
      } else {
        const res = await movieApi.addFavorite(movie.imdbID);
        toast.success(res.data.message);
        setFavorites((prev) => [...prev, movie]);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-28 py-8">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-3">
            Discover Movies
          </h1>
          <p className="text-gray-400 text-lg">Search and save your favorite films</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar onSearch={fetchMovies} />
        </div>

        {/* Results */}
        {loading ? (
          <MovieGridSkeleton />
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={favorites.some((m) => m.imdbID === movie.imdbID)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="Search for a movie to get started!" />
        )}
      </div>
    </div>
  );
};

// Skeleton Loader
const MovieGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-800" />
        <div className="p-4 space-y-2">
          <div className="h-5 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// Empty State
const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-20">
    <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
      <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" />
      </svg>
    </div>
    <p className="text-gray-400 text-lg">{message}</p>
  </div>
);

export default Home;