import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { User, UserWithComments } from "./types/User";
import { Logger } from "../logger";
import { Client } from "./UsersClient";
import { CommentsService } from "../comments/CommentsService";

@injectable()
export class UsersService {
  @inject(TYPES.LOGGER) private readonly logger: Logger;
  @inject(TYPES.UUID) private readonly uuid: () => string;
  @inject(TYPES.USERS_CLIENT) private readonly usersClient: Client;
  @inject(TYPES.COMMENTS_SERVICE)
  private readonly commentsService: CommentsService;

  async list(): Promise<User[]> {
    try {
      const { data } = await this.usersClient.get("users");
      this.logger.info(`Users are fetched`);

      return data.map((user: User) => {
        const { id, name, username, email, phone } = user;
        return { id, name, username, email, phone };
      });
    } catch (e) {
      this.logger.error("Users couldn't be fetched");
      return [];
    }
  }

  async getById(userId: string): Promise<UserWithComments> {
    try {
      const {
        data: { name, username, email, phone },
      } = await this.usersClient.get(`users/${userId}`);

      const comments = await this.commentsService.listByUserId(
        userId
      );

      return { id:this.uuid(), name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      this.logger.error(message);
      return null;
    }
  }
}
