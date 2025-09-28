
import { GoogleGenAI } from "@google/genai";
import type { ChannelInfo, GroundingChunk, GeminiSearchResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function parseChannelString(text: string): ChannelInfo[] {
    const channels: ChannelInfo[] = [];
    if (!text) return channels;

    const lines = text.split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length === 2) {
            const [name, country] = parts;
            if(name && country) {
                channels.push({ name, country });
            }
        }
    }
    return channels;
}


export const findCricketChannels = async (query: string): Promise<GeminiSearchResult> => {
    const prompt = `Based on the latest information from Google Search, list the channels that are legally and freely broadcasting the cricket match: "${query}". 
    For each channel, provide the channel name and the country or region where it is available. 
    Format each finding as "Channel Name | Country/Region". 
    Separate each finding with a new line. 
    Do not include any introductory or concluding sentences, only the list. If no free channels are found, return an empty response.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const channels = parseChannelString(response.text);
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

        return { channels, sources };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch data from AI service. Please check your connection or API key.");
    }
};
