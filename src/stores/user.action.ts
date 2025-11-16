// src/stores/user.action.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, getMeApi, setAuthToken } from '@/api/auth.api';
import { setUser, clearUser } from './user.store';
import apiClient from '@/api/auth.api';
import { message } from 'antd';

/**
 * loginAsync:
 * - call login endpoint
 * - persist token and set axios header
 * - use user info returned by login (if present) otherwise call /auth/me
 * - persist user id & username to localStorage
 * - update redux store
 */
export const loginAsync = createAsyncThunk(
  'user/login',
  async (payload: { phone: string; password: string }, { dispatch, rejectWithValue }) => {
    console.log('[checkAuth] starting, token=', localStorage.getItem('token'));

    try {
      const loginResp = await loginApi(payload);
      const access_token = loginResp.data?.access_token || loginResp.data?.token;
      if (!access_token) {
        return rejectWithValue('No access token in response');
      }

      // persist token and set default header
      localStorage.setItem('token', access_token);
      setAuthToken(access_token);

      // Try to reuse user data from login response if available
      let userInfo = loginResp.data?.user ?? loginResp.data?.profile ?? null;

      // if not present, fetch /auth/me
      if (!userInfo) {
        const meResp = await getMeApi();
        userInfo = meResp.data;
      }

      console.log('[checkAuth] success user=', userInfo);

      // persist useful metadata
      if (userInfo?.id) {
        localStorage.setItem('user_id', String(userInfo.id));
      }
      if (userInfo?.name) {
        localStorage.setItem('username', String(userInfo.name));
      }

      dispatch(
        setUser({
          token: access_token,
          userInfo,
          logged: true,
        }),
      );

      return { token: access_token, userInfo };
    } catch (err: any) {
      console.log('[checkAuth] failed', err);

      const errMsg = err?.response?.data?.detail || err.message || 'Login failed';
      message.error(errMsg);
      return rejectWithValue(errMsg);
    }
  },
);

/**
 * checkAuth:
 * - used on app boot to validate token and populate user store
 */
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(clearUser());
      return rejectWithValue('No token');
    }
    try {
      setAuthToken(token);
      const meResp = await getMeApi();

      const userInfo = meResp.data;

      // persist metadata
      if (userInfo?.id) localStorage.setItem('user_id', String(userInfo.id));
      if (userInfo?.name) localStorage.setItem('username', String(userInfo.name));

      dispatch(
        setUser({
          token,
          userInfo,
          logged: true,
        }),
      );
      return meResp.data;
    } catch (err: any) {
      dispatch(clearUser());
      // remove invalid token/header
      setAuthToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      return rejectWithValue('Token invalid');
    }
  },
);

/**
 * logout:
 * - clears user slice and auth headers
 * - clears auth-related localStorage keys
 * - redirects to /login
 */
export const logout = () => {
  return async (dispatch: any) => {
    dispatch(clearUser());
    setAuthToken(null);

    // remove only auth-related items to avoid wiping unrelated app state
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');

    // you can call backend logout endpoint if exists
    // then redirect
    window.location.href = '/login';
  };
};
