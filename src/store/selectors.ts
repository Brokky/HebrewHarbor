import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const getWords = (state: RootState) => state.allWords.allWords;

export const getSelectedWords = createSelector([getWords], (words) =>
  words.filter((word) => word.selected)
);
