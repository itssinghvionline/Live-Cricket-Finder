
import React from 'react';

interface ChannelCardProps {
  channelName: string;
  country: string;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channelName, country }) => {
  return (
    <div className="bg-dark-tertiary p-4 rounded-lg shadow-lg flex items-center space-x-4 transition transform hover:scale-105">
      <div className="flex-shrink-0 h-12 w-12 bg-dark-primary rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-cricket-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{channelName}</h3>
        <p className="text-sm text-gray-400">{country}</p>
      </div>
    </div>
  );
};

export default ChannelCard;
