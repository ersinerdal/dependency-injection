import { User, UserWithComments } from "./User";
import { CommentsService } from "../comments/CommentsService";
import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { Logger } from "winston";
import { AxiosInstance } from "axios";
import { Comment } from "../../../without-di-functional/src/comments/Comment";

@injectable()
export class UsersService {
  @inject(TYPES.LOGGER) private readonly logger: Logger;
  @inject(TYPES.UUID) private readonly uuid: () => string;
  @inject(TYPES.USERS_CLIENT) private readonly usersClient: AxiosInstance;
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

      const comments: Comment[] = await this.commentsService.listByUserId(
        userId
      );

      return { id:this.uuid(), name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      this.logger.error(message);
      return {} as UserWithComments;
    }
  }
}
