import { User } from "./User";
import { UserDependencies, UsersDependencies } from "./types";

export const list = () => {
  return async ({ usersClient, logger }: UsersDependencies) => {
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
};

export const getById = (userId: string) => {
  return ({ usersClient, logger, commentsService }: UserDependencies) => {
    return async (commentsClient) => {
      try {
        const {
          data: { id, name, username, email, phone },
        } = await usersClient.get(`users/${userId}`);

        const comments = await commentsService.listByUserId(userId)({
          commentsClient,
          logger,
        });

        return { id, name, username, email, phone, comments };
      } catch (e) {
        const message = `User (${userId}) does not exist`;
        logger.error(message);
        return message;
      }
    };
  };
};
