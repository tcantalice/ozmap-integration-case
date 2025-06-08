import pino, { Logger } from 'pino';
import { LogConfig } from '../../config/types';
import { Logger as Contract } from '../contracts/logger';

export default class FileLogger implements Contract {
  private readonly pino: Logger;

  constructor(config: LogConfig) {
    this.pino = pino(
      pino.transport({
        targets: [
          {
            level: config.level,
            target: 'pino/file',
            options: {
              destination: config.handler.path,
            },
          },
          {
            level: config.level,
            target: 'pino-pretty',
          },
        ],
      }),
    );
  }
  info(message: string, context?: Record<string, any>): void {
    this.pino.info(message, context);
  }

  debug(message: string, context?: Record<string, any>): void {
    this.pino.debug(message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.pino.error(message, context);
  }

  warning(message: string, context?: Record<string, any>): void {
    this.pino.warn(message, context);
  }
}
