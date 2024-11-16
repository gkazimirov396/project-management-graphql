import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';

import { Client } from './models/Client.js';
import { Project } from './models/Project.js';

import schema from './graphql/schemas/rootSchema.js';

import { sequelize } from './config/db.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(helmet());

app.use(
  '/graphql',
  createHandler({
    schema,
    formatError: err => {
      if (!err.originalError) {
        return err;
      }
      console.error(err.originalError);

      const path = err.originalError.extensions.path;
      const message = err.message || 'An error occurred.';
      const status = err.originalError.extensions.status || 500;

      return {
        message,
        status,
        path,
      };
    },
  })
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    Client.hasOne(Project, {
      constraints: true,
      onDelete: 'CASCADE',
    });
    Project.belongsTo(Client);

    sequelize.sync();

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
})();
