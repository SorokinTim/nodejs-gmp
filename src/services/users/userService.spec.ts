import "regenerator-runtime/runtime";
import faker from "faker";

import sequelize from "../../data-acess/db";
import { User as UserModel } from "../../models/User";
import { User as UserType, UserInternalProps } from "../../types/user";
import UserService from "./userService";

const MOCK_UUID = '0ca0cef1-1098-43eb-9a09-fa0015c82712';

describe('User service', () => {
    const service = new UserService();

    let mockUserId: string;
    const defaultUserFields: Omit<UserType, UserInternalProps> = {
        login: faker.internet.userName(),
        password: faker.internet.password(),
        age: faker.datatype.number(100),
    };
    const _createUser = async (userFields?: Partial<UserType>) => {
        return await UserModel.create({
            id: mockUserId,
            ...defaultUserFields,
            ...userFields,
        });
    };

    beforeAll(async () => {
        await sequelize.sync();
    });

    beforeEach(async () => {
        mockUserId = MOCK_UUID;
    });

    it('should properly work with getUserById service method', async () => {
        const userLogin = faker.internet.userName();
        await _createUser({ login: userLogin });

        const response = await service.getUserById(mockUserId);
        const result = response?.toJSON() as UserType;

        expect(result.login).toBe(userLogin);
    });

    it('should properly work with getUserByLogin service method', async () => {
        const userLogin = faker.internet.userName();
        await _createUser({ login: userLogin });

        const response = await service.getUserByLogin(userLogin);
        const result = response?.login;

        expect(result).toBe(userLogin);
    });

    it('should properly work with createUser service method', async () => {
        const newUser = await service.createUser({ ...defaultUserFields });
        const result = newUser?.toJSON() as UserType;
        mockUserId = result.id;

        const foundUser = await UserModel.findByPk(mockUserId);

        expect(foundUser).toBeTruthy();
    });

    it('should properly work with deleteUserById service method', async () => {
        await _createUser();

        await service.deleteUserById(mockUserId);
        const result = await UserModel.findByPk(mockUserId);

        expect(result).toBe(null);
    });

    it('should properly work with updateUserById service method', async () => {
        const newUserLogin = 'NEW_USER_LOGIN';
        await _createUser();

        await service.updateUserById(mockUserId, {
            ...defaultUserFields,
            login: newUserLogin,
        });
        const response = await UserModel.findByPk(mockUserId);
        const result = response?.toJSON() as UserType;

        expect(result.login).toBe(newUserLogin);
    });

    it('should properly work with getAutoSuggestUsers service method', async () => {
        const userLogin = 'USER_LOGIN';
        await _createUser({ login: userLogin });

        const response = await service.getAutoSuggestUsers(userLogin.substr(0, 5));
        const mappedResponse = response.map(user => user.toJSON()) as UserType[];
        const [result] = mappedResponse;

        expect(result.login).toBe(userLogin);
    });

    afterEach(async () => {
        await UserModel.destroy({
            where: { id: mockUserId }
        });
    })

    afterAll(async () => {
        await sequelize.close();
    });
});
