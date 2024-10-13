import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';
import { appAxios } from './api/apiInterceptors';



export interface Anime {
    _id: string;
    description: string;
    likes: number;
    rating: number;
    starred: number;
    title: string;
    genre: string;
    stream_url: string;
    thumbnail_url: string;
}

interface AnimeStore {
    live: Anime[];
    topLiked: Anime[];
    topRated: Anime[];
    topStarred: Anime[];
    fetchAnimeData: () => void;
    clearData: () => void
}


export const useAnimeStore = create<AnimeStore>()(
    persist(
        (set) => ({
            live: [],
            topLiked: [],
            topRated: [],
            topStarred: [],
            clearData: () => {
                set({
                    live: [],
                    topLiked: [],
                    topRated: [],
                    topStarred: []
                })
            },
            fetchAnimeData: async () => {
                try {
                    const res = await appAxios.get('/anime/list');
                    const data = res.data;

                    set({
                        live: data.live,
                        topLiked: data.top_liked,
                        topRated: data.top_rated,
                        topStarred: data.top_starred,
                    });
                } catch (error) {
                    console.error('Failed to fetch anime data', error);
                }
            },
        }),
        {
            name: 'anime-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
);
