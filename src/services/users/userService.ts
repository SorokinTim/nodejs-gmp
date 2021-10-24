import { v4 as uuid } from "uuid";
import { User, UserInternalProps } from "../../types/user";

export default class UserService {
    constructor(protected storage: User[]) {
        this.storage = storage;
    }

    getUserById(id: string) {
        return this.storage.find(user => user.id === id);
    }

    createUser(user: Omit<User, UserInternalProps>) {
        const { login, password, age } = user;

        const currentLength = this.storage.push({
            login,
            password,
            age,
            id: uuid(),
            isDeleted: false,
        });

        return this.storage[currentLength - 1];
    }

    updateUserById(id: string, user: Partial<Omit<User, UserInternalProps>>) {
        const { login, password, age } = user;

        const currentUser = this.getUserById(id);
        const updatedUser = { ...currentUser, login, password, age };

        return Object.assign(currentUser, updatedUser);
    }

    deleteUserById(id: string) {
        const deletedUser = this.getUserById(id);

        if (deletedUser) {
            deletedUser.isDeleted = true;
        }

        return deletedUser;
    }

    getAutoSuggestUsers(loginSubstring?: string, limit: number = this.storage.length) {
        const filteredUsers = this.storage.filter(user => {
            return loginSubstring ? user.login.match(new RegExp(loginSubstring, 'gi')) : true;
        });

        return filteredUsers.slice(0, limit);
    }
}
