import { BaseSynchronizable } from './synchronizable';
import { Location } from './vo/location';

export class BoxType extends BaseSynchronizable {
  constructor(public readonly name: string) {
    super();
  }

  equalsTo(other: any): boolean {
    let result: boolean = false;

    if (other instanceof BoxType) {
      result =
        other.isSynchronized() && this.isSynchronized()
          ? other.synchId === this.synchId
          : other.name === this.name;
    }

    return result;
  }
}

export default class Box extends BaseSynchronizable {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type: string,
    public readonly loc: Location,
  ) {
    super();
  }

  isSame(other: Box) {
    return this.id === other.id;
  }

  hasDifference(other: Box) {
    return this.name !== other.name || !this.loc.equalsTo(other.loc) || this.type !== other.type;
  }
}
