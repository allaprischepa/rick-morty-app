import { createSlice } from '@reduxjs/toolkit';

export const VIEW_MODE_GRID = 'grid';
export const VIEW_MODE_LIST = 'list';

interface ViewModeState {
  value: typeof VIEW_MODE_GRID | typeof VIEW_MODE_LIST;
}

const initialState: ViewModeState = {
  value: VIEW_MODE_GRID,
};

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setGrid: (state) => {
      state.value = VIEW_MODE_GRID;
    },
    setList: (state) => {
      state.value = VIEW_MODE_LIST;
    },
  },
});

export const { setGrid, setList } = viewModeSlice.actions;

export const viewModeSliceReducer = viewModeSlice.reducer;
