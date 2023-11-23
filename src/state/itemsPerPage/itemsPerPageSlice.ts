import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API_ITEMS_PER_PAGE } from '../../services/api/settings';

interface ItemsPerPageState {
  value: number;
}

const initialState: ItemsPerPageState = {
  value: API_ITEMS_PER_PAGE,
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    updateItemsPerPage: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateItemsPerPage } = itemsPerPageSlice.actions;

export const itemsPerPageReducer = itemsPerPageSlice.reducer;
