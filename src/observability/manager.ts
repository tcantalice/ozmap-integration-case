import { Config } from '../config/types';
import { Logger } from './contracts/logger';
import FileLogger from './logger/file-logger';

export default class ObservabilityManager {
  private static __instance: ObservabilityManager;

  private __logger: Logger;

  constructor(config: Config) {
    this.__logger = new FileLogger(config.log);
  }

  static init(config: Config) {
    if (!ObservabilityManager.__instance) {
      ObservabilityManager.__instance = new ObservabilityManager(config);
    }
  }

  static logger(): Logger {
    return ObservabilityManager.__instance.__logger;
  }
}
