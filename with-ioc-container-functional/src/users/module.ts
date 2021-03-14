import { ContainerModule, interfaces } from "inversify";
import "./UsersController";
import { TYPES } from "../constants";
import { usersClient } from "./UsersClient";
import { v4 as uuidv4 } from "uuid";
import UsersController from "./UsersController";
import UsersService from "./UsersService";

export const UsersModule = new ContainerModule(
  (bind: interfaces.Bind, _: interfaces.Unbind) => {
    bind(TYPES.USERS_CONTROLLER).toDynamicValue(UsersController);
    bind(TYPES.USERS_SERVICE).toDynamicValue(UsersService);
    bind(TYPES.USERS_CLIENT).toConstantValue(usersClient);
    bind(TYPES.UUID).toConstantValue(uuidv4);
  }
);
