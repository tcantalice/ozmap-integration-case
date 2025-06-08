import { SynchStatus } from '../../enums/synch-status.enum';

export default interface StorageState<Entity> {
  value: Entity;
  synchId?: string;
  synchAt?: Date;
  synchStatus: SynchStatus;
}
