import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { Logger } from "winston";
import { AxiosInstance } from "axios";

@injectable()
export class CommentsService {
  @inject(TYPES.LOGGER) private logger: Logger;
  @inject(TYPES.COMMENTS_CLIENT) private commentsClient: AxiosInstance;

  async listByUserId(userId: string) {
    try {
      const { data } = await this.commentsClient.get("comments", {
        params: { postId: userId },
      });
      return data;
    } catch (e) {
      this.logger.error("Comments couldn't be fetched");
      return [];
    }
  }
}
