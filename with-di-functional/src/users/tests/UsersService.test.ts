import { usersService } from "../UsersService";
import { UsersServiceDependencies } from "../types";

const generateUser = (id: string) => ({
  id,
  name: `name-${id}`,
});

describe("UsersService", () => {
  const mockUuid = "123456";
  const mockUsersGet = jest.fn();
  const mockCommentsGet = jest.fn();
  const mockListByUserId = jest.fn();
  const usersServiceDependencies: UsersServiceDependencies = {
    usersClient: { get: mockUsersGet },
    commentsClient: { get: mockCommentsGet },
    logger: { info: jest.fn(), error: jest.fn() },
    commentsService: () => ({ listByUserId: mockListByUserId }),
    uuidv4: () => mockUuid,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the users", async () => {
    const mockResponse = [
      generateUser("1"),
      generateUser("2"),
      generateUser("3"),
    ];

    mockUsersGet.mockReturnValue({ data: mockResponse });

    const userList = await usersService(usersServiceDependencies).list();

    expect(userList).toEqual(mockResponse);
    expect(usersServiceDependencies.logger.info).toHaveBeenCalledWith(
      "Users are fetched"
    );
  });

  it("fetches a user", async () => {
    const mockUserResponse = generateUser(mockUuid);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    mockUsersGet.mockReturnValue({ data: mockUserResponse });
    mockListByUserId.mockReturnValue(mockCommentResponse);

    const user = await usersService(usersServiceDependencies).getById("1");

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
