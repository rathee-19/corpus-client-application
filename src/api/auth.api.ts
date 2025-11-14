// src/services/auth.api.ts
import type { LoginParams } from '@/interface/user/login';
import axios from 'axios';

// Create an axios instance with the base URL
export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @description Login API call
 * @param data - The login credentials (username, password)
 * @returns A promise with the login response, typically containing an access_token.
 */
export const loginApi = (data: LoginParams) => {
  // The API expects the data in a 'form-data' format for login.
  // We'll use URLSearchParams to create this format.
  const formData = new URLSearchParams();
  formData.append('phone', data.phone);
  formData.append('password', data.password);
  return apiClient.post('/auth/login', {
    phone: data.phone,
    password: data.password,
  });
};

/**
 * @description Get current user data API call
 * @param token - The user's access tokenf
 * @returns A promise with the user's information.
 */
export const getMeApi = (token: string) => {
  return apiClient.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// You can add other API functions here as needed
// e.g., sendSignupOtpApi, verifySignupOtpApi, etc.