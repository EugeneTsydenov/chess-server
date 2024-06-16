import { IEnv } from '@common/types';
import * as process from 'node:process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 52718,
});
