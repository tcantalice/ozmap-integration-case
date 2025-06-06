export class BoxType {
  private __ozmapId: string | null;

  private __synchronizedAt: Date | null;

  constructor(public readonly name: string) {
    this.__ozmapId = null;
    this.__synchronizedAt = null;
  }

  synchronize(id: string): void;
  synchronize(id: string, timestamp: Date): void;

  synchronize(id: string, timestamp?: Date): void {
    this.setOzmapId(id);

    this.setSynchronizedAt(timestamp || new Date());
  }

  private setOzmapId(id: string) {
    this.__ozmapId = this.__ozmapId || id;
  }

  private setSynchronizedAt(timestamp: Date) {
    this.__synchronizedAt = this.__synchronizedAt || timestamp;
  }

  isCreated(): boolean {
    return Boolean(this.__ozmapId);
  }

  public get synchId(): string | null {
    return this.__ozmapId;
  }

  public get syncrhonizedAt(): Date | null {
    return this.__synchronizedAt;
  }
}

export class Pole {
  private __ozmapId: string | null;

  private __synchronizedAt: Date | null;

  constructor(
    public readonly lat: number,
    public readonly lng: number,
  ) {
    this.__ozmapId = null;
    this.__synchronizedAt = null;
  }

  synchronize(id: string): void;
  synchronize(id: string, timestamp: Date): void;

  synchronize(id: string, timestamp?: Date): void {
    this.setOzmapId(id);

    this.setSynchronizedAt(timestamp || new Date());
  }

  private setOzmapId(id: string) {
    this.__ozmapId = this.__ozmapId || this.__ozmapId;
  }

  private setSynchronizedAt(timestamp: Date) {
    this.__synchronizedAt = this.__synchronizedAt || timestamp;
  }

  isCreated(): boolean {
    return Boolean(this.__ozmapId);
  }

  public get synchId(): string | null {
    return this.__ozmapId;
  }

  public get syncrhonizedAt(): Date | null {
    return this.__synchronizedAt;
  }
}

export class Box {
  ozmapId: string | null;

  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly type: BoxType,
    public readonly pole: Pole,
  ) {
    this.ozmapId = null;
  }
}
