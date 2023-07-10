import { GenericContainer } from 'testcontainers';
import { TEST_CONTAINER_REF_KEY } from './utils';

const setup = async () => {
  const container = await new GenericContainer('postgres:latest')
    .withEnvironment({ POSTGRES_PASSWORD: 'admin' })
    .withExposedPorts(5432)
    .start();
  const port = container.getMappedPort(5432);
  process.env.TEST_PG_PORT = `${port}`;
  console.log('port', port);
  (globalThis as any)[TEST_CONTAINER_REF_KEY] = container;
};

export default setup;
