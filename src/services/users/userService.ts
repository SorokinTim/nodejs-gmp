import { v4 as uuid } from "uuid";
import { Op, literal } from "sequelize";
import sequelize from "../../data-acess/db";
import { User as UserModel } from "../../models/User";
import { User, UserInternalProps } from "../../types/user";

export default class UserService {
    async getUserById(id: string) {
        await sequelize.sync();

        return await UserModel.findByPk(id)
    }

    async createUser(user: Omit<User, UserInternalProps>) {
        const { login, password, age } = user;
        await sequelize.sync();

        return await UserModel.create({
            login,
            password,
            age,
            id: uuid(),
        });
    }

    async updateUserById(id: string, user: Partial<Omit<User, UserInternalProps>>) {
        const { login, password, age } = user;
        await sequelize.sync();

        const currentUser = await this.getUserById(id);

        if (!currentUser) {
            return;
        }

        await currentUser.update({
            login,
            password,
            age,
        });
        await currentUser.save();

        return currentUser;
    }

    async deleteUserById(id: string) {
        await sequelize.sync();
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
        await sequelize.sync();

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
