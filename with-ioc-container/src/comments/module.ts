import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../constants";
import { CommentsService } from "./CommentsService";
import { commentsClient } from "./CommentsClient";

export const CommentsModule = new ContainerModule(
  (bind: interfaces.Bind, _: interfaces.Unbind) => {
    bind<CommentsService>(TYPES.COMMENTS_SERVICE).to(CommentsService);
    bind(TYPES.COMMENTS_CLIENT).toConstantValue(commentsClient);
  }
);
