import * as usersService from "../UsersService";
import { Logger } from "winston";
import { AxiosInstance } from "axios";
import { UserDependencies, UsersDependencies } from "../UsersService";

const generateUser = (id: number) => ({
  id,
  name: `name-${id}`,
});

describe("UsersService", () => {
  const mockGet = jest.fn();
  const usersDependencies: UsersDependencies = {
    usersClient: ({
      get: mockGet,
    } as Partial<AxiosInstance>) as AxiosInstance,
    logger: ({
      info: jest.fn(),
    } as Partial<Logger>) as Logger,
  };
  const mockListByUserId = jest.fn();
  const userDependencies: UserDependencies = {
    ...usersDependencies,
    commentsService: {
      listByUserId: () => mockListByUserId,
    },
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the users", async () => {
    const mockResponse = [generateUser(1), generateUser(2), generateUser(3)];

    mockGet.mockReturnValue({ data: mockResponse });

    const userList = await usersService.list()(usersDependencies);

    expect(userList).toEqual(mockResponse);
    expect(usersDependencies.logger.info).toHaveBeenCalledWith(
      "Users are fetched"
    );
  });

  it("fetches a user", async () => {
    const mockUserResponse = generateUser(1);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    mockGet.mockReturnValue({ data: mockUserResponse });
    mockListByUserId.mockReturnValue(mockCommentResponse);

    const user = await usersService.getById("1")(userDependencies)(jest.fn());

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
