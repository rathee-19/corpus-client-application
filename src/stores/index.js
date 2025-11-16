import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
const store = configureStore({
    reducer: rootReducer,
});
console.log('[STORE INIT] initial state:', store.getState());
export default store;
