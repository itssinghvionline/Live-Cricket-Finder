
import React from 'react';

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, setQuery, handleSearch, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., India vs Australia T20"
        className="w-full px-4 py-3 bg-dark-tertiary border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cricket-green focus:border-cricket-green transition duration-200"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-cricket-green text-dark-primary font-bold rounded-lg hover:bg-green-500 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : (
          'Find Channels'
        )}
      </button>
    </form>
  );
};

export default SearchForm;
