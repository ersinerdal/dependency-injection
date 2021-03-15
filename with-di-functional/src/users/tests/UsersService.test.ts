import { usersService } from "../UsersService";

const generateUser = (id: string) => ({
  id,
  name: `name-${id}`,
});
const generateDependencies = ({ user, comments,uuid }: any):any => ({
  usersClient: { get: () => ({ data: user }) },
  commentsService: { listByUserId: () => comments },
  uuidv4: () => uuid
});

describe("UsersService", () => {
  it("fetches a user", async () => {
    const mockUuid = "123456";
    const mockUser = generateUser(mockUuid);
    const mockComments = [{ id: "1", postId: "1" }];

    const dependencies = generateDependencies({
      user: mockUser,
      comments: mockComments,
      uuid: mockUuid,
    });

    const user = await usersService(dependencies).getById("1");

    expect(user).toEqual({
      ...mockUser,
      comments: mockComments,
    });
  });
});
