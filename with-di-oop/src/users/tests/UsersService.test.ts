import { UsersService } from "../UsersService";

const generateUser = (id: string) => ({
  id,
  name: `name-${id}`,
});

describe("UsersService", () => {
  let usersService: UsersService;
  const mockClient = { get: jest.fn() }
  const mockLogger = { info: jest.fn() };
  const mockCommentsService = { listByUserId: jest.fn() };
  const mockUuid = jest.fn()

  beforeEach(() => {
    usersService = new UsersService({
      commentsService: mockCommentsService,
      logger: mockLogger,
      client: mockClient,
      uuid: mockUuid
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the users", async () => {
    const mockResponse = [generateUser("1"), generateUser("2"), generateUser("3")];

    mockClient.get.mockReturnValue({ data: mockResponse });

    const userList = await usersService.list();

    expect(userList).toEqual(mockResponse);
    expect(mockLogger.info).toHaveBeenCalledWith("Users are fetched");
  });

  it("fetches a user", async () => {
    const uuid = "123456";
    const mockUserResponse = generateUser(uuid);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    mockUuid.mockReturnValue(uuid);
    mockClient.get.mockReturnValue({ data: mockUserResponse });
    mockCommentsService.listByUserId.mockReturnValue(mockCommentResponse);

    const user = await usersService.getById("1");

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
