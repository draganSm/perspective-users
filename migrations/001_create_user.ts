/* istanbul ignore file */

import type { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('address').notNullable();
    table.string('zip_code').notNullable();
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('user');
};
