import { AxiosInstance } from "axios";
import { Logger } from "winston";

export interface CommentsDependencies {
  commentsClient: AxiosInstance;
  logger: Pick<Logger, "error">;
}

export const listByUserId = (userId: string) => {
  return async ({ commentsClient, logger }: CommentsDependencies) => {
    try {
      const { data } = await commentsClient.get("comments", {
        params: { postId: userId },
      });
      return data;
    } catch (e) {
      logger.error("Comments couldn't be fetched ccc");
      return [];
    }
  };
};
