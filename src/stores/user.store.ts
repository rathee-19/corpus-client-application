// src/stores/user.store.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

/**
 * Keep this state shape consistent with UI expectations.
 * Many components expect fields like menuList, device, collapsed, newUser, etc.
 */
export interface UserState {
  username?: string;
  menuList: any[]; // simplified type; UI expects an array of menu items
  token: string | null;
  userInfo: Record<string, any> | null;
  logged: boolean;
  role?: string;
  device: 'DESKTOP' | 'MOBILE';
  collapsed: boolean;
  noticeCount: number;
  locale: string;
  newUser: boolean;
}

/** initial state tuned to what the layout/tags view expects */
const initialState: UserState = {
  username: undefined,
  menuList: [],
  token: localStorage.getItem('token') || null,
  userInfo: null,
  logged: !!localStorage.getItem('token'),
  role: 'guest',
  device: 'DESKTOP',
  collapsed: false,
  noticeCount: 0,
  locale: (localStorage.getItem('locale') as string) || 'en_US',
  newUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * setUser accepts a Partial<UserState> and merges into state.
     * This is the primary setter used across the app.
     */
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
      // persist token if provided explicitly
      if (Object.prototype.hasOwnProperty.call(action.payload, 'token')) {
        if (action.payload.token) localStorage.setItem('token', action.payload.token);
        else localStorage.removeItem('token');
      }
    },

    /**
     * setUserItem is an alias many components used previously.
     * Keep it to avoid rename breakages.
     */
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
      if (Object.prototype.hasOwnProperty.call(action.payload, 'token')) {
        if (action.payload.token) localStorage.setItem('token', action.payload.token);
        else localStorage.removeItem('token');
      }
    },

    clearUser(state) {
      state.token = null;
      state.userInfo = null;
      state.logged = false;
      state.menuList = [];
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, clearUser, setUserItem } = userSlice.actions;
export default userSlice.reducer;
