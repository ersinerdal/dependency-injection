import { interfaces } from "inversify";
import { TYPES } from "../constants";
import { User, UserWithComments } from "./types/User";
import { Comment } from "../comments/types/Comment";
import { Logger } from "../logger";
import { Client } from "./UsersClient";
import { CommentsService } from "../../../with-di-oop/src/comments/CommentsService";
import { UsersService } from "./types/UsersService";

export default ({ container }: interfaces.Context): UsersService => {
  const logger: Logger = container.get(TYPES.LOGGER);
  const client: Client = container.get(TYPES.USERS_CLIENT);
  const uuidv4: () => string = container.get(TYPES.UUID);
  const commentsService: CommentsService = container.get(TYPES.COMMENTS_SERVICE);

  const list = async (): Promise<User[]> => {
    try {
      const { data } = await client.get("users");
      logger.info(`Users are fetched`);

      return data.map((user: User) => {
        const { id, name, username, email, phone } = user;
        return { id, name, username, email, phone };
      });
    } catch (e) {
      logger.error("Users couldn't be fetched");
      return [];
    }
  };

  const getById = async (userId: string): Promise<UserWithComments> => {
    try {
      const {
        data: { name, username, email, phone },
      } = await client.get(`users/${userId}`);

      const comments: Comment[] = await commentsService.listByUserId(userId);

      return { id: uuidv4(), name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      logger.error(message);
      return {} as UserWithComments;
    }
  };

  return { list, getById };
};
