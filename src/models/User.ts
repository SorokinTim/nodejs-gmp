import { Model, DataTypes } from "sequelize";
import sequelize from "../data-acess/db";

export class User extends Model {}
User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, { sequelize, modelName: 'users' });
