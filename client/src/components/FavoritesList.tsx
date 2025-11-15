// src/pages/Favorites.tsx
import { useCallback, useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import toast from "react-hot-toast";
import { messages } from "../constants/messages/generalMessages";
import type { Movie } from "../types/dto/Movie";
import { MovieCard } from "../components/MovieCard";
import { handleApiError } from "../lib/utils/handleApiError";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const res = await movieApi.getFavorites();
      if (!res.data.success) {
        toast.error(res.data.message || messages.ERROR.INTERNAL_ERROR);
        setFavorites([]);
        return;
      }
      setFavorites(res.data.data);
    } catch (error) {
      handleApiError(error);
      setFavorites([]);
    } finally {
      setLoading(false);
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
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          My Favorites
        </h1>
        <p className="text-gray-400 mb-8">Your saved movies</p>

        {loading ? (
          <MovieGridSkeleton />
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="No favorites yet. Start adding some!" />
        )}
      </div>
    </div>
  );
};

// Reuse same skeleton & empty state
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

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-20">
    <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
      <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2" />
      </svg>
    </div>
    <p className="text-gray-400 text-lg">{message}</p>
  </div>
);

export default Favorites;