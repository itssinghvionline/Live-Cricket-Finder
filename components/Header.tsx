
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-secondary shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-cricket-green"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <circle cx="12" cy="12" r="3" fill="#facc15" />
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-wider">
            Cricket Live Finder
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
