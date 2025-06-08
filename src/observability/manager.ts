import { Config } from '../config/types';
import { Logger } from './contracts/logger';
import FileLogger from './logger/file-logger';

export default class ObservabilityManager {
  private __logger: Logger;

  constructor(config: Config) {
    this.__logger = new FileLogger(config.log);
  }

  get logger(): Logger {
    return this.__logger;
  }
}
