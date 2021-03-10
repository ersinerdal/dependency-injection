import { Request, Response } from "express";
import * as usersService from "./UsersService";
import { User } from "./User";

export const list = async (req: Request, res: Response) => {
  const users: User[] = await usersService.list();
  res.json(users);
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  const user = await usersService.getById(req.params.id);
  res.json(user);
};
