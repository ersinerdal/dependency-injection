import { Router } from "express";
import { UsersController } from "./users/UsersController";
import { UsersService } from "./users/UsersService";
import { CommentsService } from "./comments/CommentsService";
import { client as usersClient } from "./users/UsersClient";
import { client as commentsClient } from "./comments/CommentsClient";
import { logger } from "./logger/logger";

const router = Router();
const commentsService = new CommentsService({
  client: commentsClient,
  logger,
});
const usersService = new UsersService({
  commentsService,
  client: usersClient,
  logger,
});
const usersController = new UsersController({ usersService });

router.route("/users").get(usersController.list);
router.route("/users/:id").get(usersController.getById);

export default router;
