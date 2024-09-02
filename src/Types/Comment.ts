import { User } from "./User";

export type Comment = {
  cafeId: number;
  cafeName: string;
  comment: string;
  id: number;
  score: number;
  time: string;
  urlOfImage: string;
  user: User;
};
