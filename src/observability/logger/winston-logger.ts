import { createLogger, Logger, transports } from 'winston';
import { LogConfig } from '../../config/types';
import { Logger as Contract } from '../contracts/logger';

export default class WinstonLogger implements Contract {
  private readonly logger: Logger;

  constructor(config: LogConfig) {
    this.logger = createLogger({
      level: config.level,
      transports: [
        this.makeFileTransporter(config),
        // this.makeConsoleTransporter(config)
      ],
    });
  }

  private makeFileTransporter(config: LogConfig) {
    return new transports.File({
      filename: config.handler.path,
    });
  }

  private makeConsoleTransporter(config: LogConfig) {
    return new transports.Console();
  }

  info(message: string, context?: Record<string, any>): void {
    this.logger.info(message, context);
  }

  debug(message: string, context?: Record<string, any>): void {
    this.logger.debug(message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.logger.error(message, context);
  }

  warning(message: string, context?: Record<string, any>): void {
    this.logger.warn(message, context);
  }
}
