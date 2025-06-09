import { SyncStatus } from '../../enums/sync-status.enum';

export interface SyncStorageState {
  syncId?: string;
  lastAttemptSync?: Date;
  lastSyncStatus: SyncStatus;
}

export default interface StorageState<Entity> {
  data: Entity;
  sync?: SyncStorageState;
}
