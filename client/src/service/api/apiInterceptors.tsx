
import axios from 'axios';
import { BASE_URL } from '../config';

import { tokenStorage } from '../storage';
import { resetAndNavigate } from '@/utils/Helpers';

export const appAxios = axios.create({
    baseURL: BASE_URL,
});


export const refresh_tokens = async () => {
    try {
        const refreshToken = tokenStorage.getString('refreshToken');
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refresh_token: refreshToken,
        });
        const new_access_token = response.data.access_token;
        const new_refresh_token = response.data.refresh_token;
        tokenStorage.set('accessToken', new_access_token);
        tokenStorage.set('refreshToken', new_refresh_token);
        return new_access_token;
    } catch (error) {
        console.log('REFRESH TOKEN ERROR');
        tokenStorage.clearAll();
        resetAndNavigate('/auth');
    }
};


appAxios.interceptors.request.use(async config => {
    const accessToken = tokenStorage.getString('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

appAxios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                const newAccessToken = await refresh_tokens();
                if (newAccessToken) {
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(error.config);
                }
            } catch (error) {
                console.log('Error Refreshing Token');
            }
        }

        if (error.response && error.response.status != 401) {
            const errorMessage = error.response.data.msg || 'Token Expired';
        }
        return Promise.reject(error);
    },
);

