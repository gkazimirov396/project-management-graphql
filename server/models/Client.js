import { DataTypes } from 'sequelize';

import { sequelize } from '../config/db.js';

export const Client = sequelize.define('client', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        msg: 'The value you entered is not a valid e-mail!',
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
        msg: 'The value you entered is not a valid phone number!',
      },
    },
  },
});
