/* istanbul ignore file */

import * as dotenv from 'dotenv';

dotenv.config();

type Environment = {
  port: number;
  pgConnectionString: string;
  pgDebugLog: boolean;
};

const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PG_PORT : '5432';

export const environment: Environment = {
  port: parseInt(process.env.PORT),
  pgConnectionString: process.env.PG_CONNECTION_STRING.replace('%PORT%', port),
  pgDebugLog: process.env.PG_DEBUG_LOG === 'true',
};
