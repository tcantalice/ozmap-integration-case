import { SyncStatus } from '../enums/sync-status.enum';

export interface State<Entity> {
  data: Entity;
  operation: 'created' | 'updated' | 'ignored';
  sync?: {
    syncId?: string;
    lastAttemptSync?: Date;
    lastSyncStatus: SyncStatus;
  };
}
