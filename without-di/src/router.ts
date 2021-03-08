import { Router } from "express";
import { UsersController } from "./users/UsersController";

const router = Router();
const usersController = new UsersController();

router.route("/users").get(usersController.list);
router.route("/users/:id").get(usersController.getById);

export default router;
