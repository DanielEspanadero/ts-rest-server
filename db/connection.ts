import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize('node', 'root', process.env.MYSQL_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;