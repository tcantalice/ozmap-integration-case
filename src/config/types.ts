export interface ServiceConfig {
  interval: number;
}

export interface ISPImporterConfig {
  gateway: {
    url: string;
  };
}

export interface OZMapExporterConfig {
  gateway: {
    url: string;
    apiKey: string;
  };
}

export interface LogConfig {
  level: 'debug' | 'info' | 'warning' | 'error';
  handler: {
    kind: 'file';
    path: string;
  };
}

export interface Config {
  service: ServiceConfig;
  log: LogConfig;
  importer: ISPImporterConfig;
  exporter: OZMapExporterConfig;
}
