import { UsersService } from "../UsersService";
import { TYPES } from "../../constants";
import { Container } from "inversify";

const generateUser = (id: number) => ({
  id,
  name: `name-${id}`,
});

describe("UsersService", () => {
  let usersService: UsersService;
  const infoSpy = jest.fn();
  const getSpy = jest.fn();
  const listByUserIdSpy = jest.fn();

  beforeEach(() => {
    const container = new Container();
    container.bind(TYPES.LOGGER).toConstantValue({ info: infoSpy });
    container.bind(TYPES.USERS_CLIENT).toConstantValue({ get: getSpy });
    container.bind(TYPES.COMMENTS_SERVICE).toConstantValue({ listByUserId: listByUserIdSpy });
    container.bind(TYPES.USERS_SERVICE).to(UsersService);
    usersService = container.get(TYPES.USERS_SERVICE);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the users", async () => {
    const mockResponse = [generateUser(1), generateUser(2), generateUser(3)];

    getSpy.mockReturnValue({ data: mockResponse });

    const userList = await usersService.list();

    expect(userList).toEqual(mockResponse);
    expect(infoSpy).toHaveBeenCalledWith("Users are fetched");
  });

  it("fetches a user", async () => {
    const mockUserResponse = generateUser(1);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    getSpy.mockReturnValue({ data: mockUserResponse });
    listByUserIdSpy.mockReturnValue(mockCommentResponse);

    const user = await usersService.getById("1");

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
