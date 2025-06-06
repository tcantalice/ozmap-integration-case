export interface Synchronizable {
  synchronize(id: string): void;

  synchronize(id: string, timestamp: Date): void;

  isSynchronized(): boolean;

  get synchId(): string | null;

  get synchronizedAt(): Date | null;
}

export class BaseSynchronizable implements Synchronizable {
  private __synchId: string | null;

  private __synchronizedAt: Date | null;

  protected constructor() {
    this.__synchId = null;
    this.__synchronizedAt = null;
  }

  public get synchId(): string | null {
    return this.__synchId;
  }

  public get synchronizedAt(): Date | null {
    return this.__synchronizedAt;
  }

  synchronize(id: string): void;
  synchronize(id: string, timestamp: Date): void;

  synchronize(id: string, timestamp?: Date): void {
    this.setSynchId(id);

    this.setSynchronizedAt(timestamp || new Date());
  }

  protected setSynchId(id: string): void {
    this.__synchId = this.__synchId || id;
  }

  private setSynchronizedAt(timestamp: Date) {
    this.__synchronizedAt = this.__synchronizedAt || timestamp;
  }

  isSynchronized(): boolean {
    return Boolean(this.synchId);
  }
}
