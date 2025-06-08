import { SynchStatus } from '../enums/synch-status.enum';

export interface State<Entity> {
  data: Entity;
  operation: 'created' | 'updated' | 'ignored';
  synch: {
    synchronizedAt?: Date;
    synchId?: string;
    lastSyncAttempt?: Date;
    lastSyncStatus?: SynchStatus;
  };
}
