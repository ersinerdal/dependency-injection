import * as userService from "../UsersService";
import * as commentsService from "../../comments/CommentsService";
import { usersClient } from "../UsersClient";
import { logger } from "../../logger/logger";

const generateUser = (id: string) => ({
  id,
  name: `name-${id}`,
});

const uuid = "123456"
jest.mock('uuid', () => ({
  v4: () => uuid
}))

describe("UsersService", () => {
  let mockGet: jest.SpyInstance;
  let mockCommentsService: jest.SpyInstance;
  let mockLoggerInfo: jest.SpyInstance;

  beforeEach(() => {
    mockCommentsService = jest.spyOn(commentsService, "listByUserId");
    mockGet = jest.spyOn(usersClient, "get");
    mockLoggerInfo = jest.spyOn(logger, "info");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches a user", async () => {
    const mockUserResponse = generateUser(uuid);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    mockGet.mockImplementation(() =>
      Promise.resolve({ data: mockUserResponse })
    );
    mockCommentsService.mockImplementation(() =>
      Promise.resolve(mockCommentResponse)
    );

    const user = await userService.getById("1");

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
