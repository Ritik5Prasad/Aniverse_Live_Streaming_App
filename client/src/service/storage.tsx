import { MMKV } from 'react-native-mmkv';


export const tokenStorage = new MMKV({
    id: 'token-storage',
    encryptionKey: 'some-secret-key',
});


export const storage = new MMKV({
    id: 'my-app-storage',
    encryptionKey: 'some-secret-key',
});

export const mmkvStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
};
