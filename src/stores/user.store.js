import { createSlice } from '@reduxjs/toolkit';
/** initial state tuned to what the layout/tags view expects */
const initialState = {
    username: undefined,
    menuList: [],
    token: localStorage.getItem('token') || null,
    userInfo: null,
    logged: !!localStorage.getItem('token'),
    role: 'guest',
    device: 'DESKTOP',
    collapsed: false,
    noticeCount: 0,
    locale: localStorage.getItem('locale') || 'en_US',
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
        setUser(state, action) {
            Object.assign(state, action.payload);
            // persist token if provided explicitly
            if (Object.prototype.hasOwnProperty.call(action.payload, 'token')) {
                if (action.payload.token)
                    localStorage.setItem('token', action.payload.token);
                else
                    localStorage.removeItem('token');
            }
        },
        /**
         * setUserItem is an alias many components used previously.
         * Keep it to avoid rename breakages.
         */
        setUserItem(state, action) {
            Object.assign(state, action.payload);
            if (Object.prototype.hasOwnProperty.call(action.payload, 'token')) {
                if (action.payload.token)
                    localStorage.setItem('token', action.payload.token);
                else
                    localStorage.removeItem('token');
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
