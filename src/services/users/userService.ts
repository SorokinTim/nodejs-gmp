import { v4 as uuid } from "uuid";
import { Op, literal } from "sequelize";
import jwt from "jsonwebtoken";
import { User as UserModel } from "../../models/User";
import { User, UserInternalProps } from "../../types/user";
import ApiError from "../../errors/ApiError";

export default class UserService {
    async getUserById(id: string) {
        return await UserModel.findByPk(id)
    }

    async getUserByLogin(login: string) {
        return await UserModel.findOne({
            where: { login },
        }) as User | null;
    }

    async createUser(user: Omit<User, UserInternalProps>) {
        const { login, password, age } = user;

        return await UserModel.create({
            login,
            password,
            age,
            id: uuid(),
        });
    }

    async updateUserById(id: string, user: Partial<Omit<User, UserInternalProps>>) {
        const { login, password, age } = user;

        const currentUser = await this.getUserById(id);

        if (!currentUser) {
            return;
        }

        await currentUser.update({
            login,
            password,
            age,
        });

        return currentUser;
    }

    async deleteUserById(id: string) {
        const deletedUser = await this.getUserById(id);

        if (!deletedUser) {
            return;
        }

        await UserModel.destroy({
            where: { id },
        });

        return deletedUser;
    }

    async getAutoSuggestUsers(loginSubstring?: string, limit?: number) {
        return await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring || '_'}%`,
                }
            },
            limit,
            order: literal('login ASC'),
        });
    }

    async authorizeUser(login: string, password: string) {
        const user = await this.getUserByLogin(login);

        if (!user || user.password !== password) {
            throw ApiError.wrongAuthorizationCredentials();
        }

        if (!process.env.JWT_SECRET_KEY) {
            throw ApiError.internalServerError();
        }

        return jwt.sign({ login }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_MAX_AGE || '1d' });
    }
}
