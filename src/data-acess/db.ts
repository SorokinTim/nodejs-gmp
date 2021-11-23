import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('users-db', 'postgres', 'root', {
    dialect: 'postgres',
});

export default sequelize;
