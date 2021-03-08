import { client } from "./UsersClient";
import { logger } from "../logger/logger";
import { User } from "./User";
import { CommentsService } from "../comments/CommentsService";

export class UsersService {
  private commentsService: CommentsService;

  constructor() {
    this.commentsService = new CommentsService();
  }

  async list() {
    try {
      const { data } = await client.get("users");
      logger.info(`Users are fetched`);

      return data.map((user: User) => {
        const { id, name, username, email, phone } = user;
        return { id, name, username, email, phone };
      });
    } catch (e) {
      logger.error("Users couldn't be fetched");
    }
  }

  async getById(userId: string) {
    try {
      const {
        data: { id, name, username, email, phone },
      } = await client.get(`users/${userId}`);
      const comments = await this.commentsService.listByUserId(userId);

      return { id, name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      logger.error(message);
      return message;
    }
  }
}
