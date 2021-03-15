import { Request, Response } from "express";
import { interfaces } from "inversify";
import { User, UsersController, UsersService } from "./types";
import { TYPES } from "../constants";

export default ({ container }: interfaces.Context):UsersController => {
  const usersService: UsersService = container.get(TYPES.USERS_SERVICE);

  const list = async (req: Request, res: Response) => {
    const users: User[] = await usersService.list();
    res.json(users);
  };

  const getById = async (req: Request<{ id: string }>, res: Response) => {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  };

  return { list, getById };
};
