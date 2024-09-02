import { Comment } from "../Types/Comment";
import { client } from "./wait";

export const getMyComments = () => {
  return client.get<Comment[]>("/comments/mine");
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/user/${commentId}`);
};

export const addComment = (cafeId: number, comment: string, score: number) => {
  return client.post<Comment>(`/comments/${cafeId}`, { comment, score });
};

export const updateComment = (
  commentId: number,
  comment: string,
  score: number
) => {
  return client.put<Comment>(`/comments/${commentId}`, { comment, score });
};
