import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoredWord } from "../../types";

interface AllWordsState {
  allWords: StoredWord[];
}

interface EditPayload {
  updatedWord: StoredWord;
  wordId: string;
}

const initialState: AllWordsState = {
  allWords: [],
};

const allWordsSlice = createSlice({
  name: "allWords",
  initialState,

  reducers: {
    addWord: (state, action: PayloadAction<StoredWord>) => {
      state.allWords.push(action.payload);
    },
    editWord: (state, action: PayloadAction<EditPayload>) => {
      const { updatedWord, wordId } = action.payload;
      const index = state.allWords.findIndex((word) => word._id === wordId);
      if (index !== -1) {
        state.allWords[index] = updatedWord;
      }
    },
    removeWord: (state, action: PayloadAction<string>) => {
      const index = state.allWords.findIndex(
        (word) => word._id === action.payload
      );
      state.allWords.splice(index, 1);
    },
    toggleWordSelection: (state, action: PayloadAction<string>) => {
      const index = state.allWords.findIndex(
        (word) => word._id === action.payload
      );
      if (index !== -1) {
        state.allWords[index].selected = !state.allWords[index].selected;
      }
    },
    setWords: (state, action: PayloadAction<StoredWord[]>) => {
      state.allWords = action.payload;
    },
  },
});

export const { addWord, editWord, removeWord, toggleWordSelection, setWords } =
  allWordsSlice.actions;
export default allWordsSlice.reducer;
