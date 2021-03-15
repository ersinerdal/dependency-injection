import { Comment } from "./Comment";

export interface CommentsService {
  listByUserId: (userId: string) => Promise<Comment[]>;
}
