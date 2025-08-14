import axios from 'axios';

const token = '7|ARvGMekq24XN9rYxhVPmDwc4I3F5OaaQ8O37hWSM3a3ab9f1';
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  withCredentials: false
});

export default axiosInstance;
