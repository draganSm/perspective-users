import { TEST_CONTAINER_REF_KEY } from './utils';

const teardown = async () => {
  (globalThis as any)[TEST_CONTAINER_REF_KEY]?.stop();
};

export default teardown;
