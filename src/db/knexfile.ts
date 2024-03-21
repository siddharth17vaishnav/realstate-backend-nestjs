import { knexSnakeCaseMappers } from 'objection';
import * as dotEnv from 'dotenv';

dotEnv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds/development',
    },
    timezone: 'UTC',
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds/development',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds/development',
    },
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './server/db/seeds/test',
    },
  },
  ...knexSnakeCaseMappers(),
};
