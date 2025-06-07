export class Location {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
  ) {}

  equalsTo(other: any): boolean {
    let result: boolean = false;

    if (other instanceof Location) {
      result = other.lat === this.lat && other.lng === this.lng;
    }

    return result;
  }
}
