import { randomBytes } from 'crypto';

export default (): string => randomBytes(12).toString('hex');
