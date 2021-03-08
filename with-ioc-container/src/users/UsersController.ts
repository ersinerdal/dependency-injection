import { controller, httpGet, requestParam } from "inversify-express-utils";
import { UsersService } from "./UsersService";
import { inject } from "inversify";
import { TYPES } from "../constants";

@controller("/users")
export class UsersController {
  @inject(TYPES.USERS_SERVICE) private readonly usersService: UsersService;

  @httpGet("/")
  public async list() {
    return this.usersService.list();
  }

  @httpGet("/:id")
  public async getById(@requestParam("id") id: string) {
    return this.usersService.getById(id);
  }
}
