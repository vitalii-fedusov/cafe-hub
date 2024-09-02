import { User } from "../Types/User";
import { client } from "./wait";

export const uploadImage = (imageFile: File) => {
  return client.post<User>("/users/profilePicture", {imageFile});
};
