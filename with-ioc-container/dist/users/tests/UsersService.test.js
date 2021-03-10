"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersService_1 = require("../UsersService");
const constants_1 = require("../../constants");
const inversify_1 = require("inversify");
const generateUser = (id) => ({
    id,
    name: `name-${id}`,
});
describe("UsersService", () => {
    let usersService;
    const infoSpy = jest.fn();
    const getSpy = jest.fn();
    const listByUserIdSpy = jest.fn();
    beforeEach(() => {
        const container = new inversify_1.Container();
        container.bind(constants_1.TYPES.LOGGER).toConstantValue({ info: infoSpy });
        container.bind(constants_1.TYPES.USERS_CLIENT).toConstantValue({ get: getSpy });
        container.bind(constants_1.TYPES.COMMENTS_SERVICE).toConstantValue({ listByUserId: listByUserIdSpy });
        container.bind(constants_1.TYPES.USERS_SERVICE).to(UsersService_1.UsersService);
        usersService = container.get(constants_1.TYPES.USERS_SERVICE);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("fetches the users", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponse = [generateUser(1), generateUser(2), generateUser(3)];
        getSpy.mockReturnValue({ data: mockResponse });
        const userList = yield usersService.list();
        expect(userList).toEqual(mockResponse);
        expect(infoSpy).toHaveBeenCalledWith("Users are fetched");
    }));
    it("fetches a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserResponse = generateUser(1);
        const mockCommentResponse = [{ id: "1", postId: "1" }];
        getSpy.mockReturnValue({ data: mockUserResponse });
        listByUserIdSpy.mockReturnValue(mockCommentResponse);
        const user = yield usersService.getById("1");
        expect(user).toEqual(Object.assign(Object.assign({}, mockUserResponse), { comments: mockCommentResponse }));
    }));
});
//# sourceMappingURL=UsersService.test.js.map