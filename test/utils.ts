import knex from 'knex';
import { dbLogger } from '../src/common/dbLogger';
import { environment } from '../src/common/environment';

const database = knex({
  client: 'pg',
  connection: environment.pgConnectionString,
  debug: process.env.PG_DEBUG_LOG === 'true',
  log: dbLogger,
});

export const migrateLatest = async () => await database.migrate.latest();

export const TEST_CONTAINER_REF_KEY = 'TEST_CONTAINER_REF_KEY';
