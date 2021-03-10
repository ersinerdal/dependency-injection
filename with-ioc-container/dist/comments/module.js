"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const inversify_1 = require("inversify");
const constants_1 = require("../constants");
const CommentsService_1 = require("./CommentsService");
const CommentsClient_1 = require("./CommentsClient");
exports.CommentsModule = new inversify_1.ContainerModule((bind, _) => {
  bind(constants_1.TYPES.COMMENTS_SERVICE).to(
    CommentsService_1.CommentsService
  );
  bind(constants_1.TYPES.COMMENTS_CLIENT).toConstantValue(
    CommentsClient_1.commentsClient
  );
});
//# sourceMappingURL=module.js.map
