
import React, { useState, useCallback } from 'react';
import type { ChannelInfo, GroundingChunk } from './types';
import { findCricketChannels } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ChannelCard from './components/ChannelCard';
import SourceLink from './components/SourceLink';
import { TvIcon } from './components/icons/TvIcon';
import { WebIcon } from './components/icons/WebIcon';


const App: React.FC = () => {
  const [query, setQuery] = useState<string>('India vs Pakistan T20 World Cup');
  const [channels, setChannels] = useState<ChannelInfo[] | null>(null);
  const [sources, setSources] = useState<GroundingChunk[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a match description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setChannels(null);
    setSources(null);

    try {
      const result = await findCricketChannels(query);
      setChannels(result.channels);
      setSources(result.sources);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen bg-dark-primary text-gray-200 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
            Find Live Cricket Anywhere
          </h1>
          <p className="text-lg text-gray-400">
            Enter a match and our AI will find legally free-to-air channels and streams for you.
          </p>
        </div>

        <SearchForm
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="w-full max-w-3xl mt-8">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {channels && channels.length > 0 && (
            <div className="bg-dark-secondary rounded-lg shadow-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-cricket-green">
                <TvIcon className="w-6 h-6 mr-2" />
                Broadcast Channels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {channels.map((channel, index) => (
                  <ChannelCard key={index} channelName={channel.name} country={channel.country} />
                ))}
              </div>
            </div>
          )}

          {sources && sources.length > 0 && (
             <div className="bg-dark-secondary rounded-lg shadow-2xl p-6 mt-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-cricket-yellow">
                    <WebIcon className="w-6 h-6 mr-2" />
                    Web Sources
                </h2>
                <div className="space-y-3">
                    {sources.map((source, index) => (
                       <SourceLink key={index} uri={source.web.uri} title={source.web.title} />
                    ))}
                </div>
             </div>
          )}

          {!isLoading && channels?.length === 0 && (
             <div className="text-center text-gray-400 mt-8">
                <p>No free channels found for this match based on current information.</p>
                <p>Broadcast rights can change quickly, so please check closer to the match time.</p>
             </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
