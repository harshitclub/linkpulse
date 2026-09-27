import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define the "links" table in PostgreSQL
export const Link = sequelize.define('Link', {
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
