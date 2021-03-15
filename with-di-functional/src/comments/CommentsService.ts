import { CommentsServiceDependencies, CommentsService } from "./types";

export const commentsService = ({
  commentsClient,
  logger,
}: CommentsServiceDependencies): CommentsService => {
  const listByUserId = async (userId: string) => {
    try {
      const { data } = await commentsClient.get("comments", {
        params: { postId: userId },
      });
      return data;
    } catch (e) {
      logger.error("Comments couldn't be fetched");
      return [];
    }
  };
  return { listByUserId };
};
