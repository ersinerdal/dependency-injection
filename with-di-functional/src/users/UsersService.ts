import { UsersServiceDependencies, User, UsersService } from "./types";
import { UserWithComments } from "./types/User";

export const usersService = ({
  commentsService,
  usersClient,
  logger,
  uuidv4,
}: UsersServiceDependencies): UsersService => {
  const list = async () => {
    try {
      const { data } = await usersClient.get("users");
      logger.info(`Users are fetched`);

      return data.map((user: User) => {
        const { id, name, username, email, phone } = user;
        return { id, name, username, email, phone };
      });
    } catch (e) {
      logger.error("Users couldn't be fetched");
    }
  };

  const getById = async (userId: string) => {
    try {
      const {
        data: { name, username, email, phone },
      } = await usersClient.get(`users/${userId}`);

      const comments = await commentsService.listByUserId(userId);

      return { id: uuidv4(), name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      logger.error(message);
      return {} as UserWithComments;
    }
  };

  return { list, getById };
};
