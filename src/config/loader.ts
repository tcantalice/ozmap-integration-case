import { config } from 'dotenv';
import type { Config } from './types';

import { envConfigSchema } from './schemas';

class ConfigError extends Error {
  constructor(cause: any) {
    super('Failed to load configuration', { cause });
  }
}

export const load = (): Config | never => {
  config({
    path: '/workspace/.env',
  });

  const result = envConfigSchema.safeParse(process.env);

  if (!result.success) {
    throw new ConfigError(result.error);
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
