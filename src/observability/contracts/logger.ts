export interface Logger {
  info(message: string, context?: object): void;
  debug(message: string, context?: object): void;
  warning(message: string, context?: object): void;
  error(message: string, context?: object): void;
}
