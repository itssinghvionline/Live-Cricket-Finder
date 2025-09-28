
export interface ChannelInfo {
  name: string;
  country: string;
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface GeminiSearchResult {
  channels: ChannelInfo[];
  sources: GroundingChunk[];
}
