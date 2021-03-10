"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const CommentsService_1 = require("../comments/CommentsService");
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
let UsersService = class UsersService {
  list() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { data } = yield this.usersClient.get("users");
        this.logger.info(`Users are fetched`);
        return data.map((user) => {
          const { id, name, username, email, phone } = user;
          return { id, name, username, email, phone };
        });
      } catch (e) {
        this.logger.error("Users couldn't be fetched");
      }
    });
  }
  getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          data: { id, name, username, email, phone },
        } = yield this.usersClient.get(`users/${userId}`);
        const comments = yield this.commentsService.listByUserId(userId);
        return { id, name, username, email, phone, comments };
      } catch (e) {
        const message = `User (${userId}) does not exist`;
        this.logger.error(message);
        return message;
      }
    });
  }
};
__decorate(
  [
    inversify_1.inject(constants_1.TYPES.LOGGER),
    __metadata("design:type", Object),
  ],
  UsersService.prototype,
  "logger",
  void 0
);
__decorate(
  [
    inversify_1.inject(constants_1.TYPES.USERS_CLIENT),
    __metadata("design:type", Function),
  ],
  UsersService.prototype,
  "usersClient",
  void 0
);
__decorate(
  [
    inversify_1.inject(constants_1.TYPES.COMMENTS_SERVICE),
    __metadata("design:type", CommentsService_1.CommentsService),
  ],
  UsersService.prototype,
  "commentsService",
  void 0
);
UsersService = __decorate([inversify_1.injectable()], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=UsersService.js.map
