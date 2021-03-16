import UsersServiceImp from "../UsersService";
import { UsersService } from "../types";
import { TYPES } from "../../constants";
import { Container } from "inversify";

const generateUser = (id: string) => ({
  id,
  name: `name-${id}`,
});

describe("UsersService", () => {

  const generateService =({uuid,user,comments }:any):UsersService=> {
    const container = new Container();
    container.bind(TYPES.LOGGER).toConstantValue({ info: ()=>{} });
    container.bind(TYPES.UUID).toConstantValue(()=> uuid);
    container.bind(TYPES.USERS_CLIENT).toConstantValue({get: () => ({ data: user })});
    container.bind(TYPES.COMMENTS_SERVICE).toConstantValue({ listByUserId: () => comments });
    container.bind(TYPES.USERS_SERVICE).toDynamicValue(UsersServiceImp);
    return  container.get(TYPES.USERS_SERVICE);
  }

  it("fetches a user", async () => {
    const mockUuid = "123456";
    const mockUser = generateUser(mockUuid);
    const mockComments = [{ id: "1", postId: "1" }];

    const service:UsersService = generateService({
      user: mockUser,
      comments: mockComments,
      uuid: mockUuid,
    });

    const user = await service.getById("1");

    expect(user).toEqual({
      ...mockUser,
      comments: mockComments,
    });
  });
});
