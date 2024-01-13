import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from '../../api/gamesApi';
import slice from './slice';

const store = configureStore({
  reducer: {
    state: slice,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
});

export default store;
