import { Logger } from '../observability/contracts/logger';
import ObservabilityProvider from '../observability/provider';
import BaseError from './base.error';
import isTrusted from './is-trusted';
import UnknownError from './unknown.error';

export default class ErrorHandler {
  private readonly logger: Logger;

  constructor() {
    this.logger = ObservabilityProvider.logger();
  }

  handle(err: any) {
    const processedError = isTrusted(err) ? err : new UnknownError(err);

    this.report(processedError);

    if (processedError.severity == 'critical' || processedError.severity == 'high') {
      throw processedError;
    }
  }

  private report(error: BaseError) {
    this.logger.error(error.message, {
      ...(error.context ?? {}),
      error: error.name,
      severity: error.severity,
    });
  }
}
