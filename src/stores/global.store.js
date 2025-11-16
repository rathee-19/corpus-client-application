import { createSlice } from '@reduxjs/toolkit';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const userTheme = localStorage.getItem('theme');
const initialState = {
    theme: userTheme || systemTheme,
    loading: false,
};
const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setGlobalState(state, action) {
            Object.assign(state, action.payload);
            console.log('[global.store] initial global state', initialState);
            if (action.payload.theme) {
                const body = document.body;
                if (action.payload.theme === 'dark') {
                    if (!body.hasAttribute('theme-mode')) {
                        body.setAttribute('theme-mode', 'dark');
                    }
                }
                else {
                    if (body.hasAttribute('theme-mode')) {
                        body.removeAttribute('theme-mode');
                    }
                }
            }
        },
    },
});
export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
