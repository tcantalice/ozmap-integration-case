import StorageState, { SyncStorageState } from '../data/storage-state.data';

export default interface Storage<Entity> {
  saveData(data: Entity): Promise<void>;

  saveSync(id: number, sync: SyncStorageState): Promise<void>;

  findById(id: number): Promise<StorageState<Entity> | null>;
}
