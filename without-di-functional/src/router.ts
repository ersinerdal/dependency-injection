import { Router } from "express";
import * as usersController from "./users/UsersController";

const router = Router();

router.route("/users").get(usersController.list);
router.route("/users/:id").get(usersController.getById);

export default router;
