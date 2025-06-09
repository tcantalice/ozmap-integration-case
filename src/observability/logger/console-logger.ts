import { Logger } from '../contracts/logger';

export default class ConsoleLogger implements Logger {
  info(message: string, context?: Record<string, any>): void {
    console.info(this.format('info', message, context?.location));
  }

  error(message: string, context?: Record<string, any>): void {
    console.error(this.format('error', message, context?.location));
  }

  debug(message: string, context?: Record<string, any>): void {
    console.debug(this.format('debug', message, context?.location));
  }

  warning(message: string, context?: Record<string, any>): void {
    console.warn(this.format('warning', message, context?.location));
  }

  private format(level: string, message: string, location?: string): string {
    const formatedLocation = location ? ` ${location} ` : '';

    return `[${new Date().toISOString()}]${formatedLocation}${level.toUpperCase()}: ${message}`;
  }
}
