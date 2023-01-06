import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const { DB_URI } = process.env;


const sequelize = new Sequelize(
  DB_URI,
);

export default sequelize;
