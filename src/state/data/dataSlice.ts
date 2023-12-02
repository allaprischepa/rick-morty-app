import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormDataToSave } from '../../utils/types';

interface DataState {
  value: {
    lastViewedIndex: number;
    results: FormDataToSave[];
  };
}

const initialState: DataState = {
  value: {
    lastViewedIndex: -1,
    results: [],
  },
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<FormDataToSave>) => {
      state.value.results.push(action.payload);
    },
    setLastViewed: (state, action: PayloadAction<number>) => {
      state.value.lastViewedIndex = action.payload;
    },
  },
});

export const { add, setLastViewed } = dataSlice.actions;
