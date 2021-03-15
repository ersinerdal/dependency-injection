import { Request, Response } from "express";
import { User, UsersService } from "./types";

export const usersController = (usersService: UsersService) => {
  const list = async (req: Request, res: Response) => {
    const users: User[] = await usersService.list();
    res.json(users);
  };

  const getById = async (req: Request, res: Response) => {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  };

  return { list, getById };
};
