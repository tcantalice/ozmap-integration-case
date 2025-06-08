import { State } from '../../data/state.data';
import { Sync } from '../../data/sync.data';
import Cable from '../../entities/cable.entity';
import { SyncStatus } from '../../enums/sync-status.enum';
import Manager from '../contracts/manager';
import Storage from '../contracts/storage';
import StorageState from '../data/storage-state.data';

export default class CableManager implements Manager<Cable> {
  constructor(private cableStorage: Storage<Cable>) {}

  async handleState(entity: Cable): Promise<State<Cable>> {
    const result: State<Cable> = {
      data: entity,
      operation: 'ignored',
    };

    const savedState: StorageState<Cable> | null = await this.cableStorage.findById(entity.id);

    if (savedState) {
      if (savedState.data.hasDifference(entity)) {
        this.registerState(entity);

        result.operation = 'updated';
      } else {
        result.data = savedState.data;
        result.sync = savedState.sync
          ? {
              lastAttemptSync: savedState.sync.lastAttemptSync,
              lastSyncStatus: savedState.sync.lastSyncStatus,
              syncId: savedState.sync.syncId,
            }
          : result.sync;
      }
    } else {
      this.registerState(entity);

      result.operation = 'created';
    }

    return result;
  }

  async updateSync(entity: Cable, sync: Sync): Promise<void> {
    await this.cableStorage.saveSync(entity.id, {
      lastAttemptSync: new Date(),
      lastSyncStatus: sync.synchronized ? SyncStatus.SUCCESS : SyncStatus.FAIL,
      syncId: sync.syncId,
    });
  }

  private async registerState(cable: Cable) {
    await this.cableStorage.saveData(cable);
  }
}
