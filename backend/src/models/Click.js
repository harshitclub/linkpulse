import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define the "clicks" table in PostgreSQL (stores each visit for analytics)
export const Click = sequelize.define('Click', {
  linkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
  },
  browser: {
    type: DataTypes.STRING,
  },
  os: {
    type: DataTypes.STRING,
  },
  referrer: {
    type: DataTypes.STRING,
  },
});
