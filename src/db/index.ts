import Knex from 'knex';
import * as config from 'src/db/knexfile';
import * as dotEnv from 'dotenv';

dotEnv.config();

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(config[environment]);

export default knex;
