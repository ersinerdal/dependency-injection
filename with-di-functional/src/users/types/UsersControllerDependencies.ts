import { AxiosInstance } from "axios";
import { Logger } from "winston";
import { commentsService } from "../../comments/CommentsService";
import { usersService } from "../UsersService";

export interface UsersControllerDependencies {
  logger: Pick<Logger, "error" | "info">;
  usersService: typeof usersService;
  usersClient: Pick<AxiosInstance, "get">;
  commentsService: typeof commentsService;
  commentsClient: Pick<AxiosInstance, "get">;
  uuidv4: ()=> string
}
