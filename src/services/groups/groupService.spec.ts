import "regenerator-runtime/runtime";
import faker from "faker";

import sequelize from "../../data-acess/db";
import { Group as GroupModel } from "../../models/Group";
import { Group as GroupType, GroupInternalProps } from "../../types/group";
import GroupService from "./groupService";

const MOCK_UUID = '5543beb0-716f-4405-ade9-2519097a88c2';

describe('Groups service', () => {
    const service = new GroupService();

    let mockGroupId: string;
    const defaultGroupFields: Omit<GroupType, GroupInternalProps> = {
        name: faker.company.companyName(),
        permissions: ['SHARE', 'DELETE', 'UPLOAD_FILES'],
    };
    const _createGroup = async (groupFields?: Partial<GroupType>) => {
        return await GroupModel.create({
            id: mockGroupId,
            ...defaultGroupFields,
            ...groupFields,
        });
    };

    beforeAll(async () => {
        await sequelize.sync();
    });

    beforeEach(async () => {
        mockGroupId = MOCK_UUID;
    });

    it('should properly work with getGroups service method', async () => {
        const newGroupName = 'NEW_GROUP_NAME';
        await _createGroup({ name: newGroupName });

        const response = await service.getGroups();
        const mappedResponse = response.map(group => group.toJSON()) as GroupType[];
        const result = mappedResponse.find(group => group.name === newGroupName) || null;

        expect(result).toBeTruthy();
    });

    it('should properly work with getGroupById service method', async () => {
        const newGroupName = 'NEW_GROUP_NAME';
        await _createGroup({ name: newGroupName });

        const response = await service.getGroupById(mockGroupId);
        const result = response?.toJSON() as GroupType;

        expect(result.name).toBe(newGroupName);
    });

    it('should properly work with createGroup service method', async () => {
        const newGroup = await service.createGroup({ ...defaultGroupFields });
        const result = newGroup?.toJSON() as GroupType;
        mockGroupId = result.id;

        const foundGroup = await GroupModel.findByPk(mockGroupId);

        expect(foundGroup).toBeTruthy();
    });

    it('should properly work with deleteGroupById service method', async () => {
        await _createGroup();

        await service.deleteGroupById(mockGroupId);
        const result = await GroupModel.findByPk(mockGroupId);

        expect(result).toBe(null);
    });

    it('should properly work with updateGroupById service method', async () => {
        await _createGroup();

        const newGroupName = 'NEW_GROUP_NAME';
        await service.updateGroupById(mockGroupId, {
            ...defaultGroupFields,
            name: newGroupName,
        });
        const response = await GroupModel.findByPk(mockGroupId);
        const result = response?.toJSON() as GroupType;

        expect(result.name).toBe(newGroupName);
    });

    afterEach(async () => {
        await GroupModel.destroy({
            where: { id: mockGroupId }
        });
    })

    afterAll(async () => {
        await sequelize.close();
    });
});
