import { DataTypes } from 'sequelize';

import { sequelize } from '../config/db.js';

export const Project = sequelize.define('project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed'),
    allowNull: false,
  },
});
