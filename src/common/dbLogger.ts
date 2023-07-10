/* istanbul ignore file */

import type { Knex } from 'knex';

import Logger from './logger';

const log = Logger('knex');

export const dbLogger: Knex.Logger = {
  debug: (x) => log.debug(JSON.stringify(x)),
  warn: (x) => log.warn(JSON.stringify(x)),
  deprecate: (x) => log.warn(JSON.stringify(x)),
  error: (x) => log.error(JSON.stringify(x)),
};
