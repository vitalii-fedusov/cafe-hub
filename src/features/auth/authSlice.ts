import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Types/User";
import { createUser, getNewToken, loginUser } from "../../api/user";

type CafesState = {
  user: User | null;
  loading: boolean;
  error: string;
};

const storedUser = localStorage.getItem('user');

const initialState: CafesState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: "",
};

export const register = createAsyncThunk(
  "auth/register",
  ({
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
  }: Omit<User, "id">) => {
    return createUser({ email, password, repeatPassword, firstName, lastName });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  ({ email, password }: Pick<User, "email" | "password">) => {
    return loginUser({email, password});
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken", () => {
    return getNewToken();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    exit: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });

    builder.addCase(register.rejected, (state) => {
      state.loading = false;
      state.error = "Error, can not sigh up user";
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.token || '');
    });

    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = "Error, can not login user";
    });

    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    });

    builder.addCase(refreshToken.rejected, (state) => {
      state.loading = false;
      state.error = "Error, can not refresh token";
    });
  },
});

export default authSlice.reducer;
export const { exit } = authSlice.actions;
