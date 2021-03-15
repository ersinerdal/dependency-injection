import { Router } from "express";
import { usersController as _usersController } from "./users/UsersController";
import { usersService as _usersService } from "./users/UsersService";
import { commentsService as _commentsService } from "./comments/CommentsService";
import { usersClient } from "./users/UsersClient";
import { commentsClient } from "./comments/CommentsClient";
import { logger } from "./logger/logger";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const commentsService = _commentsService({
  commentsClient,
  logger,
});

const usersService = _usersService({
  commentsService,
  usersClient,
  logger,
  uuidv4,
});

const usersController = _usersController(usersService);

router.route("/users").get(usersController.list);
router.route("/users/:id").get(usersController.getById);

export default router;
