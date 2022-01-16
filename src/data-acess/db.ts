import { Sequelize } from 'sequelize';

if (!process.env.DB_NAME || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    throw new Error('Database credentials can\'t be empty!');
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
});

export default sequelize;
