import { Config } from '../config/types';
import { Logger } from './contracts/logger';
import FileLogger from './logger/winston-logger';

export default class Provider {
  private static __instance: Provider;

  private __logger: Logger;

  constructor(config: Config) {
    this.__logger = new FileLogger(config.log);
  }

  static init(config: Config) {
    if (!Provider.__instance) {
      Provider.__instance = new Provider(config);
    }
  }

  static logger(): Logger {
    return Provider.__instance.__logger;
  }
}
