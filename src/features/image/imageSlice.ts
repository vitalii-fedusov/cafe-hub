import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "../../api/image";
/* eslint-disable no-param-reassign */

type ProfileImage = {
  imageUrl: string | null;
  loading: boolean;
  error: string;
};

const initialState: ProfileImage = {
  imageUrl: localStorage.getItem("selectedImageUrl"),
  loading: false,
  error: "",
};

export const uploadProfileImage = createAsyncThunk(
  "user/login",
  // eslint-disable-next-line
  (imageFile: any) => {
    return uploadImage(imageFile);
  }
);

export const authSlice = createSlice({
  name: "profileImage",
  initialState,
  reducers: {
    // exit: (state) => {
    //   state.user = null;
    //   localStorage.removeItem('user');
    //   localStorage.removeItem('token');
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadProfileImage.pending, (state) => {
      state.loading = true;
    });

    // builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
    //   state.imageUrl = action.payload.profilePictureUrls[0].profilePictureUrl;
    //   state.loading = false;
    //   localStorage.setItem(
    //     "selectedImageUrl",
    //     JSON.stringify(action.payload.profilePictureUrls[0].)
    //   );
    // });

    builder.addCase(uploadProfileImage.rejected, (state) => {
      state.loading = false;
      state.error = "Error, can not upload image";
    });
  },
});

export default authSlice.reducer;
// export const { exit } = authSlice.actions;
