import { Comment } from "../../comments/types";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserWithComments extends User {
  comments: Comment[];
}
