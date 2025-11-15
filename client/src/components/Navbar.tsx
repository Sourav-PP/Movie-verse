// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, HeartIcon } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg" />
          <span className="text-xl font-bold text-white">MovieHub</span>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive("/")
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            to="/favorites"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive("/favorites")
                ? "bg-gray-800 text-red-400"
                : "text-gray-300 hover:text-red-400 hover:bg-gray-800"
            }`}
          >
            <HeartIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}