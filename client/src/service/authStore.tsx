import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface authStore {
    user: Record<string, any> | null;
    setUser: (user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<authStore>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (data) => set({ user: data }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
);
