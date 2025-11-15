// pages/MovieDetail.tsx
import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import toast from "react-hot-toast";
import { handleApiError } from "../lib/utils/handleApiError";
import type { MovieDetails } from "../types/dto/Movie";
import { ArrowLeftIcon } from "lucide-react";

const MovieDetail = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchMovie = useCallback(async () => {
    if (!imdbID) return;
    setLoading(true);
    try {
      const res = await movieApi.getMovieById(imdbID);
      setMovie(res.data.data);
    } catch (error) {
      handleApiError(error);
      navigate("/"); 
    } finally {
      setLoading(false);
    }
  }, [imdbID, navigate]);

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await movieApi.getFavorites();
      if (res.data.success) {
        setFavorites(res.data.data.map((m: MovieDetails) => m.imdbID));
      }
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  const toggleFavorite = async () => {
    if (!movie) return;
    const isFav = favorites.includes(movie.imdbID);
    try {
      if (isFav) {
        await movieApi.removeFavorite(movie.imdbID);
        toast.success("Removed from favorites");
        setFavorites((prev) => prev.filter((id) => id !== movie.imdbID));
      } else {
        await movieApi.addFavorite(movie.imdbID);
        toast.success("Added to favorites");
        setFavorites((prev) => [...prev, movie.imdbID]);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchFavorites();
  }, [fetchMovie, fetchFavorites]);

  if (loading) return <DetailSkeleton />;
  if (!movie) return null;

  const isFavorite = favorites.includes(movie.imdbID);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-28 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Search
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
              alt={movie.Title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {movie.Title}
              </h1>
              <p className="text-gray-400 flex items-center gap-4 text-sm">
                <span>{movie.Year}</span>
                <span>•</span>
                <span>{movie.Runtime}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">{movie.Rated}</span>
              </p>
            </div>

            {/* Ratings */}
            <div className="flex gap-4 flex-wrap">
              {movie.Ratings.map((rating) => (
                <div
                  key={rating.Source}
                  className="bg-gray-900 px-4 py-2 rounded-lg text-sm border border-gray-800"
                >
                  <div className="text-gray-400 text-xs">{rating.Source}</div>
                  <div className="font-semibold text-white">{rating.Value}</div>
                </div>
              ))}
              {movie.Metascore !== "N/A" && (
                <div className="bg-gray-900 px-4 py-2 rounded-lg text-sm border border-gray-800">
                  <div className="text-gray-400 text-xs">Metascore</div>
                  <div className="font-semibold text-green-400">{movie.Metascore}</div>
                </div>
              )}
            </div>

            {/* Plot */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Plot</h3>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {movie.Director !== "N/A" && (
                <div>
                  <span className="text-gray-500">Director</span>
                  <p className="font-medium text-white">{movie.Director}</p>
                </div>
              )}
              {movie.Writer !== "N/A" && (
                <div>
                  <span className="text-gray-500">Writer</span>
                  <p className="font-medium text-white">{movie.Writer}</p>
                </div>
              )}
              {movie.Actors !== "N/A" && (
                <div>
                  <span className="text-gray-500">Actors</span>
                  <p className="font-medium text-white">{movie.Actors}</p>
                </div>
              )}
              {movie.Genre !== "N/A" && (
                <div>
                  <span className="text-gray-500">Genre</span>
                  <p className="font-medium text-white">{movie.Genre}</p>
                </div>
              )}
              {movie.Language !== "N/A" && (
                <div>
                  <span className="text-gray-500">Language</span>
                  <p className="font-medium text-white">{movie.Language}</p>
                </div>
              )}
              {movie.Country !== "N/A" && (
                <div>
                  <span className="text-gray-500">Country</span>
                  <p className="font-medium text-white">{movie.Country}</p>
                </div>
              )}
              {movie.BoxOffice !== "N/A" && (
                <div>
                  <span className="text-gray-500">Box Office</span>
                  <p className="font-medium text-white">{movie.BoxOffice}</p>
                </div>
              )}
              {movie.Awards !== "N/A" && (
                <div className="sm:col-span-2">
                  <span className="text-gray-500">Awards</span>
                  <p className="font-medium text-yellow-400">{movie.Awards}</p>
                </div>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className={`
                mt-6 flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${isFavorite
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }
              `}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton
const DetailSkeleton = () => (
  <div className="min-h-screen bg-gray-950 text-white p-8">
    <div className="container mx-auto">
      <div className="h-6 w-32 bg-gray-800 rounded mb-8 animate-pulse" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="h-96 bg-gray-800 rounded-xl animate-pulse" />
        <div className="md:col-span-2 space-y-6">
          <div className="h-10 bg-gray-800 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-1/2 animate-pulse" />
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 w-24 bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetail;