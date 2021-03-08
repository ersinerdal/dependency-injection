import { Request, Response } from "express";
import { UsersService } from "./UsersService";

export class UsersController {
  private usersService: UsersService;

  constructor({ usersService }: { usersService: UsersService }) {
    this.usersService = usersService;
    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
  }

  async list(req: Request, res: Response) {
    const users = await this.usersService.list();
    res.json(users);
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const user = await this.usersService.getById(req.params.id);
    res.json(user);
  }
}
