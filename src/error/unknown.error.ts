import BaseError, { ErrorSeverity } from './base.error';

export default class UnknownError extends BaseError {
  constructor(cause: any, context?: Record<string, any>) {
    super(cause?.stack ?? 'An unknown error occurs', context);
    this.name = cause.name ?? 'UnknownError';
  }

  get severity(): ErrorSeverity {
    return 'critical';
  }
}
