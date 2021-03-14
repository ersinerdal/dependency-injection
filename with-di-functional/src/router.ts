import { Router } from "express";
import { usersController } from "./users/UsersController";
import { usersService } from "./users/UsersService";
import { commentsService } from "./comments/CommentsService";
import { usersClient } from "./users/UsersClient";
import { commentsClient } from "./comments/CommentsClient";
import { logger } from "./logger/logger";

const router = Router();

const _usersController = usersController({
  usersClient,
  logger,
  commentsService,
  commentsClient,
  usersService,
});

router.route("/users").get(_usersController.list);
router.route("/users/:id").get(_usersController.getById);

export default router;
