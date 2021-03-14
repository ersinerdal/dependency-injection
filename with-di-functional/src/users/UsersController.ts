import { Request, Response } from "express";
import { UsersControllerDependencies, User } from "./types";

export const usersController = ({
  logger,
  commentsService,
  commentsClient,
  usersService,
  usersClient,
}: UsersControllerDependencies) => {
  const service = usersService({
    usersClient,
    logger,
    commentsService,
    commentsClient,
  });

  const list = async (req: Request, res: Response) => {
    const users: User[] = await service.list();
    res.json(users);
  };

  const getById = async (req: Request, res: Response) => {
    const user = await service.getById(req.params.id);
    res.json(user);
  };

  return { list, getById };
};