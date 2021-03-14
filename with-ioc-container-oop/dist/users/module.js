"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const inversify_1 = require("inversify");
require("./UsersController");
const UsersService_1 = require("./UsersService");
const constants_1 = require("../constants");
const UsersClient_1 = require("./UsersClient");
exports.UsersModule = new inversify_1.ContainerModule((bind, _) => {
  bind(constants_1.TYPES.USERS_SERVICE).to(UsersService_1.UsersService);
  bind(constants_1.TYPES.USERS_CLIENT).toConstantValue(
    UsersClient_1.usersClient
  );
});
//# sourceMappingURL=module.js.map
