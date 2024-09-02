import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cafe } from "../../Types/Cafe";
import { getCafes, getFilteredCafes } from "../../api/cafe";
/* eslint-disable no-param-reassign */

type CafesState = {
  cafes: Cafe[];
  loading: boolean;
  error: string;
};

const initialState: CafesState = {
  cafes: [],
  loading: false,
  error: "",
};

export const init = createAsyncThunk("cafes/get", () => {
  return getCafes();
});

export const initFiltered = createAsyncThunk(
  "filteredCafes/get",
  (url: string) => {
    return getFilteredCafes(url);
  }
);

const cafesSlice = createSlice({
  name: "cafes",
  initialState,
  reducers: {
    // setLoading(state) => {
    //   state
    // },
    add: (state, action: PayloadAction<Cafe>) => {
      state.cafes.push(action.payload);
    },
    remove: (state, action: PayloadAction<Cafe>) => {
      state.cafes = state.cafes.filter((cafe) => cafe.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.cafes = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });

    builder.addCase(initFiltered.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initFiltered.fulfilled, (state, action) => {
      state.cafes = action.payload;
      state.loading = false;
    });

    builder.addCase(initFiltered.rejected, (state) => {
      state.loading = false;
      state.error = "Filtering Error";
    });
  },
});

export default cafesSlice.reducer;
export const { add, remove } = cafesSlice.actions;
