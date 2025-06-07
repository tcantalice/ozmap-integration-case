import { Box } from './box.entity';
import Customer from './customer.entity';
import { BaseSynchronizable } from './synchronizable';

export default class DropCable extends BaseSynchronizable {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly box: Box,
    public readonly customer: Customer,
  ) {
    super();
  }
}
