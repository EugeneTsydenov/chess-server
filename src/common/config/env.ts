import { IEnv } from '@common/types';
import * as process from 'node:process';

export default (): IEnv => ({
  port: parseInt(process.env.PORT, 10) || 52718,
  dbUrl: process.env.DATABASE_URL,
  secrets: {
    access: process.env.ACCESS_SECRET_KEY,
    refresh: process.env.REFRESH_SECRET_KEY,
  },
  clientUrl: process.env.CLIENT_URL,
});
