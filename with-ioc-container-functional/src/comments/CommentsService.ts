import { Comment } from "./types/Comment";
import {interfaces} from "inversify";
import {TYPES} from "../constants";
import {Logger} from "../logger";
import {CommentsService} from "./types/CommentsService";
import {Client} from "./CommentsClient";

export default ({ container }: interfaces.Context): CommentsService => {

  const client:Client = container.get(TYPES.COMMENTS_CLIENT)
  const logger: Logger = container.get(TYPES.LOGGER);

  const listByUserId = async (userId: string): Promise<Comment[]> => {
    try {
      const {data} = await client.get("comments", {
        params: {postId: userId},
      });
      return data as Comment[];
    } catch (e) {
      logger.error("Comments couldn't be fetched xxx");
      return [];
    }
  };

  return {listByUserId}
}
