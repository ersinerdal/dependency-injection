"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const constants_1 = require("./constants");
const logger_1 = require("./logger/logger");
const module_1 = require("./users/module");
const module_2 = require("./comments/module");
let container = new inversify_1.Container();
container.bind(constants_1.TYPES.LOGGER).toConstantValue(logger_1.logger);
container.load(module_1.UsersModule, module_2.CommentsModule);
exports.default = container;
//# sourceMappingURL=container.js.map
