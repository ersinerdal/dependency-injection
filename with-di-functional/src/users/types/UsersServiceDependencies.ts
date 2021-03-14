import { AxiosInstance } from "axios";
import { Logger } from "winston";
import { commentsService } from "../../comments/CommentsService";

export interface UsersServiceDependencies {
  usersClient: Pick<AxiosInstance, "get">;
  commentsClient: Pick<AxiosInstance, "get">;
  logger: Pick<Logger, "error" | "info">;
  commentsService: typeof commentsService;
  uuidv4: () => string;
}
