import axiosInstance from '@/constants/axiosInstance';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/lib/authOptions';

interface ApiRequestProps {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    params?: Record<string, any>;
    server?: boolean;
    headers?: any;
}

export async function apiRequest<T = any>({
    method,
    url,
    data,
    params,
    server = false,
    headers
}: ApiRequestProps): Promise<T> {
    let token: string | undefined;

    if (server) {
        const session = await getServerSession(authOptions);
        token = session?.accessToken;
    } else {
        const session = await getSession();
        token = session?.accessToken;
    }

    if (!token) throw new Error('No access token available');

    try {
        const res = await axiosInstance.request<T>({
            method,
            url,
            data,
            params,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        if (error.response) {
            console.error('API Error:', error.response.data);
            throw new Error(error.response.data.message || 'Server API error');
        }
        console.error('Unexpected Error:', error.message || error);
        throw new Error(error.message || 'Unknown error');
    }
}
