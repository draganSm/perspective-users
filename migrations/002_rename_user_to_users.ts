/* istanbul ignore file */

import type { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.renameTable('user', 'users');
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.renameTable('users', 'user');
};
