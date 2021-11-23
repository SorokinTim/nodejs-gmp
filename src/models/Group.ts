import { Model, DataTypes } from "sequelize";
import sequelize from "../data-acess/db";

export class Group extends Model {}
Group.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
}, { sequelize, modelName: 'groups' });
