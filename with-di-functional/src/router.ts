import { Router } from "express";
import { usersController } from "./users/UsersController";
import { usersService } from "./users/UsersService";
import { commentsService } from "./comments/CommentsService";
import { usersClient } from "./users/UsersClient";
import { commentsClient } from "./comments/CommentsClient";
import { logger } from "./logger/logger";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const _usersController = usersController({
  usersClient,
  logger,
  commentsService,
  commentsClient,
  usersService,
  uuidv4,
});

router.route("/users").get(_usersController.list);
router.route("/users/:id").get(_usersController.getById);

export default router;
