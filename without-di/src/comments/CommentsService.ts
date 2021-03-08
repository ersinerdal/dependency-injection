import { client } from "./CommentsClient";
import { logger } from "../logger/logger";

export const listByUserId = async (userId: string) => {
  try {
    const { data } = await client.get("comments", {
      params: { postId: userId },
    });
    return data;
  } catch (e) {
    logger.error("Comments couldn't be fetched");
    return [];
  }
};
