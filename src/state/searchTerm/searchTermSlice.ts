import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SEARCH_TERM_NAME = 'RMAppSearchTerm';

interface SearchTermState {
  value: string;
}

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: (): SearchTermState => {
    let value = '';

    if (typeof window !== 'undefined')
      value = localStorage.getItem(SEARCH_TERM_NAME) ?? '';

    return { value };
  },
  reducers: {
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      if (typeof window !== 'undefined')
        localStorage.setItem(SEARCH_TERM_NAME, action.payload);
    },
  },
});

export const { updateSearchTerm } = searchTermSlice.actions;

export const searchTermReducer = searchTermSlice.reducer;
