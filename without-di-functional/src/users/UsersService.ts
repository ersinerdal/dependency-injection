import { client } from "./UsersClient";
import { logger } from "../logger/logger";
import { User, UserWithComments } from "./User";
import { Comment } from "../comments/Comment";
import * as commentsService from "../comments/CommentsService";
import { v4 as uuidv4 } from "uuid";

export const list = async (): Promise<User[]> => {
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

export const getById = async (userId: string): Promise<UserWithComments> => {
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
