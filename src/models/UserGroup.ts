import { Model } from "sequelize";
import sequelize from "../data-acess/db";
import { Group } from "./Group";
import { User } from "./User";

export class UserGroup extends Model {}
UserGroup.init({}, { sequelize, modelName: 'userGroup' });

const associationOptions = {
    through: UserGroup,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
};

User.belongsToMany(Group, {
    ...associationOptions,
    foreignKey: 'userId',
    otherKey: 'groupId',
});
Group.belongsToMany(User, {
    ...associationOptions,
    foreignKey: 'groupId',
    otherKey: 'userId',
});
