import { Router } from "express";
import { UsersController } from "./users/UsersController";
import { UsersService } from "./users/UsersService";
import { CommentsService } from "./comments/CommentsService";
import { client as usersClient } from "./users/UsersClient";
import { client as commentsClient } from "./comments/CommentsClient";
import { logger } from "./logger/logger";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const commentsService = new CommentsService({
  client: commentsClient,
  logger,
});
const usersService = new UsersService({
  commentsService,
  client: usersClient,
  logger,
  uuid:uuidv4,
});
const usersController = new UsersController({ usersService });

router.route("/users").get(usersController.list);
router.route("/users/:id").get(usersController.getById);

export default router;
