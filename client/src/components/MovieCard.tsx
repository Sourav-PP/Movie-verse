import { Link } from "react-router-dom";
import type { Movie } from "../types/dto/Movie";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

const HeartFilled = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const HeartOutline = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div
        className={`
          group relative rounded-2xl overflow-hidden border transition-all duration-300
          bg-white dark:bg-gray-900
          border-gray-200 dark:border-gray-800
          shadow-sm hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-red-500/30
          cursor-pointer
        `}
      >
        {/* Poster */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight text-gray-900 dark:text-white">
            {movie.Title}
          </h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {movie.Year}
          </p>

          {/* Favorite Button (stops propagation so click doesn't open detail) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`
              absolute top-3 right-3 p-2 rounded-full
              transition-all duration-200 transform hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              focus:ring-offset-transparent
              ${isFavorite
                ? "text-red-500 bg-red-500/10 dark:bg-red-500/20 hover:bg-red-500/20 shadow-sm"
                : "text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 shadow"
              }
            `}
          >
            {isFavorite ? <HeartFilled /> : <HeartOutline />}
          </button>
        </div>

        <div className="h-1 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}