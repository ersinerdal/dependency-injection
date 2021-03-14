import { User } from "./User";
import { CommentsService } from "../comments/CommentsService";

export class UsersService {
  private commentsService: CommentsService;
  private logger;
  private client;
  private readonly uuid;

  constructor({ commentsService, logger, client, uuid }) {
    this.commentsService = commentsService;
    this.logger = logger;
    this.client = client;
    this.uuid = uuid;
  }

  async list() {
    try {
      const { data } = await this.client.get("users");
      this.logger.info(`Users are fetched`);

      return data.map((user: User) => {
        const { id, name, username, email, phone } = user;
        return { id, name, username, email, phone };
      });
    } catch (e) {
      this.logger.error("Users couldn't be fetched");
    }
  }

  async getById(userId: string) {
    try {
      const {
        data: { name, username, email, phone },
      } = await this.client.get(`users/${userId}`);

      const comments = await this.commentsService.listByUserId(userId);

      return { id: this.uuid(), name, username, email, phone, comments };
    } catch (e) {
      const message = `User (${userId}) does not exist`;
      this.logger.error(message);
      return message;
    }
  }
}
