// src/api/category.api.ts
import apiClient  from './auth.api'; // reuse axios instance

export const getCategoriesApi = () => {
  return apiClient.get('/categories/');
};
