import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        typeof window === 'undefined'
            ? process.env.API_URL
            : process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
