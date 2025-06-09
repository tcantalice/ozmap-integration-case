import Box from './box.entity';
import DropCable from './drop-cable.entity';
import { BaseSynchronizable } from './synchronizable';

export default class Customer extends BaseSynchronizable {
  private __dropCable: DropCable | null;

  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly name: string,
    public readonly address: string,
  ) {
    super();

    this.__dropCable = null;
  }

  connectedTo(): Box | null {
    return this.__dropCable?.box ?? null;
  }

  connectedBy(cable: DropCable): void {
    this.__dropCable = cable;
  }

  usedCable(): DropCable | null {
    return this.__dropCable;
  }

  isSame(other: Customer): boolean {
    return this.id === other.id;
  }

  hasDifference(other: Customer): boolean {
    return this.name !== other.name || this.address !== other.address;
  }
}
