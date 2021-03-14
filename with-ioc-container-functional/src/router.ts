import { Router } from "express";
import {TYPES} from "./constants";
import container from './container'
import {UsersController} from "./users/types/UsersController";

const router = Router();

const usersController:UsersController = container.get(TYPES.USERS_CONTROLLER)

router.route("/users").get(usersController.list);
router.route("/users/:id").get(usersController.getById);

export default router;
