// src/api/axiosSetup.ts
import apiClient, { setAuthToken } from './auth.api';
import { history } from '@/routes/history';

let isHandling401 = false;

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      if (!isHandling401) {
        isHandling401 = true;
        // clear storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // optionally clear other user keys
        setAuthToken(null);
        // redirect
        history.push('/login');
        // small timeout to avoid redirect storms
        setTimeout(() => {
          isHandling401 = false;
        }, 1000);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
