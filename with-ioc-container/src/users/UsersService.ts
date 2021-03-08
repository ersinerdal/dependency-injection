import { User } from "./User";
import { CommentsService } from "../comments/CommentsService";
import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { Logger } from "winston";
import { AxiosInstance } from "axios";

@injectable()
export class UsersService {
  @inject(TYPES.LOGGER) private readonly logger: Logger;
  @inject(TYPES.USERS_CLIENT) private readonly usersClient: AxiosInstance;
  @inject(TYPES.COMMENTS_SERVICE)
  private readonly commentsService: CommentsService;

  async list() {
    try {
      const { data } = await this.usersClient.get("users");
      this.logger.info(`Users are fetched`);

      return data.map((user: User) => {
        const { id, name, username, email, phone } = user;
        return { id, name, username, email, phone };
      });
    } catch (e) {
      this.logger.error("Users couldn't be fetched");
    }
  }

  async getById(userId: string) {
    try {
      const {
        data: { id, name, username, email, phone },
      } = await this.usersClient.get(`users/${userId}`);

      const comments = await this.commentsService.listByUserId(userId);

      return { id, name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      this.logger.error(message);
      return message;
    }
  }
}
