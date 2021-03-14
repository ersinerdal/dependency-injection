import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../constants";
import CommentsService from "./CommentsService";
import { client } from "./CommentsClient";

export const CommentsModule = new ContainerModule(
  (bind: interfaces.Bind, _: interfaces.Unbind) => {
    bind(TYPES.COMMENTS_SERVICE).toDynamicValue(CommentsService);
    bind(TYPES.COMMENTS_CLIENT).toConstantValue(client);
  }
);
