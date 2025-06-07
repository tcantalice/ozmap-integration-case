import { Box } from './box.entity';
import { BaseSynchronizable } from './synchronizable';
import { Location } from './vo/location';

class CablePath {
  private readonly __locations: Location[] = [];

  constructor() {}

  addPoint(loc: Location) {
    this.__locations.push(loc);
  }

  get locations(): Location[] {
    return this.__locations;
  }

  equalsTo(other: any) {
    let result: boolean = false;

    if (other instanceof CablePath) {
      const hasSameSize = other.locations.length === this.locations.length;

      result =
        hasSameSize &&
        this.locations.filter((ref: Location) => {
          return other.locations.find((curr: Location) => curr.equalsTo(ref)) !== undefined;
        }).length === this.locations.length;
    }

    return result;
  }

  get size(): number {
    return this.locations.length;
  }
}

export default class Cable extends BaseSynchronizable {
  private readonly __path: CablePath;
  private __boxA: Box | null;
  private __boxB: Box | null;

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly capacity: number,
  ) {
    super();

    this.__path = new CablePath();
  }

  addPoint(latitude: number, longitude: number) {
    this.__path.addPoint(new Location(latitude, longitude));
  }

  connectToFirstBox(box: Box): void {
    this.__boxA = box;
  }

  connectToSecondBox(box: Box): void {
    this.__boxB = box;
  }

  get path(): CablePath {
    return this.__path;
  }

  get firstConnection(): Box | null {
    return this.__boxA;
  }

  get secondConnection(): Box | null {
    return this.__boxB;
  }

  isSame(other: Cable): boolean {
    return this.id === other.id;
  }

  hasDifference(other: Cable): boolean {
    return (
      this.name !== other.name ||
      this.capacity !== other.capacity ||
      !this.path.equalsTo(other.path)
    );
  }
}
