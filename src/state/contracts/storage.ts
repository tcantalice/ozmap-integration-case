import StorageState from '../data/storage-state.data';

export default interface Storage<Entity> {
  save(data: StorageState<Entity>): Promise<void>;

  findById(id: number): Promise<StorageState<Entity> | null>;
}
