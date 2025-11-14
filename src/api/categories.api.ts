// src/api/category.api.ts
import { apiClient } from './auth.api'; // reuse axios instance

export const getCategoriesApi = (token: string) => {
  return apiClient.get('/categories/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
