import { createSlice } from '@reduxjs/toolkit';

interface LoadingListState {
  value: boolean;
}

const initialState: LoadingListState = {
  value: false,
};

export const loadingListSlice = createSlice({
  name: 'loadingList',
  initialState,
  reducers: {
    turnOn: (state) => {
      state.value = true;
    },
    turnOff: (state) => {
      state.value = false;
    },
  },
});

export const { turnOn, turnOff } = loadingListSlice.actions;

export const loadingListReducer = loadingListSlice.reducer;
