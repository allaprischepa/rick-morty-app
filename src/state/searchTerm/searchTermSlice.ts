import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SEARCH_TERM_NAME = 'RMAppSearchTerm';

interface SearchTermState {
  value: string;
}

const initialState: SearchTermState = {
  value: localStorage.getItem(SEARCH_TERM_NAME) || '',
};

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem(SEARCH_TERM_NAME, action.payload);
    },
  },
});

export const { updateSearchTerm } = searchTermSlice.actions;

export const searchTermReducer = searchTermSlice.reducer;
