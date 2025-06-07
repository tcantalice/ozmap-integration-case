import { Box } from './box.entity';
import DropCable from './drop-cable.entity';
import { BaseSynchronizable } from './synchronizable';

export default class Customer extends BaseSynchronizable {
  private __connectedBox: Box | null;
  private __dropCable: DropCable | null;

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly address: string,
  ) {
    super();

    this.__connectedBox = null;
    this.__dropCable = null;
  }

  connectTo(box: Box): void {
    this.__connectedBox = box;
  }

  connectedTo(): Box | null {
    return this.__connectedBox;
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
