"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.commentsClient = axios_1.default.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    timeout: 1000,
});
//# sourceMappingURL=CommentsClient.js.map