import { BaseSynchronizable } from './synchronizable';

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

export class Pole extends BaseSynchronizable {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
  ) {
    super();
  }

  equalsTo(other: any): boolean {
    let result: boolean = false;

    if (other instanceof Pole) {
      if (other.isSynchronized() && this.isSynchronized()) {
        result = other.synchId === this.synchId;
      } else {
        result = other.lat === this.lat && other.lng === this.lng;
      }
    }

    return result;
  }
}

export class Box extends BaseSynchronizable {
  constructor(
    public readonly id: number,
    public readonly type: BoxType,
    public readonly pole: Pole,
  ) {
    super();
  }

  equalsTo(other: any) {
    let result: boolean = false;

    if (other instanceof Box) {
      if (other.isSynchronized() && this.isSynchronized()) {
        result = other.synchId === this.synchId;
      } else {
        result =
          other.id === this.id && other.type.equalsTo(this.type) && other.pole.equalsTo(this.pole);
      }
    }

    return result;
  }
}
