import UsersServiceImp from "../UsersService";
import {UsersService} from "../types/UsersService";
import { TYPES } from "../../constants";
import { Container } from "inversify";

const generateUser = (id: string) => ({
  id,
  name: `name-${id}`,
});

describe("UsersService", () => {
  let usersService: UsersService;
  const uuid = "123456";
  const infoSpy = jest.fn();
  const getSpy = jest.fn();
  const listBySpy = jest.fn();

  beforeEach(() => {
    const container = new Container();
    container.bind(TYPES.LOGGER).toConstantValue({ info: infoSpy });
    container.bind(TYPES.UUID).toConstantValue(()=> uuid);
    container.bind(TYPES.USERS_CLIENT).toConstantValue({ get: getSpy });
    container.bind(TYPES.COMMENTS_SERVICE).toConstantValue({ listByUserId: listBySpy });
    container.bind(TYPES.USERS_SERVICE).toDynamicValue(UsersServiceImp);
    usersService = container.get(TYPES.USERS_SERVICE);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches the users", async () => {
    const mockResponse = [generateUser("1"), generateUser("2"), generateUser("3")];

    getSpy.mockReturnValue({ data: mockResponse });

    const userList = await usersService.list();

    expect(userList).toEqual(mockResponse);
    expect(infoSpy).toHaveBeenCalledWith("Users are fetched");
  });

  it("fetches a user", async () => {
    const mockUserResponse = generateUser(uuid);
    const mockCommentResponse = [{ id: "1", postId: "1" }];

    getSpy.mockReturnValue({ data: mockUserResponse });
    listBySpy.mockReturnValue(mockCommentResponse);

    const user = await usersService.getById("1");

    expect(user).toEqual({
      ...mockUserResponse,
      comments: mockCommentResponse,
    });
  });
});
