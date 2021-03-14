import {Request, Response} from "express";

export interface UsersController {
  list: (req: Request, res: Response) => void;
  getById: (req: Request<{ id: string }>, res: Response) => void;
}
