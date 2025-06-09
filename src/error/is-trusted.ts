import BaseError from './base.error';

export default (err: any): err is BaseError => err instanceof BaseError;
