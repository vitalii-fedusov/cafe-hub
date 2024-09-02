/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cafe } from "../../Types/Cafe";
import {
  addToFavourites,
  deleteFromFavourites,
  getFavourites,
} from "../../api/cafe";

type FavouritesCafes = {
  favouritesCafes: Cafe[];
  loading: boolean;
  error: string;
};

const initialState: FavouritesCafes = {
  favouritesCafes: [],
  loading: false,
  error: "",
};

export const initFavourites = createAsyncThunk("cafe/initFavourites", () => {
  return getFavourites();
});

export const like = createAsyncThunk("cafe/like", (id: number) => {
  return addToFavourites(id);
});

export const dislike = createAsyncThunk("cafe/dislike", (id: number) => {
  return deleteFromFavourites(id);
});

const favouritesCafesSlice = createSlice({
  name: "favouritesCafes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initFavourites.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initFavourites.fulfilled, (state, action) => {
      state.favouritesCafes = action.payload;
      state.loading = false;
    });

    builder.addCase(initFavourites.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });

    builder.addCase(like.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(like.fulfilled, (state, action) => {
      // eslint-disable-next-line
      // @ts-ignore
      state.favouritesCafes = action.payload;
      state.loading = false;
    });

    builder.addCase(like.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });

    builder.addCase(dislike.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(dislike.fulfilled, (state, action) => {
      // eslint-disable-next-line
      // @ts-ignore
      state.favouritesCafes = action.payload;
      state.loading = false;
    });

    builder.addCase(dislike.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  },
});

export default favouritesCafesSlice.reducer;
