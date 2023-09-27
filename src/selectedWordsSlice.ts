import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoredWord } from "./types";

interface SelectedWordsState {
  selectedWords: StoredWord[];
}

const initialState: SelectedWordsState = {
  selectedWords: [],
};

const selectedWordsSlice = createSlice({
  name: "selectedWords",
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<StoredWord>) => {
      state.selectedWords.push(action.payload);
    },
    removeWord: (state, action: PayloadAction<string>) => {
      state.selectedWords = state.selectedWords.filter(
        (word) => word._id !== action.payload
      );
    },
  },
});

export const { addWord, removeWord } = selectedWordsSlice.actions;
export default selectedWordsSlice.reducer;
