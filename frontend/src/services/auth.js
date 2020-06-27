/* eslint-disable */
import { apiPost } from '@/helpers/request';

export async function register(params) {
    return apiPost(`${AUTH_API_URL}/register`, {
        body: params
    });
}