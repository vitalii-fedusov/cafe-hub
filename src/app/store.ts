import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import cafesReducer from "../features/cafes/cafesSlice";
import selectedCafeReducer from "../features/SelectedCafe/selectedCafeSlice";
import authReducer from "../features/auth/authSlice";
// eslint-disable-next-line
import favouritesReducer from "../features/favouritesCafes/favouritesCafesSlice";
import commentsReducer from "../features/comments/commentsSlice";
import imageReducer from "../features/image/imageSlice";

export const store = configureStore({
  reducer: {
    cafes: cafesReducer,
    selectedCafe: selectedCafeReducer,
    // sortOrder: sortOrderReducer,
    auth: authReducer,
    favourites: favouritesReducer,
    comments: commentsReducer,
    image: imageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
