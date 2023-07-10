import knex from 'knex';
import type { Knex } from 'knex';
import { dbLogger } from '../common/dbLogger';
import { environment } from '../common/environment';

type Constructor<T = {}> = new (...args: any[]) => T;

class RepositoryFactory {
  private repoMap: Record<string, any> = {};

  constructor(private knex: Knex) {}

  get<T>(repositoryClass: Constructor<T>): T {
    const className = repositoryClass.name;
    this.repoMap[className] = this.repoMap[className] || new repositoryClass(this.knex);
    return this.repoMap[className];
  }
}

const database = knex({
  client: 'pg',
  connection: environment.pgConnectionString,
  debug: process.env.PG_DEBUG_LOG === 'true',
  log: dbLogger,
});

export const repositoryFactory = new RepositoryFactory(database);
