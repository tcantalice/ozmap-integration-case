import { z } from 'zod/v4';

export const serviceSchema = z.object({
  SERVICE_INTERVAL: z.coerce.number().default(5),
});

export const importerSchema = z.object({
  IMPORTER_GW_URL: z.url(),
});

export const exporterSchema = z.object({
  EXPORTER_GW_URL: z.url(),
  EXPORTER_GW_API_KEY: z.string(),
});

export const logSchema = z.object({
  LOG_LEVEL: z.enum(['debug', 'info', 'warning', 'error']),
  LOG_FILE_PATH: z.string(),
});

export const envConfigSchema = z.object({
  ...serviceSchema.shape,
  ...logSchema.shape,
  ...importerSchema.shape,
  ...exporterSchema.shape,
});
