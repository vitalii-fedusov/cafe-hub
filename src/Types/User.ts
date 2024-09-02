export type User = {
  id: number;
  email: string;
  password?: string;
  repeatPassword?: string;
  firstName: string;
  lastName: string;
  verified?: boolean;
  name?: string;
  token?: string;
};
