import { User } from "../Types/User";
import { client } from "./wait";

export const createUser = ({
  email,
  password,
  repeatPassword,
  firstName,
  lastName,
}: Omit<User, "id">) => {
  return client.post<User>("/auth/register", {
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
  });
};

export interface IRefreshTokenResponse {
  user: User;
  token: string;
}

export const loginUser = ({
  email,
  password,
}: Pick<User, "email" | "password">) => {
  return client.post<User>("/auth/login", {
    email,
    password,
  });
};

export const getNewToken = () => {
  return client.get<IRefreshTokenResponse>("/auth/refreshToken");
};
