import { Request, Response } from "express";
import { Router } from "express";
import * as usersService from "./users/UsersService";
import * as commentsService from "./comments/CommentsService";
import { usersClient } from "./users/UsersClient";
import { commentsClient } from "./comments/CommentsClient";
import { logger } from "./logger/logger";

const router = Router();

router.route("/users").get(async (req: Request, res: Response) => {
  const users = await usersService.list()({ usersClient, logger });
  res.json(users);
});

router
  .route("/users/:id")
  .get(async (req: Request<{ id: string }>, res: Response) => {
    const user = await usersService.getById(req.params.id)({
      usersClient,
      logger,
      commentsService,
    })({ client: commentsClient, logger });
    res.json(user);
  });

export default router;
