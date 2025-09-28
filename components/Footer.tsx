
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-secondary mt-12 py-4">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>
          Disclaimer: This service uses AI to find publicly available, free-to-air broadcast information.
          Availability may vary by region and is subject to change by broadcasters.
        </p>
        <p>&copy; {new Date().getFullYear()} Live Cricket Finder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
