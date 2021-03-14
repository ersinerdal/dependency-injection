import { Request, Response } from "express";
import { interfaces } from "inversify";
import { User } from "./types/User";
import { TYPES } from "../constants";
import { UsersService } from "./types/UsersService";
import {UsersController} from "./types/UsersController";

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
