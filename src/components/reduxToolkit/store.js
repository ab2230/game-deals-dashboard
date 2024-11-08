import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from './features/apiSlice';

export const store = configureStore({
  reducer: {
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
});
