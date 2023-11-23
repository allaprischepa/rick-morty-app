import { createSlice } from '@reduxjs/toolkit';

interface LoadingDetailsState {
  value: boolean;
}

const initialState: LoadingDetailsState = {
  value: false,
};

export const loadingDetailsSlice = createSlice({
  name: 'loadingDetails',
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

export const { turnOn, turnOff } = loadingDetailsSlice.actions;

export const loadingDetailsReducer = loadingDetailsSlice.reducer;
