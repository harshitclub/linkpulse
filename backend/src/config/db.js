import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Connect to PostgreSQL database running in Docker
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'linkpulsedb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false, // Set to true if you want to see SQL queries in console
  }
);
