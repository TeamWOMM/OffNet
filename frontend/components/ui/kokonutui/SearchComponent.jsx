// Create this as components/ui/search-bar.jsx
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      onSearch?.(query);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100" />
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything..."
            className="w-full px-6 py-4 bg-gray-900/90 border border-gray-800 rounded-lg pl-12 pr-16
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50
                     transition-all duration-300 backdrop-blur-sm
                     group-hover:bg-gray-900/95 group-hover:border-purple-500/50"
          />
          <Search className="absolute left-4 w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-3 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-md
                     hover:bg-purple-500/30 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;