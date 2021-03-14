import { ContainerModule, interfaces } from "inversify";
import "./UsersController";
import { UsersService } from "./UsersService";
import { TYPES } from "../constants";
import { usersClient } from "./UsersClient";
import { v4 as uuidv4 } from "uuid";

export const UsersModule = new ContainerModule(
  (bind: interfaces.Bind, _: interfaces.Unbind) => {
    bind<UsersService>(TYPES.USERS_SERVICE).to(UsersService);
    bind(TYPES.USERS_CLIENT).toConstantValue(usersClient);
    bind(TYPES.UUID).toConstantValue(uuidv4);
  }
);
