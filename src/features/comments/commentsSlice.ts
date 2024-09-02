/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../Types/Comment";
import {
  addComment,
  deleteComment,
  getMyComments,
  updateComment,
} from "../../api/comments";

type MyComments = {
  myComments: Comment[];
  allComments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: MyComments = {
  myComments: [],
  allComments: [],
  loading: false,
  error: "",
};

export const initMyComments = createAsyncThunk(
  "comments/initMyComments",
  () => {
    return getMyComments();
  }
);

export const deleteMyComment = createAsyncThunk(
  "comments/deleteComment",
  (commentId: number) => {
    return deleteComment(commentId);
  }
);

export const createComment = createAsyncThunk(
  "comments/addComment",
  ({
    cafeId,
    comment,
    score,
  }: {
    cafeId: number;
    comment: string;
    score: number;
  }) => {
    return addComment(cafeId, comment, score);
  }
);

export const changeComment = createAsyncThunk(
  "comments/changeComment",
  ({
    commentId,
    comment,
    score,
  }: {
    commentId: number;
    comment: string;
    score: number;
  }) => {
    return updateComment(commentId, comment, score);
  }
);

const commentsSlice = createSlice({
  name: "myComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initMyComments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initMyComments.fulfilled, (state, action) => {
      state.myComments = action.payload;
      state.loading = false;
    });

    builder.addCase(initMyComments.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });

    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.myComments = [action.payload, ...state.myComments];
    });

    builder.addCase(createComment.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });

    builder.addCase(changeComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(changeComment.fulfilled, (state, action) => {
      state.loading = false;
      state.myComments = state.myComments.map((comment) =>
        comment.id === action.payload.id ? action.payload : comment
      );
    });

    builder.addCase(changeComment.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteMyComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteMyComment.fulfilled, (state, action) => {
      state.loading = false;
      const deletedCommentId = action.meta.arg;

      state.myComments = state.myComments.filter(
        (comment) => comment.id !== deletedCommentId
      );
    });

    builder.addCase(deleteMyComment.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  },
});

export default commentsSlice.reducer;
