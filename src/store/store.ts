import { configureStore } from "@reduxjs/toolkit";
import allWordsSlice from "./slices/allWordsSlice";
import { wordsApi } from "./services/WordsService";

export const store = configureStore({
  reducer: {
    allWords: allWordsSlice,
    [wordsApi.reducerPath]: wordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
