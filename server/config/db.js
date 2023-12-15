import { Sequelize } from 'sequelize';
import env from 'dotenv';

env.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);
