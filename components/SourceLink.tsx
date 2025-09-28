
import React from 'react';

interface SourceLinkProps {
  uri: string;
  title: string;
}

const SourceLink: React.FC<SourceLinkProps> = ({ uri, title }) => {
  return (
    <a
      href={uri}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-dark-tertiary p-3 rounded-lg hover:bg-gray-700 transition duration-200"
    >
      <p className="font-semibold text-cricket-yellow truncate">{title || 'Untitled Source'}</p>
      <p className="text-sm text-gray-400 truncate">{uri}</p>
    </a>
  );
};

export default SourceLink;
