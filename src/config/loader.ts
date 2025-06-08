import { config } from 'dotenv';
import type { Config } from './types';

import z from 'zod/v4';
import { envConfigSchema } from './schemas';

export const load = (): Config | never => {
  config();

  const result = envConfigSchema.safeParse(process.env);

  if (!result.success) {
    console.error();
    throw new Error(`Failed load configuration: ${z.treeifyError(result.error)}`);
  }

  return {
    service: {
      interval: result.data.SERVICE_INTERVAL,
    },
    log: {
      level: result.data.LOG_LEVEL,
      handler: {
        kind: 'file',
        path: result.data.LOG_FILE_PATH,
      },
    },
    importer: {
      gateway: {
        url: result.data.IMPORTER_GW_URL,
      },
    },
    exporter: {
      gateway: {
        apiKey: result.data.EXPORTER_GW_API_KEY,
        url: result.data.EXPORTER_GW_URL,
      },
    },
  };
};
