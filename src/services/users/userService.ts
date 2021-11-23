import { v4 as uuid } from "uuid";
import { Op, literal } from "sequelize";
import { User as UserModel } from "../../models/User";
import { User, UserInternalProps } from "../../types/user";

export default class UserService {
    async getUserById(id: string) {
        return await UserModel.findByPk(id)
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
}
