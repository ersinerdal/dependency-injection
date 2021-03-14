import { User, UserWithComments } from "./User";

export interface UsersService {
  list: () => Promise<User[]>;
  getById: (userId: string) => Promise<UserWithComments>;
}
