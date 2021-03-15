import { AxiosInstance } from "axios";
import { Logger } from "winston";
import { CommentsService } from "../../comments/types/CommentsService";

export interface UsersServiceDependencies {
  usersClient: Pick<AxiosInstance, "get">;
  logger: Pick<Logger, "error" | "info">;
  commentsService: CommentsService;
  uuidv4: () => string;
}
