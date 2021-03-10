import { client } from "./CommentsClient";
import { logger } from "../logger/logger";
import { Comment } from "./Comment";

export const listByUserId = async (userId: string): Promise<Comment[]> => {
  try {
    const { data } = await client.get("comments", {
      params: { postId: userId },
    });
    return data as Comment[];
  } catch (e) {
    logger.error("Comments couldn't be fetched");
    return [];
  }
};
