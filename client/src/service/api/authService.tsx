import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../authStore';
import { tokenStorage } from '../storage';
import { BASE_URL } from '../config';
import { resetAndNavigate } from '@/utils/Helpers';
import { useAnimeStore } from '../animeStore';
import { useWS } from '../sockets/WSProvider';


GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    forceCodeForRefreshToken: true,
    offlineAccess: false,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID
});

export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        const res = await GoogleSignin.signIn();
        return res.data?.idToken
    } catch (error: any) {
        console.log(error.response.status)
        console.log('SIGN IN WITH GOOGLE ERROR', error);
        Alert.alert("Please configure Google Sign in correctly")
        return null
    }
};

export const login = async (id_token: string, updateAccessToken: () => void) => {


    try {
        const apiRes = await axios.post(`${BASE_URL}/auth/login`, {
            id_token: id_token,
        });
        const { tokens, user } = apiRes.data;
        tokenStorage.set('accessToken', tokens?.access_token);
        tokenStorage.set('refreshToken', tokens?.refresh_token);

        const { setUser } = useAuthStore.getState();
        setUser(user);

        updateAccessToken();

        return true;
    } catch (error: any) {
        console.log('SIGN IN WITH GOOGLE ERROR', error);
        return false;
    }
};

export const logoutFromApp = async (disconnect: () => void) => {


    try {
        const { logout } = useAuthStore.getState();
        const { clearData } = useAnimeStore.getState();

        disconnect();

        logout();
        clearData();
        tokenStorage.clearAll();
        resetAndNavigate('/auth');
        console.log("LOGGED OUT AND WEBSOCKET DISCONNECTED");
    } catch (error) {
        console.log('Logout', error);
    }
};
