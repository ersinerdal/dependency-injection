"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.usersClient = axios_1.default.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
});
//# sourceMappingURL=UsersClient.js.map
