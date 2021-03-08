export class CommentsService {
  private logger;
  private client;

  constructor({ logger, client }) {
    this.logger = logger;
    this.client = client;
  }

  async listByUserId(userId: string) {
    try {
      const { data } = await this.client.get("comments", {
        params: { postId: userId },
      });
      return data;
    } catch (e) {
      this.logger.error("Comments couldn't be fetched");
      return [];
    }
  }
}
