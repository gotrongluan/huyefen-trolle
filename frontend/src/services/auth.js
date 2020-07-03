/* eslint-disable */
import { apiPost } from '@/helpers/request';

export async function login(phone, password) {
    return apiPost(`${AUTH_API_URL}/login`, {
        body: {
            password,
            phone
        }
    });
};
                   
export async function register(params) {
    return apiPost(`${AUTH_API_URL}/register`, {
        body: params
    });
};