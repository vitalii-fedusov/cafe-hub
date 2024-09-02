/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cafe } from '../../Types/Cafe';
import { getCafe } from '../../api/cafe';

type SelectedCafe = {
  selectedCafe: Cafe | null;
  loading: boolean;
  error: string;
};

const initialState: SelectedCafe = {
  selectedCafe: null,
  loading: false,
  error: "",
};

export const getSelectedCafe = createAsyncThunk("cafe/get", (id: number) => {
  return getCafe(id);
});

const selectedCafeSlice = createSlice({
  name: 'selectedCafe',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getSelectedCafe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSelectedCafe.fulfilled, (state, action) => {
      state.selectedCafe = action.payload;
      state.loading = false;
    });

    builder.addCase(getSelectedCafe.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  },
});

export default selectedCafeSlice.reducer;
