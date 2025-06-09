export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export default abstract class BaseError extends Error {
  private readonly __context: Record<string, any> | null;

  constructor(message: string, context?: Record<string, any>, cause?: any) {
    super(message, { cause });
    this.__context = context ?? null;
  }

  get context(): Record<string, any> | null {
    return this.__context ?? null;
  }

  abstract get severity(): ErrorSeverity;
}
