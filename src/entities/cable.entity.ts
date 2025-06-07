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
}

export default class Cable extends BaseSynchronizable {
  private readonly __path: CablePath;

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

  get path(): CablePath {
    return this.__path;
  }
}
