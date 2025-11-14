import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';
// typed wrapper async thunk function demo, no extra feature, just for powerful typings
// src/stores/user.action.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMeApi, loginApi } from '@/api/auth.api';
// import type { LoginParams } from '@/interface/user/login';
// import { setUserItem } from './user.slice'; // Assuming you have a user slice
import { message } from 'antd';

export const loginAsync = createAsyncThunk(
  'user/login',
  async (payload: LoginParams, { dispatch, rejectWithValue }) => {
    try {
      // 1. Call the login API
      const loginResponse = await loginApi(payload);
      console.log('Login Response:', loginResponse);
      const { access_token } = loginResponse.data;

      if (!access_token) {
        // Use rejectWithValue to send a specific error payload on failure
        return rejectWithValue('Login failed: No access token received.');
      }

      // 2. Store the token in localStorage
      localStorage.setItem('token', access_token);

      // 3. Get user info
      const meResponse = await getMeApi(access_token);
      const userInfo = meResponse.data;

      // 4. Dispatch user info to the store
      dispatch(
        setUserItem({
          userInfo,
          token: access_token,
        }),
      );

      // On success, the thunk will be 'fulfilled' with this return value
      return { userInfo, token: access_token };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      // On error, the thunk will be 'rejected' with this error message
      return rejectWithValue(errorMessage);
    }
  },
);
export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const { status } = await apiLogout({ token: localStorage.getItem('t')! });

    if (status) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    }

    return false;
  };
};