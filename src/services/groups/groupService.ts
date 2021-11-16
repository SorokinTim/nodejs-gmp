import { v4 as uuid } from "uuid";
import { Group as GroupModel } from "../../models/Group";
import { Group, GroupInternalProps } from "../../types/group";

export default class GroupService {
    async getGroups() {
        return await GroupModel.findAll()
    }

    async getGroupById(id: string) {
        return await GroupModel.findByPk(id);
    }

    async createGroup(group: Omit<Group, GroupInternalProps>) {
        const { name, permissions } = group;

        return await GroupModel.create({
            id: uuid(),
            name,
            permissions,
        });
    }

    async updateGroupById(id: string, group: Omit<Group, GroupInternalProps>) {
        const { name, permissions } = group;
        const currentGroup = await this.getGroupById(id);

        if (!currentGroup) {
            return;
        }

        return await currentGroup.update({
            name,
            permissions,
        })
    }

    async deleteGroupById(id: string) {
        const deletedGroup = await this.getGroupById(id);

        if (!deletedGroup) {
            return;
        }

        await GroupModel.destroy({
            where: { id },
        });

        return deletedGroup;
    }
}
