// src/api/auth.api.ts
import axios from 'axios';

/**
 * DEV: keep baseURL as '/api' so Vite dev proxy picks it and rewrites to /api/v1 on the backend.
 * PROD: you can override VITE_API_BASE in production env to point to the real backend host.
 */
const apiClient = axios.create({
  // baseURL: import.meta.env.PROD ? ((import.meta.env.VITE_API_BASE as string) || '/api') : '/api',
  baseURL: import.meta.env.VITE_API_BASE as string || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// helper to set token at runtime
export const setAuthToken = (token?: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

console.log('[apiClient] baseURL=', apiClient.defaults.baseURL);
apiClient.interceptors.request.use(cfg => {
  console.log('[api request] url=', cfg.url, 'headers=', cfg.headers);
  return cfg;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // central place to handle 401 if needed
    const status = error?.response?.status;
    if (status === 401) {
      // caller can also handle 401, but you could emit global event or redirect here
    }
    return Promise.reject(error);
  },
);

/** Auth endpoints — note these are relative to baseURL '/api' in dev */
export const loginApi = (data: { phone: string; password: string }) =>
  apiClient.post('/auth/login', data);

export const getMeApi = () => apiClient.get('/auth/me');

export const changePasswordApi = (payload: { old_password: string; new_password: string }) =>
  apiClient.post('/auth/change-password', payload);

export const resetPasswordApi = (payload: any) =>
  apiClient.post('/auth/reset-password', payload);

export const sendLoginOtpApi = (payload: { phone: string }) =>
  apiClient.post('/auth/login/send-otp', payload);

export const verifyLoginOtpApi = (payload: any) =>
  apiClient.post('/auth/login/verify-otp', payload);

export const resendLoginOtpApi = (payload: { phone: string }) =>
  apiClient.post('/auth/login/resend-otp', payload);

export const sendSignupOtpApi = (payload: { phone: string }) =>
  apiClient.post('/auth/signup/send-otp', payload);

export const verifySignupOtpApi = (payload: any) =>
  apiClient.post('/auth/signup/verify-otp', payload);

export default apiClient;
