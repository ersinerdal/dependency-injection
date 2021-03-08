import { client } from "./UsersClient";
import { logger } from "../logger/logger";
import { User } from "./User";
import * as commentsService from "../comments/CommentsService";

export const list = async () => {
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
};

export const getById = async (userId: string) => {
  try {
    const {
      data: { id, name, username, email, phone },
    } = await client.get(`users/${userId}`);
    const comments = await commentsService.listByUserId(userId);

    return { id, name, username, email, phone, comments };
  } catch (e) {
    const message = `User (${userId}) does not exist`;
    logger.error(message);
    return message;
  }
};
