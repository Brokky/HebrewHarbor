import { configureStore } from "@reduxjs/toolkit";
import selectedWordsReducer from './selectedWordsSlice';

export const store = configureStore({
    reducer: {
      selectedWords: selectedWordsReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
