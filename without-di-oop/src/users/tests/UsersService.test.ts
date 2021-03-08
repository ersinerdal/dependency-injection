import { UsersService } from "../UsersService";
import { client } from "../UsersClient";
import { logger } from "../../logger/logger";

const mockListByUserId = jest.fn();

jest.mock("../../comments/CommentsService", () => {
  return {
    CommentsService: jest.fn().mockImplementation(() => {
      return {
        listByUserId: mockListByUserId,
      };
    }),
  };
});

const generateUser = (id: number) => ({
  id,
  name: `name-${id}`
});

describe("UsersService", () => {
  let mockGet: jest.SpyInstance;
  let mockLoggerInfo: jest.SpyInstance;

  beforeEach(() => {
    mockGet = jest.spyOn(client, "get");
    mockLoggerInfo = jest.spyOn(logger, "info");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches the users", async () => {
    const mockResponse = [generateUser(1), generateUser(2), generateUser(3)];

    mockGet.mockImplementation(() => Promise.resolve({ data: mockResponse }));

    const userService = new UsersService();
    const userList = await userService.list();

    expect(userList).toEqual(mockResponse);
    expect(mockLoggerInfo).toHaveBeenCalledWith("Users are fetched");
  });

  it("fetches a user", async () => {
    const mockUserResponse = generateUser(1);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    mockGet.mockImplementation(() =>
      Promise.resolve({ data: mockUserResponse })
    );
    mockListByUserId.mockImplementation(() =>
      Promise.resolve(mockCommentResponse)
    );

    const userService = new UsersService();
    const user = await userService.getById("1");

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
