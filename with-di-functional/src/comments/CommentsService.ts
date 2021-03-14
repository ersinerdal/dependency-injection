import {CommentsServiceDependencies} from "./types";

export const commentsService = ({ commentsClient, logger }: CommentsServiceDependencies) => {
  const listByUserId = async (userId: string) => {
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
  return { listByUserId };
};
